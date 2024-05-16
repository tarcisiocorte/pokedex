import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { environments } from '../../../environments/environments';
import { Result, UrlPokemon } from '../interfaces/url-pokemon.interface';
import { Pokemon, Species } from '../interfaces/pokemon.interface';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPokemons', () => {
    it('should fetch pokemons and return a filtered list', () => {
      interface UrlPokemon {
        count: number;
        next: string;
        previous: string;
        results: Result[];
      }

      const mockPokemon1: Pokemon = {
        id: 1,
        name: 'bulbasaur',
        hasBeDeleted: false,
        moves: [{
          move: {
            name: 'tackle',
            url: ''
          },
          version_group_details: []
        }, {
          move: {
            name: 'vine whip',
            url: ''
          },
          version_group_details: []
        }],
        image: 'https://pokeapi.co/api/v2/pokemon/1.png',
        types: [],
        stats: [],
        abilities: [],
        base_experience: 0,
        forms: [],
        game_indices: [],
        height: 0,
        held_items: [],
        is_default: false,
        location_area_encounters: '',
        order: 0,
        past_abilities: [],
        past_types: [],
        species: {
          name: '',
          url: ''
        },
        weight: 0
      };

      const mockPokemon2: Pokemon = {
        id: 2,
        name: 'ivysaur',
        hasBeDeleted: false,
        moves: [{
          move: {
            name: 'tackle',
            url: ''
          },
          version_group_details: []
        }, {
          move: {
            name: 'vine whip',
            url: ''
          },
          version_group_details: []
        }],
        image: 'https://pokeapi.co/api/v2/pokemon/2.png',
        types: [],
        stats: [],
        abilities: [],
        base_experience: 0,
        forms: [],
        game_indices: [],
        height: 0,
        held_items: [],
        is_default: false,
        location_area_encounters: '',
        order: 0,
        past_abilities: [],
        past_types: [],
        species: {
          name: '',
          url: ''
        },
        weight: 0
      };

      const mockResponse = {
        results: [
          { name: 'bulbasaur' },
          { name: 'ivysaur' }
        ]
      };

      service.getPokemons().subscribe((pokemons) => {
        expect(pokemons.length).toBe(2);
        expect(pokemons).toEqual([mockPokemon1, mockPokemon2]);
      });

      const req = httpMock.expectOne(`${environments.url}?offset=0&limit=12`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      mockResponse.results.forEach((result: { name: any; }, index: number) => {
        const pokemonReq = httpMock.expectOne(
          `${environments.url}/${result.name}`
        );
        pokemonReq.flush(index === 0 ? mockPokemon1 : mockPokemon2);
      });
    });
  });

  describe('getPokemonByName', () => {
    it('should fetch a pokemon by name and modify its properties', () => {
      const mockPokemon: Pokemon = {
        id: 1,
        name: 'bulbasaur',
        hasBeDeleted: false,
        moves: [{
          move: {
            name: 'tackle',
            url: ''
          },
          version_group_details: []
        }, {
          move: {
            name: 'vine whip',
            url: ''
          },
          version_group_details: []
        }],
        image: 'https://pokeapi.co/api/v2/pokemon/1.png',
        types: [],
        stats: [],
        abilities: [],
        base_experience: 0,
        forms: [],
        game_indices: [],
        height: 0,
        held_items: [],
        is_default: false,
        location_area_encounters: '',
        order: 0,
        past_abilities: [],
        past_types: [],
        species: {} as Species,
        weight: 0
      };

      service.getPokemonByName('bulbasaur').subscribe((pokemon) => {
        expect(pokemon.hasBeDeleted).toBe(false);
        expect(pokemon.moves.length).toBe(2);
        expect(pokemon.image).toBe(`${environments.urlImage}/1.png`);
      });

      const req = httpMock.expectOne(`${environments.url}/bulbasaur`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemon);
    });
  });

  describe('getPokemonDecription', () => {
    it('should fetch the pokemon description', () => {
      const mockDescriptionResponse = {
        flavor_text_entries: [
          {
            flavor_text:
              'A strange seed was planted on its back at birth.\fThe plant sprouts and grows with this POKéMON.',
          },
        ],
      };

      service.getPokemonDecription('bulbasaur').subscribe((description) => {
        expect(description).toBe(
          'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.'
        );
      });

      const req = httpMock.expectOne(
        `${environments.urlWithDescription}/bulbasaur`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockDescriptionResponse);
    });
  });

  describe('offset', () => {
    it('should get and set offset', () => {
      service.offset = 10;
      expect(service.offset).toBe(10);
    });
  });
});
