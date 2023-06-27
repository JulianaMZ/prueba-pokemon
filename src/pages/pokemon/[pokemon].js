import { useGlobalContext } from '@/context/global';
import { useRouter } from "next/router";
import React, { useEffect } from 'react'
import styles from "@/styles/Pokemon.module.css";

function Pokemon() {

    const router = useRouter();

    const { pokemon } = router.query;

    const { getPokemon, loading, pokemon: pokemonItem } = useGlobalContext();

  

    useEffect(() => {
        if (pokemon) {
            getPokemon(pokemon);
        }   
    }, []);

    let myLink = "";

    if(pokemonItem?.sprites?.other) {
        const {"official-artwork": link} = pokemonItem?.sprites?.other 
        myLink = link.front_default;
    }


    //pokemon bg colors
    const pkColors = [
        "#FFCC33",
        "#FFCCCC",
        "#FFCC00",
        "#CC99FF",
        "#FF99CC",
        "#CC6600",
        "#FF66CC",
        "#FF6699",
        "#CC3333",
        "#FF3300",
        "#996600",
        "#6699FF",
        "#999966",
        "#66CCFF",
        "#66FF99",
        "#00FFFF",
        "#CCFFFF",
        "#FFFF99",
        "#CCCC99",
        "#CCCCCC",
    ];

    const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];

  return (
    <div 
        className={styles.PokemonBg} 
        style={{
        background: !loading && randomColor,
    }}>
        {pokemonItem && (
            <>
                <div className={styles.PokemonImage}>
                    <img
                        src={
                            pokemonItem?.sprites?.other?.home.front_default 
                            ? pokemonItem?.sprites?.other?.home.front_default 
                            : myLink
                        } 
                        alt="" 
                    />
                </div>
                <div className={styles.PokemonBody}>
                    <h2>{pokemonItem.name}</h2>
                    <div className={styles.PokemonInfo}>
                        <div className={styles.PokemonInfoItem}>
                            <h5>Name:</h5>
                            <p>{pokemonItem?.name},</p>
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>Type:</h5>
                            <p>
                                {pokemonItem?.types?.map((type) => {
                                    return type.type.name;
                                })}
                            </p>
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>Ability:</h5>
                            <p>
                                {pokemonItem?.abilities?.map((ability) => {
                                    return ability.ability.name;
                                })}
                            </p>
                        </div>
                        <div className={styles.PokemonInfoItem}>
                            <h5>Move:</h5>
                            {pokemonItem?.moves?.map((move) => {
                                return <p key={move.move.name}>{move.move.name},</p>
                            })}
                        </div>
                    </div>
                </div>
            </>
        )}
   </div>
  );
}

export default Pokemon;