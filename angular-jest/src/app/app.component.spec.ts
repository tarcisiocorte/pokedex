import { AppComponent } from './app.component';
import { MainComponent } from './pokemon/index/main/main.component';
import { PokemonComponent } from './pokemon/pages/pokemon/pokemon.component';
import { routes } from './app-routing.module';

describe('Tests about AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('should create the <app-component/>', () => {
    expect(component).toBeTruthy();
  });
});

describe('AppComponent Template', () => {
  it('should set the title to "pokedexApp"', () => {
    const app = new AppComponent();
    expect(app.title).toBe('pokedexApp');
  });
});
