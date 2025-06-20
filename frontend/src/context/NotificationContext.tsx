import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type NotificationState = string;

type Action =
  | { type: 'RESET' }
  | { type: 'SET'; payload: string };

const NotificationContext = createContext<{
  message: NotificationState;
  dispatch: React.Dispatch<Action>;
}>({
  message: 'Notification area',
  dispatch: () => null,
});

function reducer(state: NotificationState, action: Action): NotificationState {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'RESET':
      return 'Notification area';
    default:
      return state;
  }
}

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, dispatch] = useReducer(reducer, 'Notification area');

  return (
    <NotificationContext.Provider value={{ message, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
