
import { configureStore } from '@reduxjs/toolkit';
import commentReducer from '../reducers/commentReducer';

export const store = configureStore({
  reducer: {
    listComment: commentReducer,
  },
  
});
