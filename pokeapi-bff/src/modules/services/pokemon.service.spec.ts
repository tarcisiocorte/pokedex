import { PokemonService } from './pokemon.service';
import { PokemonConnection } from './../../data-layer/pokemon.connection';

jest.mock('./../../data-layer/pokemon.connection');

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonData: PokemonConnection;

  beforeEach(() => {
    pokemonData = new PokemonConnection();
    pokemonService = new PokemonService(pokemonData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPokemon', () => {
    it('should return an array of Pokemon', async () => {
      (pokemonData.getPokemon as jest.Mock).mockResolvedValueOnce([
        'pokemon1',
        'pokemon2',
      ]);

      const result = await pokemonService.getPokemon(0, 10);

      expect(result).toEqual(['pokemon1', 'pokemon2']);
    });

    it('should throw an error if getPokemon fails', async () => {
      (pokemonData.getPokemon as jest.Mock).mockRejectedValueOnce('Error');

      await expect(pokemonService.getPokemon(0, 10)).rejects.toEqual('Error');
    });
  });

  describe('getPokemonById', () => {
    it('should return a Pokemon', async () => {
      (pokemonData.getPokemonById as jest.Mock).mockResolvedValueOnce(
        'pokemon1',
      );

      const result = await pokemonService.getPokemonById(1);

      expect(result).toEqual('pokemon1');
    });

    it('should throw an error if getPokemonById fails', async () => {
      (pokemonData.getPokemonById as jest.Mock).mockRejectedValueOnce('Error');

      await expect(pokemonService.getPokemonById(1)).rejects.toEqual('Error');
    });
  });

  describe('getPokemonBySpecies', () => {
    it('should return a Pokemon species', async () => {
      (pokemonData.getPokemonBySpecies as jest.Mock).mockResolvedValueOnce(
        'species1',
      );

      const result = await pokemonService.getPokemonBySpecies('pikachu');

      expect(result).toEqual('species1');
    });

    it('should throw an error if getPokemonBySpecies fails', async () => {
      (pokemonData.getPokemonBySpecies as jest.Mock).mockRejectedValueOnce(
        'Error',
      );

      await expect(
        pokemonService.getPokemonBySpecies('pikachu'),
      ).rejects.toEqual('Error');
    });
  });
});
