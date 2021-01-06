import { useRouter } from "next/router"
import Head from 'next/head'
import React, { ReactNode, useEffect, useState } from "react"
import Navigation from "../../../components/Navigation"
import requestPokemonDetail from "../../../graphql/requestPokemonDetail"
import ImageLoader from "../../../components/ImageLoader"
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import toTitleCase, { kebabToTitleCase, snakeToTitleCase } from "../../../helper/TitleCase"
import { motion } from 'framer-motion';
import Loader from "../../../components/Loader"
import CatchPokeballModal from "../../../components/CatchPokeballModal"
import { toast, ToastContainer } from "react-toastify";

export default function DynamicPage() {
    const router = useRouter()
    const {
        query: { name },
    } = router;
    const [pokemon, updatePokemon] = useState(null);
    const [showModal, updateShowModal] = useState(false);
    const [pokeballState, updatePokeballState] = useState('idle');
    let id = name;
    useEffect(() => {
        // @ts-ignore
        if (name) requestPokemonDetail(id).then(({ data }) => {
            const { pokemon } = data;
            if (pokemon.id) updatePokemon(pokemon);
            // updateShowModal(true);
        })
    }, [name])
    let content: ReactNode;

    if (pokemon) {
        let imgList = {};
        const catchVariants = {
            hover: {
                scale: 1.2
            },
            idle: {
                y: [0, -10],
                rotateZ: [180, 360],
                transition: {
                    y: {
                        yoyo: Infinity,
                        type: 'spring',
                        stiffness: 300,
                        duration: 0.5
                    },
                    rotateZ: {
                        yoyo: Infinity,
                        duration: 1,
                    }
                }
            }
        }

        Object.keys(pokemon.sprites).forEach(key => pokemon.sprites[key] ? imgList[key] = pokemon.sprites[key] : null);
        const imgChildren = Object.keys(imgList).map(key => <div className="bg-gray-600">
            <ImageLoader
                style={{}}
                src={imgList[key]}
                loading={() => <Loader size="70px" />}
                error={() => <div>Error</div>}
            />
            <p className="legend">{snakeToTitleCase(key)}</p>
        </div>);
        content = (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 flex justify-center flex-wrap">
                    <Carousel autoPlay infiniteLoop showThumbs={false} className="w-full max-w-screen-sm">
                        {imgChildren}
                    </Carousel>
                    <div className="w-full h-3"></div>
                    <motion.div
                        animate={{}}
                        onHoverStart={() => updatePokeballState('hover')}
                        onHoverEnd={() => updatePokeballState('idle')}
                        onClick={() => updateShowModal(true)} className="bg-pokeball rounded-full font-bold text-white px-4 py-3 hover:ring-4 hover:ring-black-500 mr-6 flex">
                        <p className="place-self-center mx-2">Catch Me!</p>
                        <motion.img variants={catchVariants} animate={pokeballState} className="h-6 w-auto m-2" src="https://pokedex.stevenhansel.com/assets/images/pokeball.png" alt="Pokemon Mini" />
                    </motion.div>
                </div>
                <div className="px-4 py-5 mt-base sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {toTitleCase(pokemon.name)}
                    </h3>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Base Experience
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {pokemon.base_experience}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Height
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {pokemon.height}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Ability
                         </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex flex-wrap">
                                {pokemon.abilities.map(ab => <div className="p-1 m-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full">{ab.ability.name}</div>)}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Move
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {pokemon.moves.map(move => <div className=" p-1 m-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">{kebabToTitleCase(move.move.name)}</div>)}
                            </dd>
                        </div>

                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Stats
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                    {pokemon.stats.map(stat => (
                                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <div className="w-0 flex-1 flex items-center">
                                                <span className="ml-2 flex-1 w-0 truncate uppercase">
                                                    {kebabToTitleCase(stat.stat.name)}
                                                </span>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                {stat.base_stat} ({stat.effort} Effort)
                                        </div>
                                        </li>
                                    ))}


                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div >);
    } else {
        content = (<Loader size="170px" />)
    }
    return (
        <div className="flex flex-columns justify-center justify-items-center">
            <Head>
                <title>Pokemon Detail</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false} ></ToastContainer>
            <CatchPokeballModal show={showModal} updateShow={updateShowModal} pokemon={pokemon} />

            <Navigation main={
                (
                    <div className="flex flex-column">
                        <main className="flex-1 flex flex-column justify-center justify-items-center">
                            {content}

                        </main>
                    </div>
                )
            } />


        </div>
    )
}