export const action = {
  ROCK: { icon: "hand-rock", image: require("./assets/rock.png") },
  PAPER: { icon: "hand-paper", image: require("./assets/paper.png") },
  SCISSORS: { icon: "hand-peace", image: require("./assets/scissors.png") },
  array: ["ROCK", "PAPER", "SCISSORS"],
};

export const resultObject = {
  DRAW: { text: "DRAW", color: "white" },
  WIN: { text: "WIN", color: "green" },
  LOSE: { text: "LOSE", color: "red" },
};

export const getRandomAction = () => {
  let actionArray = action.array;
  let randomNumber = Math.floor(Math.random() * actionArray.length);
  return action[actionArray[randomNumber]];
};

export const getResult = (player, computer) => {
  if (player === computer) {
    return resultObject.DRAW;
  } else if (
    (player === action.ROCK && computer === action.PAPER) ||
    (player === action.PAPER && computer === action.SCISSORS) ||
    (player === action.SCISSORS && computer === action.ROCK)
  ) {
    return resultObject.LOSE;
  } else {
    return resultObject.WIN;
  }
};
