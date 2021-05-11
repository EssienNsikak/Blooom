import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: {
    _id: '6091263a5455f4221f25b28d',
    profilePicture: 'person/14.jpg',
    coverPicture: 'person/23.jpg',
    followers: [],
    followings: [],
    isAdmin: false,
    username: 'Uduakobong',
    email: 'ud@gmail.com'
  },
  isFetching: false,
  error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider 
      value={{
        user: state.user, 
        isFetching: state.isFetching, 
        error: state.error,
        dispatch
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}