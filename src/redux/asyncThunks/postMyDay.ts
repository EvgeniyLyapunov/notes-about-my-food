import { createAsyncThunk } from '@reduxjs/toolkit';

export const postMyDay = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>('myDayDataSlice/postMyDay', async (newItem, { rejectWithValue }) => {
  try {
    const response = await fetch('server/postMyDay.php', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: newItem,
    });
    if (!response.ok) {
      return rejectWithValue(
        `Server error!, ${response.status}, ${response.type}, ${response.statusText}`
      );
    }
    const result = await response.json();
    return result.data as boolean;
  } catch {
    return rejectWithValue(`Ooops, error!`);
  }
});
