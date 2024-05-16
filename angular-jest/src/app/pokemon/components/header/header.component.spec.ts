import { HeaderComponent } from './header.component';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { Router } from '@angular/router';
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
  sprites: undefined,
  stats: [],
};

const mockPokemonService = {
  getPokemon: jest.fn().mockReturnValue(of(mockPokemon)),
};

const mockRouter = {
  navigate: jest.fn(),
  navigateByUrl: jest.fn(),
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    component = new HeaderComponent(
      mockPokemonService as any,
      mockRouter as any
    );

    mockPokemonService.getPokemon().subscribe((pokemon: Pokemon) => {
      component.pokemon = pokemon;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set Pokemon name and id on init', () => {
    expect(component.pokemon).toEqual(mockPokemon);
  });

  it('should call setBackPokemon method when arrow back is clicked', () => {
    jest.spyOn(component, 'setBackPokemon');
    component.setBackPokemon();
    expect(component.setBackPokemon).toHaveBeenCalled();
  });
});
