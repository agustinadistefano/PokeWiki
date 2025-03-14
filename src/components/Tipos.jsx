import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronUp, FaChevronDown, FaChevronLeft } from "react-icons/fa";

export function Tipos() {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const API_URL = 'https://pokeapi.co/api/v2/pokemon?offset=' + offset;

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
        if (!selectedType) {
            CallAPI();
        }
    }, [offset, selectedType]);

    useEffect(() => {
        const fetchTypes = async () => {
            let response = await fetch('https://pokeapi.co/api/v2/type');
            let data = await response.json();
            setTypes(data.results);
        };

        fetchTypes();
    }, []);

    const TranslateType = (value) => {
        let specificType;

        switch (value) {
            case 'fire': specificType = 'Fuego'; break;
            case 'water': specificType = 'Agua'; break;
            case 'grass': specificType = 'Planta'; break;
            case 'electric': specificType = 'Eléctrico'; break;
            case 'poison': specificType = 'Veneno'; break;
            case 'normal': specificType = 'Normal'; break;
            case 'ground': specificType = 'Tierra'; break;
            case 'rock': specificType = 'Roca'; break;
            case 'bug': specificType = 'Bicho'; break;
            case 'ghost': specificType = 'Fantasma'; break;
            case 'steel': specificType = 'Acero'; break;
            case 'flying': specificType = 'Volador'; break;
            case 'fighting': specificType = 'Lucha'; break;
            case 'psychic': specificType = 'Psíquico'; break;
            case 'ice': specificType = 'Hielo'; break;
            case 'dragon': specificType = 'Dragón'; break;
            case 'dark': specificType = 'Siniestro'; break;
            case 'fairy': specificType = 'Hada'; break;
            case 'shadow': specificType = 'Sombra'; break;
            default: specificType = 'Desconocido'; break;
        }
        return specificType;
    };

    const fetchPokemonsByType = async (type, offset = 0) => {
        let response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        let data = await response.json();
        let pokemonData = await Promise.all(data.pokemon.slice(offset, offset + 20).map(async (p) => {
            let res = await fetch(p.pokemon.url);
            let details = await res.json();
            return { ...p.pokemon, types: details.types.map(typeInfo => typeInfo.type.name) };
        }));
        if (offset > 0) {
            setData(prevData => [...prevData, ...pokemonData]);
        } else {
            setData(pokemonData);
        }
    };

    useEffect(() => {
        if (selectedType) {
            fetchPokemonsByType(selectedType, offset);
        }
    }, [selectedType, offset]);

    let LoadMore = () => {
        setOffset(prevOffset => prevOffset + 20);
    };

    let LoadLess = () => {
        setOffset(0);
        if (selectedType) {
            fetchPokemonsByType(selectedType, 0);
        } else {
            CallAPI();
        }
    };

    return (
        <>
        <Link to="/" className='back-button'><FaChevronLeft size={30} /></Link>
            <div className="tipos">
                <h2>Filtrar por Tipos</h2>
                <select className='types-selecect' onChange={(e) => {
                    setSelectedType(e.target.value);
                    setOffset(0);
                }} value={selectedType}>
                    <option value="">Selecciona un tipo</option>
                    {types.map((type, index) => (
                        <option key={index} value={type.name}>
                            {TranslateType(type.name)}
                        </option>
                    ))}
                </select>
            </div>
            <section id='list'>
                {data.length > 0 &&
                    data.map((pok, i) => {
                        let id = pok.url.split('/').filter(Boolean).pop(); // Obtener el ID del Pokémon desde la URL
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