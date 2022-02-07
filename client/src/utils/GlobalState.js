import React, { createContext, useContext } from "react";
import { useCardReducer } from './reducers'

const DeckContext = createContext();
const { Provider } = DeckContext;

const DeckProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useCardReducer({
    cards: [],
    deck: [],
    deckOpen: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useDeckContext = () => {
  return useContext(DeckContext);
};

export { DeckProvider, useDeckContext };