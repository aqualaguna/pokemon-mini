import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navigation from '../components/Navigation'
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import toTitleCase from '../helper/TitleCase';
import ImageLoader from '../components/ImageLoader';
import PokemonSkeleton from '../components/PokemonSkeleton';
import { useRouter } from 'next/router'
import requestListPokemon from '../graphql/requestListPokemon';
import Loader from '../components/Loader';
import { getOwnedPokemon } from '../storage';


export default function MyPokemon() {
    const router = useRouter()

    const [listPokemon, updateListPokemon] = useState([]);

    useEffect(() => {
        // Run! Like go get some data from an API.
        updateListPokemon(getOwnedPokemon());
    }, []);
    return (
        <div className={styles.container}>
            <Head>
                <title>My Pokemon</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navigation main={
                (
                    <div className="flex flex-column h-full">
                        <main className={`${styles.main}`} style={{ justifyContent: 'start!important' }}>

                            <div
                                className="flex flex-wrap w-full"
                            >
                                {listPokemon.map((pokemon, index) => (
                                    <div className="p-2 w-full sm:w-full md:w-1/3 lg:w-2/12 transform hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out hover:ring-red" key={index}>
                                        <article className="w-full overflow-hidden rounded-lg shadow hover:shadow-lg hover:text-pokeball">


                                            <ImageLoader
                                                style={{}}
                                                className="w-full"
                                                src={pokemon.image}
                                                loading={() => <Loader size="70px" />}
                                                error={() => <div>Error</div>}
                                            />

                                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                                <h1 className="text-2xl sm:text-lg hover:underline text-center w-full">
                                                    {toTitleCase(pokemon.name)}
                                                </h1>

                                            </header>

                                        </article>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                )
            } />


        </div>
    )
}
