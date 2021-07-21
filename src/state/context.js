import { useContext, createContext } from 'react';

export const StateContext = createContext({});

export const useAppState = () => useContext(StateContext);
