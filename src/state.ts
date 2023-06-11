import { GameState } from "./types";
import { getCardsValue } from "./utils";

export const state: GameState = {
  deck: [],
  player: {
    name: "Player",
    cards: [],
    standing: false,
    score: 0,
    hit: () => {},
    stand: () => {},
    count: () => 0,
  },
  dealer: {
    name: "Dealer",
    cards: [],
    standing: false,
    score: 0,
    hit: () => {},
    stand: () => {},
    count: () => 0,
  },
  playerTurn: true,
  x: 0,
  y: 0,
};

state.player.hit = () => state.player.cards.push(state.deck.pop()!);
state.player.stand = () => (state.player.standing = true);
state.player.count = () => getCardsValue(state.player.cards);
state.dealer.hit = () => state.dealer.cards.push(state.deck.pop()!);
state.dealer.stand = () => (state.dealer.standing = true);
state.dealer.count = () => getCardsValue(state.dealer.cards);

export const resetState = () => {
  state.deck = [];
  state.player = {
    ...state.player,
    cards: [],
    standing: false,
  };
  state.dealer = {
    ...state.dealer,
    cards: [],
    standing: false,
  };
  state.playerTurn = true;
  state.x = 0;
  state.y = 0;
};
