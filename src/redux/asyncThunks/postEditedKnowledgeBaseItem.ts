import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataBaseItem } from '../../models/modelTypes';

export const postEditedKnowledgeBaseItem = createAsyncThunk<
  IDataBaseItem,
  string,
  { rejectValue: string }
>(
  'knowledgeBaseData/postEditedKnowledgeBaseItem',
  async (EditedItem, { rejectWithValue }) => {
    const response = await fetch('server/postEditedGroceriesItem.php', {
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
  }
);
