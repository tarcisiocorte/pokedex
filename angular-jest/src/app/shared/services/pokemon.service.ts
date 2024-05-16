import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, filter, map, switchMap, tap } from 'rxjs';

import { Pokemon } from '../interfaces/pokemon.interface';
import { UrlPokemon } from '../interfaces/url-pokemon.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private _offset = 0;
  private _limit = 12;
  numberOfPokemons = 0;

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    const url = `${environments.url}?offset=${this._offset}&limit=${this._limit}`;
    this._offset += this._limit;

    return this.http.get<UrlPokemon>(url).pipe(
      filter((resp) => resp.results.length > 0),
      tap((resp) => {
        this.numberOfPokemons = resp.count;
      }),
      switchMap((resp) =>
        combineLatest(
          resp.results.map((pokemon) => this.getPokemonByName(pokemon.name))
        )
      ),
      map((pokemons) => pokemons.filter((pokemon) => !pokemon.hasBeDeleted))
    );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environments.url}/${name}`).pipe(
      map((pokemon) => {
        pokemon.hasBeDeleted = pokemon.id > 1025;
        pokemon.moves = pokemon.moves.slice(0, 2);
        pokemon.image = `${environments.urlImage}/${pokemon.id}.png`;
        return pokemon;
      })
    );
  }

  getPokemonDecription(name: string) {
    return this.http
      .get(`${environments.urlWithDescription}/${name}`)
      .pipe(
        map((pokemon: any) =>
          pokemon.flavor_text_entries[0].flavor_text.replace('\f', ' ')
        )
      );
  }

  get offset() {
    return this._offset;
  }

  set offset(newOffset: number) {
    this._offset = newOffset;
  }
}
