// postsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },
    clearPosts: () => {
      return [];
    },
  },
});

export const { setPosts, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;