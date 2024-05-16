import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from '../../modules/services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemon(
    @Query('offset') offset = 0,
    @Query('limit') limit = 12,
  ): Promise<Pokemon[]> {
    return this.pokemonService.getPokemon(offset, limit);
  }

  @Get(':id')
  async getPokemonById(@Param('id') id: number): Promise<string> {
    return this.pokemonService.getPokemonById(id);
  }

  @Get('specie/:name')
  async getPokemonBySpecies(@Param('name') name: string): Promise<string> {
    return this.pokemonService.getPokemonBySpecies(name);
  }
}
