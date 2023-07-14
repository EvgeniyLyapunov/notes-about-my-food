import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataBaseItem } from '../../models/modelTypes';

export const postNewSetsItem = createAsyncThunk<
  IDataBaseItem,
  string,
  { rejectValue: string }
>('dataSets/postNewSetsItem', async (newItem, { rejectWithValue }) => {
  try {
    const response = await fetch('server/postNewSetsItem.php', {
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

    return result.data as IDataBaseItem;
  } catch {
    return rejectWithValue(`Oooops, error!`);
  }
});
