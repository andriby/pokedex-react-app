import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function PokemonDetails() {
    const [pokemonData, SetPokemonData] = useState({});
    const [pokemonSpeciesData, SetPokemonSpeciesData] = useState({});
    const [pokemonChain, SetPokemonChain] = useState({})
    let { id } = useParams();

    let pokemonUrl = "    https://pokeapi.co/api/v2/pokemon/" + id;
    let pokemonSpeciesUrl = "    https://pokeapi.co/api/v2/pokemon-species/" + id;


    const fetchPokemonData = async () => {
        try {
            const response = await axios.get(pokemonUrl);
            SetPokemonData(response.data);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    const fetchPokemonSpeciesData = async () => {
        try {
            const response = await axios.get(pokemonSpeciesUrl);
            SetPokemonSpeciesData(response.data);
            console.log(response.data.evolution_chain);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    const fetchEvolutionChain = async () => {
        try {
            const response = await axios.get(pokemonSpeciesData.evolution_chain.url);
            SetPokemonChain(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    }

    useEffect(() => {
        fetchPokemonData();
    }, []);

    useEffect(() => {
        fetchPokemonSpeciesData();
    }, []);

    useEffect(() =>{
        fetchEvolutionChain()
    }, [])

    function BackgroundColor(type) {
        let backgroundColor = "";
        switch (type) {
            case "fire": {
                backgroundColor = "#C52409";
                break;
            }
            case "water": {
                backgroundColor = "#3498DB";
                break;
            }
            case "grass": {
                backgroundColor = "#6EBF2F";
                break;
            }
            case "electric": {
                backgroundColor = "#F1C40F";
                break;
            }
            case "ground": {
                backgroundColor = "#D35400";
                break;
            }
            case "rock": {
                backgroundColor = "#A9A9A9";
                break;
            }
            case "psychic": {
                backgroundColor = "#FF00FF";
                break;
            }
            case "ice": {
                backgroundColor = "#87CEEB";
                break;
            }
            case "bug": {
                backgroundColor = "#7FFF00";
                break;
            }
            case "flying": {
                backgroundColor = "#87CEEB";
                break;
            }
            case "ghost": {
                backgroundColor = "#8B008B";
                break;
            }
            case "fighting": {
                backgroundColor = "#800000";
                break;
            }
            case "poison": {
                backgroundColor = "#9932CC";
                break;
            }
            case "dark": {
                backgroundColor = "#2F4F4F";
                break;
            }
            case "steel": {
                backgroundColor = "#C0C0C0";
                break;
            }
            case "dragon": {
                backgroundColor = "#483D8B";
                break;
            }
            case "fairy": {
                backgroundColor = "#FF69B4";
                break;
            }
            case "normal": {
                backgroundColor = "#4682B4";
                break;
            }
            default: {
                backgroundColor = "grey"; // Color predeterminado si no se encuentra el tipo
                break;
            }
        }
        return backgroundColor;
    }

    return (
        <div className="py-3">
            <h1>Pokemon Detailsa</h1>
            {pokemonData && (
                <div className="card">
                    <div className="card-header row">
                        <h2 className="text-uppercase">{pokemonData.name}</h2>
                        <p>ID: {pokemonData.id}</p>
                    </div>
                    <div className="card-body d-flex flex-column justify-content-center">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={pokemonData.name} />
                        {pokemonData.types && (
                            <div className="gap-3 d-flex justify-content-center">
                                {pokemonData.types.map((types, index) => (
                                    <span key={index} style={{
                                        backgroundColor: BackgroundColor(types.type.name), padding: " 4px 7px",
                                        textTransform: "uppercase",
                                        border: "1px solid #000",
                                        borderRadius: "18px",
                                    }} > {types.type.name} </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PokemonDetails