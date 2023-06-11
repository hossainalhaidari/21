import { Card, CardType } from "./types";

const getCardSymbol = (card: Card) => {
  switch (card.type) {
    case CardType.Club:
      return "♣";
    case CardType.Diamond:
      return "♦";
    case CardType.Heart:
      return "♥";
    case CardType.Spade:
      return "♠";
  }
};

const getCardColor = (card: Card) => {
  switch (card.type) {
    case CardType.Club:
    case CardType.Spade:
      return "black";
    case CardType.Diamond:
    case CardType.Heart:
      return "red";
  }
};

const getCardValue = (card: Card, aceAsOne = true) =>
  card.code > 10 ? 10 : card.code === 1 && !aceAsOne ? 11 : card.code;

export const createCard = (code: number, type: CardType): Card => {
  const card: Card = {
    code,
    type,
    getCode: () => "",
    getName: () => "",
    getColor: () => "",
  };

  card.getCode = () => {
    switch (card.code) {
      case 13:
        return "K";
      case 12:
        return "Q";
      case 11:
        return "J";
      case 10:
        return "X";
      case 1:
        return "A";
      default:
        return card.code.toString();
    }
  };

  card.getName = () => `${card.getCode()}${getCardSymbol(card)}`;
  card.getColor = () => getCardColor(card);

  return card;
};

export const getCardsValue = (cards: Card[]) => {
  const first = cards.reduce((count, card) => getCardValue(card) + count, 0);
  const second = cards.reduce(
    (count, card) => getCardValue(card, false) + count,
    0
  );

  if (first > 21 && second > 21) {
    return Math.min(first, second);
  }

  if (first < 21 && second < 21) {
    return Math.max(first, second);
  }

  return Math.min(first, second);
};
