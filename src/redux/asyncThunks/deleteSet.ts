import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteSet = createAsyncThunk<
  number,
  string,
  { rejectValue: string }
>('dataSets/deleteSet', async (deleteItemId, { rejectWithValue }) => {
  try {
    const response = await fetch('server/deleteSet.php', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: deleteItemId,
    });

    if (!response.ok) {
      return rejectWithValue(
        `Server error!, ${response.status}, ${response.type}, ${response.statusText}`
      );
    }
    const result = await response.json();

    return result.data as number;
  } catch {
    return rejectWithValue(`Ooops, error`);
  }
});
