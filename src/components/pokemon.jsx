import React from "react";
import '../styles/index.css';

const Pokemon = ({ pokemon, url, className = "" }) => {
    const [liked, setLiked] = React.useState(() => {
        const likedPokemon = JSON.parse(localStorage.getItem("LikedPokemon")) || [];
        return likedPokemon.some(p => p.name === pokemon.name);
    });

    const likedPokemon = JSON.parse(localStorage.getItem("LikedPokemon")) || [];

    let heartStyle = {
        fill: "#fff"
    };

    for (let i = 0; i < likedPokemon.length; i++) {
        if (likedPokemon[i].name === pokemon.name) {
            heartStyle = {
                fill: "rgb(91, 173, 255)"
            };
        }
    }

    const handleLikeClick = () => {
        setLiked(!liked);

        if (liked) {
            const updatedLikedPokemon = likedPokemon.filter((p) => p.name !== pokemon.name);
            localStorage.setItem("LikedPokemon", JSON.stringify(updatedLikedPokemon));
        } else {
            localStorage.setItem("LikedPokemon", JSON.stringify([...likedPokemon, pokemon]));
        }
    };

    return (
        <div style={{ cursor: 'pointer' }} className={className}>
            <div className="card position-relative">
                <div title="Like" className="heart-container">
                    <input id="Give-It-An-Id" className="checkbox" type="checkbox" onClick={handleLikeClick}/>
                    <div className="svg-container">
                        <svg xmlns="http://www.w3.org/2000/svg" style={heartStyle} className="svg-heart" viewBox="0 0 24 24">
                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="svg-celebrate">
                            <polygon points="10,10 20,20"></polygon>
                            <polygon points="10,50 20,50"></polygon>
                            <polygon points="20,80 30,70"></polygon>
                            <polygon points="90,10 80,20"></polygon>
                            <polygon points="90,50 80,50"></polygon>
                            <polygon points="80,80 70,70"></polygon>
                        </svg>
                    </div>
                </div>
                <img src={url} className="card-img-top" alt={pokemon.name} />
                <div className="card-body">
                    <h5 className="card-title text-uppercase text-center">{pokemon.name}</h5>
                </div>
            </div>
        </div>
    );
};

export default Pokemon;