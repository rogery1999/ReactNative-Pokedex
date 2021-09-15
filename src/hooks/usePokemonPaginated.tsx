/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/PokemonApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

const usePokemonPaginated = () => {
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
  const [isLoading, setIsLoading] = useState(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    []
  );
  const loadPokemons = async () => {
    setIsLoading(true);
    const {
      data: { next, results },
    } = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
    nextPageUrl.current = next;
    mapPokemonList(results);
    setIsLoading(false);
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
    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
  };
  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    isLoading,
    simplePokemonList,
    loadPokemons,
  };
};

export default usePokemonPaginated;
