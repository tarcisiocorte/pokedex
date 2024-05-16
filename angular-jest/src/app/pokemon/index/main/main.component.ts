import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  pokemons: Pokemon[] = [];
  idSearchedPokemon: number | undefined;
  isProhibited: boolean = false;
  isLoading = false;
  errorLoading = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe({
      next: (pokemons) => {
        this.pokemons = pokemons;
      },
      error: (error) => {
        console.error('Error fetching Pokémon:', error);
        this.errorLoading = true;
      },
    });
  }

  loadMorePokemons() {
    this.isLoading = true;
    this.errorLoading = false;

    this.pokemonService.getPokemons().subscribe({
      next: (pokemons) => {
        this.pokemons.push(...pokemons);
      },
      error: (error) => {
        console.error('Error loading Pokémon:', error);
        this.errorLoading = true;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getPokemonByNameOrId(pokemonName: string) {
    if (pokemonName === 'prohibido') {
      this.isProhibited = true;
      return;
    }

    pokemonName = pokemonName.toLowerCase();

    this.pokemons = [];
    this.isProhibited = false;
    this.errorLoading = false;
    this.idSearchedPokemon = this.pokemonService.offset || 0;

    this.callPokemonService(pokemonName);
  }

  callPokemonService(pokemonName: string) {
    this.pokemonService.getPokemonByName(pokemonName).subscribe({
      next: (pokemon) => {
        this.pokemons.push(pokemon);
        this.idSearchedPokemon =
          pokemon.id === 1025 ? pokemon.id - 2 : pokemon.id - 1;
        this.pokemonService.offset = this.idSearchedPokemon;
      },
      error: (error) => {
        console.error('Error fetching Pokémon:', error);
        this.pokemons = [];
        this.errorLoading = true;
      },
    });
  }

  getPokemons(numberOffsetPokemons: number = 0) {
    this.errorLoading = false;
    this.pokemonService.offset = numberOffsetPokemons; // Set the offset before fetching
    this.pokemonService.getPokemons().subscribe({
      next: (pokemons) => {
        if (pokemons.length === 0) {
          return;
        }
        this.isProhibited = false;
        this.pokemons = pokemons;
      },
      error: (error) => {
        console.error('Error fetching Pokémon:', error);
        this.errorLoading = true;
      },
    });
  }
}
