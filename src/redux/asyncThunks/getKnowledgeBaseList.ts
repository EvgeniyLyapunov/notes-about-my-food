import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataBaseItem } from '../../models/modelTypes';

export const getKnowledgeBaseList = createAsyncThunk<
  IDataBaseItem[],
  undefined,
  { rejectValue: string }
>('knowledgeBaseData/getKnowledgeBaseList', async (_, { rejectWithValue }) => {
  const response = await fetch('server/getGroceriesData.php');

  if (!response.ok) {
    return rejectWithValue(
      `Server error! ${response.status}, ${response.type}`
    );
  }

  const data = await response.json();

  return data;
});
