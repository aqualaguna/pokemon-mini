import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { addOwnedPokemon } from "../storage";
const catchVariants = {
    catch: {
        scale: 2.5,
        y: [0, 100, 80, 100],
        x: [0, -10, 10, -10, 10, 0],
        rotate: [0, -20, 20, -10, 10, 0],
        transition: {
            x: {
                delay: 1,
                repeat: Infinity,
            },
            rotate: {
                delay: 1,
                repeat: Infinity,
            },
        },
    },
    fail: {
        y: 100,
        scale: 0
    },
    success: {
        scale: 2.5
    },
}
const littlecatchVariants = {
    catch: {
        opacity: 0,
        scale: 2.5,
        y: [20, 120, 100, 120],
        x: [-23, -33, -13, -33, -13, -23],
        rotate: [0, -20, 20, -10, 10, 0],
        transition: {
            x: {
                delay: 1,
                repeat: Infinity,
            },
            rotate: {
                delay: 1,
                repeat: Infinity,
            },
        },
    },
    fail: {
        opacity: 0,
    },
    success: {
        opacity: 1,
        scale: 500,
        transition: {
            opacity: {
                duration: 0.1
            },
            scale: {
                delay: 0.5
            }
        }
    },
}



export default function CatchPokeballModal({ show, updateShow, pokemon }) {
    const router = useRouter()
    const {
        query: { name },
    } = router;
    const [pokeballState, updatePokeballState] = useState("catch");
    const [pokemonName, updatePokemonName] = useState("");
    const [gatcha, updateGatcha] = useState(false);
    useEffect(() => {
        if (show) setTimeout(() => {
            console.log('fail');
            if (!gatcha) {
                updateGatcha(true);
                if (Math.random() > 0.5) {
                    updatePokeballState('fail');
                } else {
                    updatePokeballState('success');
                }

            }
        }, 2000)
        else {
            // reset
            updatePokeballState('catch');
            updateGatcha(false);
        }
    }, [show])


    function submitName(species: string | string[], pickedName: string, pokemon: any) {
    
        let payload = {
            species_name: typeof species =='string' ? species: (species[0] || ''),
            name: pickedName,
            image: pokemon.sprites.front_default,
        }
        try {
            addOwnedPokemon(payload);
        } catch (e) {
            toast.error(e);
            return;
        }
        updatePokemonName("");
        updateShow(false);
    }

    return <Modal show={show} updateShow={updateShow} noAction>
        <div className="w-full h-60 bg-pokeball flex justify-center">
            <motion.img variants={catchVariants} animate={pokeballState} className="h-6 w-auto m-2" src="https://pokedex.stevenhansel.com/assets/images/pokeball.png" alt="Pokemon Mini" />
            <motion.div variants={littlecatchVariants} animate={pokeballState} className="w-1 h-1 bg-white rounded-full"></motion.div>
            <AnimatePresence>
                {
                    pokeballState == 'fail' &&
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.1, marginTop: '30px' }}
                        transition={{
                            delay: 0.75
                        }}
                        className="text-white text-xl">
                        Pokemon Run Away!
                    </motion.span>
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    pokeballState == 'success' &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, }}
                        className="text-pokeball text-xl w-full z-10">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Name Your Pokemon
                                    </h3>
                                    <div className="mt-2">
                                        <div className="col-span-3 sm:col-span-2">

                                            <div className="mt-1 flex rounded-md shadow-sm w-full">

                                                <input
                                                    value={pokemonName} onChange={(e) => updatePokemonName(e.target.value)}
                                                    type="text" placeholder="pikachu.. or something"
                                                    className="p-3 h-10 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 text-black" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="button"
                                onClick={() => submitName(name, pokemonName, pokemon)}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Submit
                                </button>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>

    </Modal>
}