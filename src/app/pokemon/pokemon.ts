import { Ability } from './ability';

export interface Sprites {
  front_default: string;
  back_default: string;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: Ability;
}

export class Pokemon {
  constructor(
    public id: number,
    public name: string,
    public sprites: Sprites,
    public abilities: PokemonAbility[]
  ) {}
}
