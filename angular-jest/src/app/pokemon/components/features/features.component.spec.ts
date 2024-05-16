import { FeaturesComponent } from './features.component';
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
};

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;

  beforeEach(() => {
    component = new FeaturesComponent();

    mockPokemonService.getPokemon().subscribe((pokemon: Pokemon) => {
      component.pokemon = pokemon;
    });
  });

  it('should create <pokemon-features/>', () => {
    expect(component).toBeTruthy();
  });

  it('should render pokemon weight property in <span/>', () => {
    const compiled = component as any;
    const tag = compiled.pokemon.weight + ' kg';
    expect(tag).toContain(`${mockPokemon.weight} kg`);
  });

  it('should render pokemon height property in <span/>', () => {
    const compiled = component as any;
    const tag = compiled.pokemon.height + ' m';
    expect(tag).toContain(`${mockPokemon.height} m`);
  });

  it('should render two pokemon moves one for each <li/>', () => {
    const compiled = component as any;
    const listItems = mockPokemon.moves;
    expect(listItems.length).toBe(1);
    expect(listItems[0].move.name).toContain(mockPokemon.moves[0].move.name);
  });
});
