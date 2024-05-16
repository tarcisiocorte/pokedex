import axios from 'axios';
import { config } from '../config';

export class PokemonConnection {
  async getPokemon(offset: number, limit: number) {
    try {
      const response = await axios.get(
        `${config.pokeApiUrl}pokemon?offset=${offset}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getPokemonById(id: number) {
    try {
      const response = await axios.get(`${config.pokeApiUrl}pokemon/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async getPokemonBySpecies(specie: string) {
    try {
      const response = await axios.get(
        `${config.pokeApiUrl}pokemon-species/${specie}/`,
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}
