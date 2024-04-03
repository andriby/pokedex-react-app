import React, { useState, useEffect } from 'react';
import Button from '../components/button';
import axios from 'axios';
import Pokemon from '../components/pokemon';
import '../styles/index.css';
import { Link } from "react-router-dom";


const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [offset, setOffset] = useState(0);
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    const fetchAllPokemon = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
            setPokemonList(response.data.results);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    const goToPreviousPage = () => {
        if (offset - 12 >= 0) {
            setOffset(offset - 12);
        }
    };

    const goToNextPage = () => {
        if (offset + 12 < pokemonList.length) {
            setOffset(offset + 12);
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setFilteredPokemonList([]);
        } else {
            const filtered = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredPokemonList(filtered);
        }
    };

    useEffect(() => {
        fetchAllPokemon();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, pokemonList]);

    return (
        <div>
            <h2>POKEDEX</h2>
            <div className="row">
                <div className="col-11 col-md-7">
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Enter Pokémon name"
                        className='form-control'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='d-none d-md-block col-md-4'></div>
                <div className="col-1 d-flex align-items-center justify-content-center" title='Liked'>
                    <Link to="/liked"><i class="fa-solid fa-heart" style={{ color: '#fff', fontSize: '20px' }}></i></Link>
                </div>
            </div>

            <div className='col-md-12 row g-3 mt-2'>
                {searchTerm === ''
                    ? pokemonList.slice(offset, offset + 12).map((pokemon, index) => (
                        <div key={index} className='col-6 col-sm-4 col-md-3 col-lg-2'>
                            <Pokemon
                                pokemon={pokemon}
                                url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1 + offset}.png`}
                            />
                        </div>
                    ))
                    : filteredPokemonList.map((pokemon, index) => (
                        <div key={index} className='col-6 col-sm-4 col-md-3 col-lg-2 position-relative'>
                            <Pokemon pokemon={pokemon} 
                            url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}/>
                        </div>
                    ))}
            </div>
            <div className="d-flex justify-content-around mt-3">
                <div className="col-2 mt-3 mt-md-0">
                    {offset >= 12 && <Button icon="fa-solid fa-chevron-left" onClick={goToPreviousPage} className='btn btn-primary w-100' />}
                </div>
                <div className="col-2 mt-3 mt-md-0">
                    {offset + 12 < pokemonList.length && <Button icon="fa-solid fa-chevron-right" onClick={goToNextPage} className='btn btn-primary w-100' />}
                </div>
            </div>
        </div>
    );
};

export default Home;