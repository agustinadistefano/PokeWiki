import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";

export function Pokemon() {

    let { id } = useParams();

    const [data, setData] = useState({});
    const [gender, setGender] = useState('');
    const API_URL = 'https://pokeapi.co/api/v2/pokemon/' + id;

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

    const abilityColors = {
    overgrow: '#78C850',
    chlorophyll: '#A040A0',
    blaze: '#F08030',
    solar_power: '#E0C068',
    torrent: '#6890F0',
    rain_dish: '#A8B820',
    shield_dust: '#B8A038',
    run_away: '#FF69B4',
    static: '#FFD700',
    lightning_rod: '#FFA500',
    poison_point: '#8A2BE2',
    levitate: '#7B68EE',
    rock_head: '#8B4513',
    sturdy: '#A52A2A',
    battle_armor: '#D2691E',
    keen_eye: '#4682B4',
    tangled_feet: '#DDA0DD',
    big_pecks: '#FF4500',
    overcoat: '#2E8B57',
    magic_guard: '#4B0082',
    speed_boost: '#FF6347',
    compound_eyes: '#00CED1',
    swarm: '#ADFF2F',
    insomnia: '#8B0000',
    intimidate: '#FF8C00',
    shed_skin: '#6f8a42',
    guts: '#B22222',
    sand_veil: '#DEB887',
    hyper_cutter: '#FF1493',
    sand_rush: '#F4A460', 
    sand_force: '#DAA520', 
    water_absorb: '#1E90FF', 
    hydration: '#00BFFF', 
    shell_armor: '#5F9EA0', 
    swift_swim: '#4682B4',
    unknown: '#A9A9A9'
    };

    let CallAPI = async () => {
        let response = await fetch(API_URL);
        let prev = await response.json();

        setData(prev);
        fetchGender(prev.name);
    }

    let fetchGender = async (name) => {
        let maleResponse = await fetch('https://pokeapi.co/api/v2/gender/2/');
        let femaleResponse = await fetch('https://pokeapi.co/api/v2/gender/1/');
        let genderlessResponse = await fetch('https://pokeapi.co/api/v2/gender/3/');

        let maleData = await maleResponse.json();
        let femaleData = await femaleResponse.json();
        let genderlessData = await genderlessResponse.json();

        if (maleData.pokemon_species_details.some(p => p.pokemon_species.name === name)) {
            setGender('Masculino');
        } else if (femaleData.pokemon_species_details.some(p => p.pokemon_species.name === name)) {
            setGender('Femenino');
        } else if (genderlessData.pokemon_species_details.some(p => p.pokemon_species.name === name)) {
            setGender('Sin género');
        } else {
            setGender('Desconocido');
        }
    }



    useEffect(() => {
        CallAPI();
    }, []);
    
    let TranslateType = (value) => {
        let specificType;

        switch(value){
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
    }

    let TranslateAbilitie = (value) => {
        let specificAbilitie;

        switch(value){
            case 'overgrow': specificAbilitie = 'Espesura'; break;
            case 'chlorophyll': specificAbilitie = 'Clorofila'; break;
            case 'blaze': specificAbilitie = 'Mar llamas'; break;
            case 'solar-power': specificAbilitie = 'Poder solar'; break;
            case 'torrent': specificAbilitie = 'Torrente'; break;
            case 'rain-dish': specificAbilitie = 'Cura lluvia'; break;
            case 'shield-dust': specificAbilitie = 'Polvo escudo'; break;
            case 'run-away': specificAbilitie = 'Fuga'; break;
            case 'static': specificAbilitie = 'Estática'; break;
            case 'lightning-rod': specificAbilitie = 'Pararrayos'; break;
            case 'poison-point': specificAbilitie = 'Punto tóxico'; break;
            case 'levitate': specificAbilitie = 'Levitación'; break;
            case 'rock-head': specificAbilitie = 'Cabeza roca'; break;
            case 'sturdy': specificAbilitie = 'Robustez'; break;
            case 'battle-armor': specificAbilitie = 'Armadura batalla'; break;
            case 'keen-eye': specificAbilitie = 'Vista lince'; break;
            case 'tangled-feet': specificAbilitie = 'Tumbos'; break;
            case 'big-pecks': specificAbilitie = 'Sacapecho'; break;
            case 'overcoat': specificAbilitie = 'Funda'; break;
            case 'magic-guard': specificAbilitie = 'Muro mágico'; break;
            case 'speed-boost': specificAbilitie = 'Impulso'; break;
            case 'compound-eyes': specificAbilitie = 'Ojo compuesto'; break;
            case 'swarm': specificAbilitie = 'Enjambre'; break;
            case 'insomnia': specificAbilitie = 'Insomnio'; break;
            case 'intimidate': specificAbilitie = 'Intimidación'; break;
            case 'shed-skin': specificAbilitie = 'Mudar'; break;
            case 'guts': specificAbilitie = 'Agallas'; break;
            case 'sand-veil': specificAbilitie = 'Velo arena'; break;
            case 'hyper-cutter': specificAbilitie = 'Corte fuerte'; break;
            case 'sand-rush': specificAbilitie = 'Ímpetu arena'; break;
            case 'sand-force': specificAbilitie = 'Poder arena'; break;
            case 'water-absorb': specificAbilitie = 'Absorbe agua'; break;
            case 'hydration': specificAbilitie = 'Hidratación'; break;
            case 'shell-armor': specificAbilitie = 'Caparazón'; break;
            case 'torrent': specificAbilitie = 'Torrente'; break;
            case 'swift-swim': specificAbilitie = 'Nado rápido'; break;
            default: specificAbilitie = 'Desconocido'; break;
        }
        return specificAbilitie;
    };

    let [idStr, setIdStr] = useState("");
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            setIdStr(data.id.toString().padStart(3, '0'));
        }
    }, [data]);

    let img = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/" + idStr + ".png";

    let type1 = data.types ? data.types[0].type.name : '';
    let type2 = data.types && data.types[1] ? data.types[1].type.name : '';
    let bgColor = type2 ? `linear-gradient(45deg, ${typeColors[type1]}, ${typeColors[type2]})` : typeColors[type1];

    const formatWeight = (weight) => {
        let weightStr = weight.toString();
        return weightStr.slice(0, -1) + ',' + weightStr.slice(-1) + ' kg';
    };

    const formatHeight = (height) => {
        let heightStr = height.toString();
        if (heightStr.length === 1) {
            return '0,' + heightStr + ' m';
        } else {
            return heightStr.slice(0, -1) + ',' + heightStr.slice(-1) + ' m';
        }
    };

    return (
        <>
            {Object.keys(data).length > 0 &&
                <>
                    
                    <div className='item'>
                        <div className='hola'>
                            <Link to="/" className='back-button'><FaChevronLeft size={30} /></Link>
                            <h2> {data.name} <span>N°{data.id.toString().padStart(4, '0')}</span></h2>
                        </div>
                        <div className='grid-2-complete'>
                            <div className='pkm' style={{ background: bgColor }}>
                                <img src={img} alt={data.name} />
                            </div>
                            <div className='right-content'>
                                <h3 >Peso: </h3>
                                <div className='mb'>{formatWeight(data.weight)}</div>
                                <h3>Altura: </h3>
                                <div className='mb'>{formatHeight(data.height)}</div> 
                                <h3>Género: </h3>
                                <div className='mb'>{gender}</div>
                                <h3>Tipos: </h3>
                                <div className='types mb' >
                                    { data.types.map(type => {
                                        let specificType = TranslateType(type.type.name);
                                        let typeColor = typeColors[type.type.name];
                                        return( <p key={type.type.name} style={{ background: typeColor }}>{specificType}</p> )
                                    })}
                                </div>
                                <h3>Habilidades</h3>
                                <div className='types media-mb'>
                                    { data.abilities.map(abilitie => {
                                        let specificAbilitie = TranslateAbilitie(abilitie.ability.name);
                                        let abilityColor = abilityColors[abilitie.ability.name] || abilityColors.unknown;
                                        return( <p key={abilitie.ability.name} style={{ background: abilityColor }}>{specificAbilitie}</p> )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}