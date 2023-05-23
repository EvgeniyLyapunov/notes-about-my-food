import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataBaseItem } from '../../models/modelTypes';

export const postNewKnowledgeBaseItem = createAsyncThunk<
  IDataBaseItem,
  string,
  { rejectValue: string }
>(
  'knowledgeBaseData/postNewKnowledgeBaseItem',
  async (newItem, { rejectWithValue }) => {
    const response = await fetch('server/postGroceriesItem.php', {
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
  }
);
