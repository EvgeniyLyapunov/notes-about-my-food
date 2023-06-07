import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataBaseItem } from '../../models/modelTypes';

export const getKnowledgeBaseList = createAsyncThunk<
  IDataBaseItem[],
  string,
  { rejectValue: string }
>(
  'knowledgeBaseData/getKnowledgeBaseList',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `server/getGroceriesData.php?userId=${userId}`
      );

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
  }
);
