import { Injectable } from '@nestjs/common';
import { PokemonConnection } from './../../data-layer/pokemon.connection';
import { Pokemon } from '../../models/pokemon.model';

@Injectable()
export class PokemonService {
  constructor(private readonly pokemonData: PokemonConnection) {}

  async getPokemon(offset: number, limit: number): Promise<Pokemon[]> {
    return this.pokemonData.getPokemon(offset, limit);
  }

  async getPokemonById(id: number): Promise<string> {
    return this.pokemonData.getPokemonById(id);
  }

  async getPokemonBySpecies(specie: string): Promise<string> {
    return this.pokemonData.getPokemonBySpecies(specie);
  }
}
