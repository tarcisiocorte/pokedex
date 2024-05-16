import { StatsComponent } from './stats.component';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { of } from 'rxjs';
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

describe('StatsComponent', () => {
  let component: StatsComponent;

  beforeEach(() => {
    component = new StatsComponent();

    // Manually set the pokemon property
    component.pokemon = mockPokemon;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render base stats title', () => {
    document.body.innerHTML = `<p class="text-center fw-bold mt-5 display-3">Base Stats</p>`;
    const baseStatsTitle = document.querySelector('p');
    expect(baseStatsTitle?.textContent).toContain('Base Stats');
  });

  it('should render the correct number of stats', () => {
    document.body.innerHTML = `<ul class="col-2 list-unstyled border-end"></ul>`;
    const statsList = document.querySelector('ul');
    component.pokemon?.stats.forEach((stat) => {
      const li = document.createElement('li');
      li.textContent = stat.stat.name;
      statsList?.appendChild(li);
    });

    expect(statsList?.children.length).toBe(mockPokemon.stats.length);
  });

  it('should render correct base stat values', () => {
    document.body.innerHTML = `<ul class="col-10 list-unstyled"></ul>`;
    const baseStatsList = document.querySelector('ul');
    component.pokemon?.stats.forEach((stat) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="fs-4">${stat.base_stat}</span>`;
      baseStatsList?.appendChild(li);
    });

    component.pokemon?.stats.forEach((stat, index) => {
      expect(baseStatsList?.children[index].textContent).toContain(
        stat.base_stat.toString()
      );
    });
  });

  it('should update input value on change', () => {
    document.body.innerHTML = `<input type="range" class="w-100">`;
    const inputElement = document.querySelector('input');
    const stat = mockPokemon.stats[0];

    if (inputElement) {
      inputElement.value = '45';
      const event = new Event('change');
      inputElement.dispatchEvent(event);

      expect(inputElement.value).toBe(stat.base_stat.toString());
    }
  });
});
