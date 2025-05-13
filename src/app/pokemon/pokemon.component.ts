// pokemon.component.ts
import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
  standalone: false,
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemon[] = [];
  currentPage = 0;
  limit = 12;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(page: number): void {
    this.currentPage = page;
    const offset = page * this.limit;
    this.pokemonService.getPokemonList(this.limit, offset).subscribe((data) => {
      this.pokemons = data;
    });
  }

  nextPage(): void {
    this.loadPage(this.currentPage + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1);
    }
  }
}
