import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'

function PokemonDetails() {
    const [pokemonData, setPokemonData] = useState({})
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState({})
    let { id } = useParams()

    let pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + id
    let pokemonSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/" + id

    const fetchPokemonData = async () => {
        try {
            const response = await axios.get(pokemonUrl)
            setPokemonData(response.data)
        } catch (error) {
            console.error('Error fetching Pokémon:', error)
        }
    }

    const fetchPokemonSpeciesData = async () => {
        try {
            const response = await axios.get(pokemonSpeciesUrl)
            setPokemonSpeciesData(response.data)
        } catch (error) {
            console.error('Error fetching Pokémon:', error)
        }
    }

    useEffect(() => {
        fetchPokemonData()
        fetchPokemonSpeciesData()
    }, [])

    const englishFlavorTextEntry = pokemonSpeciesData.flavor_text_entries && pokemonSpeciesData.flavor_text_entries.find(entry => entry.language.name === 'en')

    function BackgroundColor(type) {
        let backgroundColor = ""
        switch (type) {
            case "fire": {
                backgroundColor = "#C52409"
                break
            }
            case "water": {
                backgroundColor = "#3498DB"
                break
            }
            case "grass": {
                backgroundColor = "#6EBF2F"
                break
            }
            case "electric": {
                backgroundColor = "#F1C40F"
                break
            }
            case "ground": {
                backgroundColor = "#D35400"
                break
            }
            case "rock": {
                backgroundColor = "#A9A9A9"
                break
            }
            case "psychic": {
                backgroundColor = "#FF00FF"
                break
            }
            case "ice": {
                backgroundColor = "#87CEEB"
                break
            }
            case "bug": {
                backgroundColor = "#7FFF00"
                break
            }
            case "flying": {
                backgroundColor = "#87CEEB"
                break
            }
            case "ghost": {
                backgroundColor = "#8B008B"
                break
            }
            case "fighting": {
                backgroundColor = "#800000"
                break
            }
            case "poison": {
                backgroundColor = "#9932CC"
                break
            }
            case "dark": {
                backgroundColor = "#2F4F4F"
                break
            }
            case "steel": {
                backgroundColor = "#C0C0C0"
                break
            }
            case "dragon": {
                backgroundColor = "#483D8B"
                break
            }
            case "fairy": {
                backgroundColor = "#FF69B4"
                break
            }
            case "normal": {
                backgroundColor = "#4682B4"
                break
            }
            default: {
                backgroundColor = "grey"
                break
            }
        }
        return backgroundColor
    }

    return (
        <div className="py-3">
            <div className="d-flex justify-content-between">
                <h1>Pokemon Details</h1> 
                <div className="d-flex align-items-center">
                    <Link to="/" title="Home"><i class="fa-solid fa-house" style={{ color: '#fff', fontSize: '20px' }}></i></Link>
                </div>
            </div>
            {pokemonData && (
                <div className="card">
                    <div className="card-header d-flex container ">
                        <div className="col-11">
                            <h2 className="text-uppercase">{pokemonData.name}</h2>
                            <p>Pokedex: {pokemonData.id}</p>
                        </div>
                        <div className="col-1 d-flex align-items-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" alt="pokeball" height={"50px"} />
                        </div>
                    </div>
                    <div className="card-body d-flex flex-column flex-md-row justify-content-center">
                        <div className="col-md-6 col-xl-4">
                            <div className="d-flex justify-content-center">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`} alt={pokemonData.name} height="400px" />
                            </div>
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
                        <hr className="d-md-none"/>
                        <div className="col-md-6 col-xl-8">
                            <h3 className="fw-bolder">Pokedex Entry</h3>
                            <hr />
                            {englishFlavorTextEntry && (
                                <div className="row mb-3">
                                    <p className="fs-5">{englishFlavorTextEntry.flavor_text}</p>
                                </div>
                            )}
                            <h3 className="fw-bolder">Other:</h3>
                            <hr />
                            
                            <div className="row">
                            <div className="col-md-3">
                            {pokemonSpeciesData && pokemonSpeciesData.generation && (
                                <div className="row">
                                    <p className="text-uppercase">{pokemonSpeciesData.generation.name}</p>
                                </div>
                            )}
                            {pokemonSpeciesData && pokemonSpeciesData.habitat && (
                                <div className="row">
                                    <p>Habitat: {pokemonSpeciesData.habitat.name}</p>
                                </div>
                            )}
                            </div>
                        
                            <div className="col-md-3">
                                <p className="">Height: {pokemonData.height}</p>
                                <p className="">Weight: {pokemonData.weight} <i class="fa-solid fa-scale-unbalanced-flip"></i></p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PokemonDetails