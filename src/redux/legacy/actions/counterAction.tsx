import {
  DECREMENT,
  INCREMENT,
  type DecrementAction,
  type IncrementAction,
} from "./actionTypes/counterActionTypes";

export const increment = (): IncrementAction => {
  return {
    type: INCREMENT,
  };
};
export const decrement = (): DecrementAction => {
  return {
    type: DECREMENT,
  };
};
