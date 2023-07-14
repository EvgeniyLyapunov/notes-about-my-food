import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataBaseItem } from '../../models/modelTypes';

export const postEditedSetsItem = createAsyncThunk<
  IDataBaseItem,
  string,
  { rejectValue: string }
>('dataSets/postEditedSetsItem', async (EditedItem, { rejectWithValue }) => {
  try {
    const response = await fetch('server/postEditedSetsItem.php', {
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
