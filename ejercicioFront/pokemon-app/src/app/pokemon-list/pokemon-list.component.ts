import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemon';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  sortedPokemonList: Pokemon[] = [];
  sortDirection = 'asc';
  itemsPerPage = 10;
  currentPage = 1;
  searchTerm = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=151').subscribe((response: any) => {
      this.pokemonList = response.results.map((pokemon: any, index: number) => {
        return {
          id: index + 1,
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          types: [],
          deleted: false
        };
      });

      // Retrieve Pokemon types for each Pokemon
      this.pokemonList.forEach(pokemon => {
        this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).subscribe((response: any) => {
          pokemon.types = response.types.map((type: any) => type.type.name);
        });
      });

      this.sortedPokemonList = [...this.pokemonList];
    });
  }

  sortPokemonList(direction: string) {
    this.sortDirection = direction;
    this.sortedPokemonList.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  filterPokemonList() {
    return this.sortedPokemonList.filter(pokemon => {
      return pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) && !pokemon.deleted;
    });
  }

  deletePokemon(pokemon: Pokemon) {
    pokemon.deleted = true;
  }
}
