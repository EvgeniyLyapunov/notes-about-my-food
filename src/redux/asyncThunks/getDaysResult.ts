import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMyDayResult } from '../../models/modelTypes';

export const getDaysResult = createAsyncThunk<
  IMyDayResult[],
  string,
  { rejectValue: string }
>('statisticSlice/getDaysResult', async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `server/getMyDaysResultData.php?userId=${userId}`
    );

    if (!response.ok) {
      return rejectWithValue(
        `Server error! ${response.status}, ${response.type}`
      );
    }
    const data = await response.json();
    return data.data as IMyDayResult[];
  } catch {
    return rejectWithValue(`Ooops, error!`);
  }
});
