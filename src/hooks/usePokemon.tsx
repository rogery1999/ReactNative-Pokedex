/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/PokemonApi';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState({} as PokemonFull);

  const loadPokemon = async () => {
    const { data } = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    setPokemon(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};

export default usePokemon;
