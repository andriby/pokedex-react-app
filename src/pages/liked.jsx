import { useEffect } from "react";
import Pokemon from "../components/pokemon";
import { Link } from "react-router-dom";

function Liked() {

    const pokemonList = JSON.parse(localStorage.getItem("LikedPokemon"))

    return (
        <>
            <div className="d-flex justify-content-between">
                <h1>Favorites List</h1> 
                <div className="d-flex align-items-center">
                    <Link to="/" title="Home"><i class="fa-solid fa-house" style={{ color: '#fff', fontSize: '20px' }}></i></Link>
                </div>
            </div>
                <hr />
            <div className="row g-3">
                {
                    pokemonList.map((pokemon, index) => {
                        return (
                            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                                <Pokemon key={index} pokemon={pokemon} url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Liked;