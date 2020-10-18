import ActionType from "./ActionType";
import Result from "./Result";

export const getRandomAction = () => {
  const actionTypes = ActionType.types;
  const randomNumber = Math.floor(Math.random() * actionTypes.length);
  const randomType = actionTypes[randomNumber];
  return ActionType[randomType];
};

export const getResult = (player, computer) => {
  if (player === computer) {
    return Result.DRAW;
  } else if (
    (player === ActionType.ROCK && computer === ActionType.PAPER) ||
    (player === ActionType.PAPER && computer === ActionType.SCISSORS) ||
    (player === ActionType.SCISSORS && computer === ActionType.ROCK)
  ) {
    return Result.LOSE;
  } else {
    return Result.WIN;
  }
};
