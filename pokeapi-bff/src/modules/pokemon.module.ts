import { Module } from '@nestjs/common';
import { PokemonService } from './services/pokemon.service';
import { PokemonConnection } from '../data-layer/pokemon.connection';

@Module({
  providers: [PokemonService, PokemonConnection],
  exports: [PokemonService],
})
export class PokemonModule {}
