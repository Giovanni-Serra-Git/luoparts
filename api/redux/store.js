import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../../api/redux/user/userSlice.js"

const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export default store;


