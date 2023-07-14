import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataBaseItem } from '../../models/modelTypes';

export const postEditedFoodItem = createAsyncThunk<
  IDataBaseItem,
  string,
  { rejectValue: string }
>('dataFood/postEditedFoodItem', async (EditedItem, { rejectWithValue }) => {
  try {
    const response = await fetch('server/postEditedFoodItem.php', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: EditedItem,
    });

    if (!response.ok) {
      return rejectWithValue(
        `Server error!, ${response.status}, ${response.type}, ${response.statusText}`
      );
    }
    const result = await response.json();

    return result.data as IDataBaseItem;
  } catch {
    return rejectWithValue(`Ooops, error!`);
  }
});
