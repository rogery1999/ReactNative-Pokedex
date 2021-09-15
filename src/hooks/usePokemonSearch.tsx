/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/PokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    []
  );

  const loadPokemons = async () => {
    const {
      data: { results },
    } = await pokemonApi.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200'
    );
    mapPokemonList(results);
  };
  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      const urlParts = url.split('/').reverse();
      const id = urlParts[1];
      return {
        id,
        name,
        picture: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    });
    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isFetching,
    simplePokemonList,
  };
};

export default usePokemonSearch;
