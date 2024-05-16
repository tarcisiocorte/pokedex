import { DetailComponent } from './detail.component';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';

const mockRouter = {
  navigate: jest.fn(),
};

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
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' },
    },
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/',
      },
    },
    {
      base_stat: 65,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/',
      },
    },
    {
      base_stat: 45,
      effort: 0,
      stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
    },
  ],
  game_indices: [],
  held_items: [],
  location_area_encounters: '',
  past_abilities: [],
  past_types: [],
};

describe('DetailComponent', () => {
  let component: DetailComponent;

  beforeEach(() => {
    component = new DetailComponent();

    component.pokemon = mockPokemon;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct Pokemon details', () => {
    document.body.innerHTML = `
      <li class="card">
        <span class="card-number">#${component.pokemon?.id}</span>
        <img src="${component.pokemon?.image}" alt="${component.pokemon?.name}" class="card-img-top">
        <h2 class="card-title text-center fw-bold text-capitalize">${component.pokemon?.name}</h2>
      </li>
    `;

    const cardNumber = document.querySelector('.card-number');
    const cardImg = document.querySelector('.card-img-top');
    const cardTitle = document.querySelector('.card-title');

    expect(cardNumber?.textContent).toContain(`#${mockPokemon.id}`);
    expect(cardImg?.getAttribute('src')).toBe(mockPokemon.image);
    expect(cardImg?.getAttribute('alt')).toBe(mockPokemon.name);
    expect(cardTitle?.textContent).toBe(mockPokemon.name);
  });
});
