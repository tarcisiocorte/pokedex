import { Module } from '@nestjs/common';
import { PokemonController } from './interface/pokemon/pokemon.controller';

import { PokemonModule } from './modules/pokemon.module';

@Module({
  imports: [PokemonModule],
  controllers: [PokemonController],
})
export class AppModule {}
