import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRemoteConfigData } from '../../services/remoteConfig';
import { RemoteConfigData } from '../../types';

export const fetchBooksData = createAsyncThunk(
  'books/fetchBooksData',
  async (_, { rejectWithValue }) => {
    try {
      const data: RemoteConfigData = await fetchRemoteConfigData();
      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch books data';
      return rejectWithValue(errorMessage);
    }
  },
);
