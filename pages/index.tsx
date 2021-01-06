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


export default function Home() {
  const router = useRouter()

  const [listPokemon, updateListPokemon] = useState([]);
  const [limit, updateLimit] = useState(30);
  const [offset, updateOffset] = useState(0);

  function reqListPokemon() {
    if (offset == -1) return listPokemon;
    return requestListPokemon(limit, offset)
      // .then((data) => new Promise(resolve => setTimeout(() => resolve(data), 50000)))
      .then(({ data }) => {
        const { pokemons } = data;
        updateOffset(pokemons.nextOffset == 0 ? -1 : pokemons.nextOffset);
        updateListPokemon(listPokemon.concat(pokemons.results));
        return listPokemon;
      })
  }
  useEffect(() => {
    // Run! Like go get some data from an API.
    reqListPokemon();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>List Pokemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation main={
        (
          <div className="flex flex-column h-full">
            <main className={styles.main}>
              <div
                id="scrollableDiv"
                className="flex-1"
                style={{
                  overflow: 'auto',
                  display: 'flex',
                }}
              >
                <InfiniteScroll
                  className="flex flex-wrap w-full"
                  dataLength={listPokemon.length}
                  next={reqListPokemon}
                  hasMore={offset != -1}
                  loader={<>
                    {[...Array(limit)].map((e, i) => <PokemonSkeleton />)}
                  </>}
                  scrollableTarget="scrollableDiv"
                  endMessage={
                    <p className="w-full text-2xl" style={{ textAlign: 'center' }}>
                      <b>There is no more Pokemon!</b>
                    </p>
                  }
                >
                  {listPokemon.map((pokemon, index) => (
                    <div className="p-2 w-full sm:w-full md:w-1/3 lg:w-2/12 transform hover:-translate-y-1 hover:scale-110 transition duration-500 ease-in-out hover:ring-red" key={index}>
                      <article className="w-full overflow-hidden rounded-lg shadow hover:shadow-lg hover:text-pokeball">

                        <a onClick={() => router.push('/pokemon/detail/' + pokemon.name)}>
                          <ImageLoader
                            style={{}}
                            className="w-full"
                            src={pokemon.image}
                            loading={() => <Loader size="70px" />}
                            error={() => <div>Error</div>}
                          />
                        </a>

                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                          <h1 className="text-2xl sm:text-lg hover:underline text-center w-full" onClick={() => router.push('/pokemon/detail/' + pokemon.name)}>
                            {toTitleCase(pokemon.name)}
                          </h1>

                        </header>

                      </article>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </main>
          </div>
        )
      } />


    </div>
  )
}
