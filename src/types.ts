export enum CardType {
  Club,
  Diamond,
  Heart,
  Spade,
}

export interface Card {
  code: number;
  type: CardType;
  getCode: () => string;
  getName: () => string;
  getColor: () => string;
}

export type Player = {
  name: string;
  cards: Card[];
  standing: boolean;
  score: number;
  hit: () => void;
  stand: () => void;
  count: () => number;
};

export type GameState = {
  deck: Card[];
  player: Player;
  dealer: Player;
  playerTurn: boolean;
  x: number;
  y: number;
};
