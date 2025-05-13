import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Pokemon } from './pokemon';
import { Ability } from './ability';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

getPokemonList(limit: number = 12, offset: number = 0): Observable<Pokemon[]> {
  return this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`).pipe(
    switchMap((response) => {
      const requests: Observable<Pokemon>[] = response.results.map((pokemon: any) =>
        this.http.get<any>(pokemon.url).pipe(
          map((data) => {
            const abilities = data.abilities.map((ab: any) => ({
              is_hidden: ab.is_hidden,
              slot: ab.slot,
              ability: new Ability(ab.ability.name, ab.ability.url),
            }));

            return new Pokemon(
              data.id,
              data.name,
              {
                front_default: data.sprites.front_default,
                back_default: data.sprites.back_default,
              },
              abilities
            );
          })
        )
      );
      return forkJoin<Pokemon[]>(requests);
    })
  );
}

}
