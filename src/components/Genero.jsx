import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronUp, FaChevronDown, FaChevronLeft } from "react-icons/fa";

export function Genero() {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [selectedGender, setSelectedGender] = useState('');
    const API_URL = 'https://pokeapi.co/api/v2/pokemon?offset=' + offset;

    const genderUrls = {
        male: 'https://pokeapi.co/api/v2/gender/2/',
        female: 'https://pokeapi.co/api/v2/gender/1/',
        genderless: 'https://pokeapi.co/api/v2/gender/3/'
    };

    const typeColors = {
        fire: '#ff5d54',
        water: '#78d3ff',
        grass: '#78ff81',
        electric: '#ffe873',
        poison: '#ac85ff',
        normal: '#fff4c7',
        ground: '#ffb366',
        rock: '#D5D5D4',
        bug: '#F8D5A3',
        ghost: '#D7C2F7',
        steel: '#9292e0',
        flying: '#ebc3c3',
        fighting: '#f0d5a1',
        psychic: '#e7eb86',
        ice: '#cfeefc',
        dragon: '#97B3E6',
        dark: '#8f8f8f',
        fairy: '#ef91ff',
        shadow: '#A9A9A9'
    };

    let CallAPI = async () => {
        let response = await fetch(API_URL);
        let prev = await response.json();

        let pokemonData = await Promise.all(prev.results.map(async (pokemon) => {
            let res = await fetch(pokemon.url);
            let details = await res.json();
            return { ...pokemon, types: details.types.map(typeInfo => typeInfo.type.name) };
        }));

        if (offset > 0) {
            setData(prevData => [...prevData, ...pokemonData]);
        } else {
            setData(pokemonData);
        }
    };

    useEffect(() => {
        if (!selectedGender) {
            CallAPI();
        }
    }, [offset, selectedGender]);

    const fetchPokemonsByGender = async (genderUrl, offset = 0) => {
        let response = await fetch(genderUrl);
        let data = await response.json();
        let pokemonData = await Promise.all(data.pokemon_species_details.slice(offset, offset + 20).map(async (p) => {
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.pokemon_species.name}`);
            let details = await res.json();
            return { ...p.pokemon_species, types: details.types.map(typeInfo => typeInfo.type.name) };
        }));
        if (offset > 0) {
            setData(prevData => [...prevData, ...pokemonData]);
        } else {
            setData(pokemonData);
        }
    };

    useEffect(() => {
        if (selectedGender) {
            fetchPokemonsByGender(genderUrls[selectedGender], offset);
        }
    }, [selectedGender, offset]);

    let LoadMore = () => {
        setOffset(prevOffset => prevOffset + 20);
    };

    let LoadLess = () => {
        setOffset(0);
        if (selectedGender) {
            fetchPokemonsByGender(genderUrls[selectedGender], 0);
        } else {
            CallAPI();
        }
    };

    return (
        <>
        <Link to="/" className='back-button'><FaChevronLeft size={30} /></Link>
            <div className="genders">
                <h2>Filtrar por Género</h2>
                <select className='gender-select' onChange={(e) => {
                    setSelectedGender(e.target.value);
                    setOffset(0);
                }} value={selectedGender}>
                    <option value="">Selecciona un género</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="genderless">Sin género</option>
                </select>
            </div>
            <section id='list'>
                {data.length > 0 &&
                    data.map((pok, i) => {
                        let id = pok.url.split('/').filter(Boolean).pop();
                        let idStr = id.toString().padStart(3, '0');
                        let img = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/" + idStr + ".png";
                        let type1 = pok.types[0];
                        let type2 = pok.types[1];
                        let bgColor = type2 ? `linear-gradient(45deg, ${typeColors[type1]}, ${typeColors[type2]})` : typeColors[type1];

                        return (
                            <Link to={"/pokemon/" + id} key={pok.name}>
                                <div className='center-pkm' style={{ background: bgColor }}>
                                    <img src={img} alt={pok.name} />
                                    <p className='button-id'>{idStr}</p>
                                    <h2 className='button'>{pok.name}</h2>
                                </div>
                            </Link>
                        );
                    })
                }
            </section>
            <div className='obj'>
                <a onClick={() => LoadLess()} className='button-center'><FaChevronUp size={24} />Volver a 20</a>
                <a onClick={() => LoadMore()} className='button-center'><FaChevronDown size={24} /></a>
            </div>
        </>
    );
}