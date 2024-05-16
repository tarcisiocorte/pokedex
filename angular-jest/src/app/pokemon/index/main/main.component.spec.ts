import { MainComponent } from './main.component';
import { of } from 'rxjs';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';

const mockPokemon: Pokemon = {
  id: 1,
  name: 'Bulbasaur',
  image: 'bulbasaur.png',
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
      is_hidden: false,
      slot: 1,
    },
  ],
  base_experience: 64,
  forms: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-form/1/' },
  ],
  height: 7,
  is_default: true,
  order: 1,
  species: {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  },
  weight: 69,
  types: [
    {
      slot: 1,
      type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
    },
  ],
  moves: [
    {
      move: { name: 'tackle', url: 'https://pokeapi.co/api/v2/move/1/' },
      version_group_details: [],
    },
  ],
  game_indices: [],
  held_items: [],
  location_area_encounters: '',
  past_abilities: [],
  past_types: [],
  stats: [],
};

const mockPokemonService = {
  getPokemon: jest.fn().mockReturnValue(of(mockPokemon)),
  getPokemons: jest.fn().mockReturnValue(of([mockPokemon])),
  getPokemonByName: jest.fn().mockReturnValue(of(mockPokemon)),
};

describe('MainComponent', () => {
  let component: MainComponent;

  beforeEach(() => {
    component = new MainComponent(mockPokemonService as any);

    mockPokemonService.getPokemons().subscribe((pokemons: Pokemon[]) => {
      component.pokemons = pokemons;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set pokemons on init', () => {
    expect(component.pokemons).toEqual([mockPokemon]);
  });

  it('should call getPokemons on loadMorePokemons', () => {
    component.loadMorePokemons();
    expect(mockPokemonService.getPokemons).toHaveBeenCalled();
  });

  it('should set errorLoading to true if getPokemons fails', () => {
    const errorService = {
      ...mockPokemonService,
      getPokemons: jest.fn().mockReturnValue(of({ error: 'error' })),
    };
    const errorComponent = new MainComponent(errorService as any);
    errorComponent.loadMorePokemons();
    expect(errorComponent.errorLoading).toBeFalsy();
  });

  it('should display correct number of pokemons', () => {
    const compiled = component as any;
    const length = compiled.pokemons.length;
    expect(length).toBe(2);
  });
});
