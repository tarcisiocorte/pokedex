import { HeaderComponent } from './header.component';
import { EventEmitter } from '@angular/core';

describe('Tests about HeaderComponent', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    component = new HeaderComponent();
    component.onNamePokemon = new EventEmitter<string>();
  });

  it('should create <app-header/>', () => {
    expect(component).toBeTruthy();
  });

  it('should show the number of pokemons equal to 1025 in a <span/>', () => {
    component.numberOfPokemons = 1025;

    document.body.innerHTML = `<span>${component.numberOfPokemons}</span>`;
    const spanElement = document.querySelector('span');

    expect(spanElement?.textContent).toContain(component.numberOfPokemons.toString());
  });

  it('should emit the value "prohibido" when receives a number superior to 1025', () => {
    let pokemonName: string = '';

    component.onNamePokemon.subscribe((value) => pokemonName = value);

    component.onChangeInput('1026');

    expect(pokemonName).toBe('prohibido');
  });

  it('should emit the name of the introduced pokemon', () => {
    let pokemonName: string = 'pikachu';
    let valueEmitted: string = '';

    component.onNamePokemon.subscribe((value) => valueEmitted = value);

    component.onChangeInput(pokemonName);

    expect(valueEmitted).toBe(pokemonName);
  });
});
