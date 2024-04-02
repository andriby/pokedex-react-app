import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Button from "../components/button";

function PokemonDetails() {
    const [pokemonData, SetPokemonData] = useState({});
    let { id } = useParams();
    let pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + id;

    const fetchPokemonData = async () => {
        try {
            const response = await axios.get(pokemonUrl);
            SetPokemonData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    useEffect(() => {
        fetchPokemonData();
    }, []);
    
    return (
        <div>
            <h1>Pokemon Details</h1>
            {pokemonData && (
                <div>
                    <p>ID: {pokemonData.id}</p>
                    {pokemonData.types && (
                        <div>
                            {pokemonData.types.map((tipo, index) => (
                                <p key={index}>Tipo: {tipo.type.name}</p>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PokemonDetails