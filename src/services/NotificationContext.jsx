import { createContext, useContext, useReducer } from "react";

const initialState = {
  message: '',
  status: false,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'notify':
      return {
        message: action.payload.message,
        status: action.payload.status,
      };
    case 'clear':
      return initialState;
    default: return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const notifyWithTimeout = (dispatch, message, status = true, timeout = 5000) => {
  dispatch({
    type: 'notify',
    payload: {
      message,
      status,
    },
  });
  setTimeout(() => dispatch({ type: 'clear' }), timeout);
};

export default NotificationContext;
