import React, { createContext } from 'react';
import {
  logInUser,
  createUser,
  setUserStatistics,
  getUserStatistics,
  downloadSettings,
  uploadSettings
} from './user';

import statistics from './statistics';

interface ContextType {
  [key: string]: any
}

const initialObj = {} as ContextType;

const BackendContext = createContext(initialObj);

interface ComponentProps {
  children?: React.ReactNode
}

const BackendProvider: React.FC = ({ children }: ComponentProps) => (
  <BackendContext.Provider value={{
    setUserStatistics,
    getUserStatistics,
    downloadSettings,
    uploadSettings,
    logInUser,
    createUser,
    statistics
  }}
  >
    { children }
  </BackendContext.Provider>
);

export { BackendProvider, BackendContext };
