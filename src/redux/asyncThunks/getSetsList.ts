import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataBaseItem } from '../../models/modelTypes';

export const getSetsList = createAsyncThunk<
  IDataBaseItem[],
  string,
  { rejectValue: string }
>('dataFood/getSetsList', async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(`server/getSetsData.php?userId=${userId}`);

    if (!response.ok) {
      return rejectWithValue(
        `Server error! ${response.status}, ${response.type}`
      );
    }
    const data = await response.json();
    return data.data as IDataBaseItem[];
  } catch {
    return rejectWithValue(`Ooops, error!`);
  }
});
