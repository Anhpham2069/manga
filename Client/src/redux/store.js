import { configureStore } from '@reduxjs/toolkit';
// import StoriesSlice from '../components/Stories/StoriesSlice';
import darkModeReducer  from '../components/layout/DarkModeSlice';
import searchReducer  from './slice/searchSlice';
import genreReducer  from './slice/genreSlice';
import storyReducer from './slice/storiesSlice'

const store = configureStore({
  reducer: {
    // stories: StoriesSlice,
    darkMode: darkModeReducer,
    search: searchReducer,
    genres: genreReducer,
    stories: storyReducer,
  },
});

export default store;
