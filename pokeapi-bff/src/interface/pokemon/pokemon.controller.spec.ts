import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../../modules/services/pokemon.service';

describe('PokemonController', () => {
  let controller: PokemonController;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            getPokemon: jest.fn(),
            getPokemonById: jest.fn(),
            getPokemonBySpecies: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    pokemonService = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPokemon', () => {
    it('should return an array of Pokemon', async () => {
      const result = [
        { name: 'Pikachu', url: 'https://pokeapi.co/pokemon/25/' },
      ];
      jest.spyOn(pokemonService, 'getPokemon').mockResolvedValue(result);

      const offset = 0;
      const limit = 12;

      expect(await controller.getPokemon(offset, limit)).toBe(result);
      expect(pokemonService.getPokemon).toHaveBeenCalledWith(offset, limit);
    });
  });

  describe('getPokemonById', () => {
    it('should return a string', async () => {
      const result = 'Pikachu';
      const id = 25;
      jest.spyOn(pokemonService, 'getPokemonById').mockResolvedValue(result);

      expect(await controller.getPokemonById(id)).toBe(result);
      expect(pokemonService.getPokemonById).toHaveBeenCalledWith(id);
    });
  });

  describe('getPokemonBySpecies', () => {
    it('should return a Pokemon object', async () => {
      const result = 'Pikachu';
      const speciesName = 'bulbasaur';
      jest
        .spyOn(pokemonService, 'getPokemonBySpecies')
        .mockResolvedValue(result);

      expect(await controller.getPokemonBySpecies(speciesName)).toBe(result);
      expect(pokemonService.getPokemonBySpecies).toHaveBeenCalledWith(
        speciesName,
      );
    });
  });
});
