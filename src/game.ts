import { state } from "./state";
import { Card, CardType } from "./types";
import { createCard } from "./utils";

export const initGame = () => {
  const cards: Card[] = [];
  for (let i = 1; i < 14; i++) {
    cards.push(createCard(i, CardType.Club));
    cards.push(createCard(i, CardType.Diamond));
    cards.push(createCard(i, CardType.Heart));
    cards.push(createCard(i, CardType.Spade));
  }
  state.deck = cards.sort(() => Math.random() - 0.5);
  state.dealer.cards.push(state.deck.pop()!);
  state.player.cards.push(state.deck.pop()!);
  state.dealer.cards.push(state.deck.pop()!);
  state.player.cards.push(state.deck.pop()!);
};

export const getWinner = () => {
  const playerCount = state.player.count();
  const dealerCount = state.dealer.count();
  const playerStand = state.player.standing;
  const dealerStand = state.dealer.standing;

  if (playerCount === 21 || dealerCount > 21) return state.player;
  if (dealerCount === 21 || playerCount > 21) return state.dealer;
  if (playerStand && dealerCount > playerCount) return state.dealer;
  if (dealerStand && playerCount > dealerCount) return state.player;

  return null;
};

export const isFinished = () => getWinner() != null;
