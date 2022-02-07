import { useReducer } from "react";
import {
  UPDATE_CARDS,
  ADD_TO_DECK,
  UPDATE_DECK_QUANTITY,
  REMOVE_FROM_DECK,
  ADD_MULTIPLE_TO_DECK,
  CLEAR_DECK,
  TOGGLE_DECK
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CARDS:
      return {
        ...state,
        cards: [...action.cards],
      };

    case ADD_TO_DECK:
      return {
        ...state,
        deckOpen: true,
        deck: [...state.deck, action.cards],
      };

    case ADD_MULTIPLE_TO_DECK:
      return {
        ...state,
        deck: [...state.deck, ...action.cards],
      };

    case UPDATE_DECK_QUANTITY:
      return {
        ...state,
        deckOpen: true,
        deck: state.deck.map(card => {
          if (action.multiverseid === card.multiverseid) {
            card.cardCount = action.cardCount
          }
          return card
        })
      };

    case REMOVE_FROM_DECK:
      let newState = state.deck.filter(card => {
        return card.multiverseid !== action.multiverseid;
      });

      return {
        ...state,
        deckOpen: newState.length > 0,
        deck: newState
      };

    case CLEAR_DECK:
      return {
        ...state,
        deckOpen: false,
        deck: []
      };

    case TOGGLE_DECK:
      return {
        ...state,
        deckOpen: !state.deckOpen
      };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}