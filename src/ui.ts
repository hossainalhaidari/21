import blessed, { button, text, Widgets } from "blessed";
import * as game from "./game";
import { resetState, state } from "./state";
import { Card, Player } from "./types";

const screen = blessed.screen();
const box = blessed.box({
  parent: screen,
  keys: true,
  width: "100%",
  height: "100%",
  content: "Blackjack",
});
const dealerScore = text({
  parent: box,
  left: 0,
  top: 3,
  name: "dealer",
  content: "",
});
const playerScore = text({
  parent: box,
  left: 0,
  top: 4,
  name: "player",
  content: "",
});
let matrix: Widgets.ButtonElement[][] = [];

export const initUI = () => {
  screen.key("q", () => process.exit(0));
  screen.key("s", () => {
    if (game.isFinished() || !state.playerTurn) return;
    state.player.stand();
    dealerTurn();
    refreshUI();
  });
  screen.key("space", () => {
    if (game.isFinished()) {
      resetState();
      game.initGame();
      print("Blackjack");
      refreshUI();
    } else if (state.playerTurn) {
      state.player.hit();
      dealerTurn();
      refreshUI();
    }
  });

  refreshUI();
};

const refreshUI = () => {
  matrix.map((buttons) => buttons.map((button) => box.remove(button)));
  matrix = [];

  matrix.push(
    state.dealer.cards.map((card, cardIndex) =>
      createCardButton(card, cardIndex + 1, 0)
    )
  );
  matrix.push(
    state.player.cards.map((card, cardIndex) =>
      createCardButton(card, cardIndex + 1, 1)
    )
  );

  matrix[1].push(createPlayerButton(state.dealer, 0, 0));
  matrix[0].push(createPlayerButton(state.player, 0, 1));

  if (game.isFinished()) {
    print(
      `${
        game.getWinner()!.name
      } Won! Press 'space' for a new game, 'q' to quit.`
    );
    game.getWinner()!.score += 10;
  }

  dealerScore.content = `Dealer: ${state.dealer.score}`;
  playerScore.content = `Player: ${state.player.score}`;

  screen.render();
};

const dealerTurn = () => {
  if (state.dealer.standing || game.isFinished()) return;

  state.playerTurn = false;
  const dealerCount = state.dealer.count();
  const playerCount = state.player.count();
  const remaining = 21 - dealerCount;

  if (state.player.standing && dealerCount <= playerCount) {
    state.dealer.hit();
    print("Dealer: Hit!");
  } else if (remaining <= 2) {
    state.dealer.stand();
    print("Dealer: Stand!");
  } else if (remaining >= 10) {
    state.dealer.hit();
    print("Dealer: Hit!");
  } else {
    const toHit = Math.random() < remaining / 10;
    if (toHit) {
      state.dealer.hit();
      print("Dealer: Hit!");
    } else {
      state.dealer.stand();
      print("Dealer: Stand!");
    }
  }

  if (state.player.standing && !game.isFinished()) {
    dealerTurn();
  } else {
    state.playerTurn = true;
  }
};

const print = (msg: string) => (box.content = msg);

const createCardButton = (card: Card, x: number, y: number) =>
  createButton({
    content: card.getName(),
    bg: card.getColor(),
    x,
    y,
  });

const createPlayerButton = (player: Player, x: number, y: number) =>
  createButton({
    content: player.count().toString(),
    bg: "yellow",
    x,
    y,
  });

const createButton = ({
  content,
  bg = "black",
  x = 0,
  y = 0,
}: Partial<Widgets.ButtonOptions>) =>
  button({
    parent: box,
    keys: true,
    shrink: true,
    padding: {
      left: 1,
      right: 1,
    },
    left: x * 4,
    top: y + 1,
    name: content,
    content,
    style: {
      bg,
    },
  });
