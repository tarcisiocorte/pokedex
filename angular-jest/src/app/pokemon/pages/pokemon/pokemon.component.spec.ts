import { PokemonComponent } from './pokemon.component';
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
  getPokemonById: jest.fn().mockReturnValue(of(mockPokemon)),
  changePokemon: jest.fn(),
};

const mockRouter = {
  navigate: jest.fn(),
};

describe('PokemonComponent', () => {
  let component: PokemonComponent;

  beforeEach(() => {
    component = new PokemonComponent(
      mockPokemonService as any,
      mockRouter as any,
      {} as any
    );

    mockPokemonService.getPokemonById().subscribe((pokemon: Pokemon) => {
      component.pokemon = pokemon;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set Pokemon data on init', () => {
    expect(component.pokemon).toEqual(mockPokemon);
  });

  it('should call changePokemon method when left arrow is clicked', () => {
    jest.spyOn(component, 'changePokemon');
    component.changePokemon(false);
    expect(component.changePokemon).toHaveBeenCalledWith(false);
  });

  it('should navigate to another Pokemon when right arrow is clicked', () => {
    jest.spyOn(component, 'changePokemon');
    component.changePokemon(true);
    expect(component.changePokemon).toHaveBeenCalledWith(true);
  });
});
