import axios from 'axios';
import { PokemonConnection } from './pokemon.connection';

jest.mock('axios');

describe('PokemonData', () => {
  let pokemonData: PokemonConnection;

  beforeEach(() => {
    pokemonData = new PokemonConnection();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemon', () => {
    it('should return Pokemon data', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: 'pokemon data' });

      const result = await pokemonData.getPokemon(0, 10);

      expect(result).toEqual('pokemon data');
    });

    it('should throw an error if getPokemon fails', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce({
        response: { data: 'Error' },
      });

      await expect(pokemonData.getPokemon(0, 10)).rejects.toEqual('Error');
    });
  });

  describe('getPokemonById', () => {
    it('should return Pokemon data by id', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: 'pokemon data by id',
      });

      const result = await pokemonData.getPokemonById(1);

      expect(result).toEqual('pokemon data by id');
    });

    it('should throw an error if getPokemonById fails', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce({
        response: { data: 'Error' },
      });

      await expect(pokemonData.getPokemonById(1)).rejects.toEqual('Error');
    });
  });

  describe('getPokemonBySpecies', () => {
    it('should return Pokemon data by species', async () => {
      (axios.get as jest.Mock).mockResolvedValueOnce({
        data: 'pokemon data by species',
      });

      const result = await pokemonData.getPokemonBySpecies('pikachu');

      expect(result).toEqual('pokemon data by species');
    });

    it('should throw an error if getPokemonBySpecies fails', async () => {
      (axios.get as jest.Mock).mockRejectedValueOnce({
        response: { data: 'Error' },
      });

      await expect(pokemonData.getPokemonBySpecies('pikachu')).rejects.toEqual(
        'Error',
      );
    });
  });
});
