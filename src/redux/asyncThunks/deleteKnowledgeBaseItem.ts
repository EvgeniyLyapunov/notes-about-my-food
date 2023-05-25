import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteKnowledgeBaseItem = createAsyncThunk<
  number,
  string,
  { rejectValue: string }
>(
  'knowledgeBaseData/deleteKnowledgeBaseItem',
  async (deleteItemId, { rejectWithValue }) => {
    const response = await fetch('server/deleteGroceriesItem.php', {
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
  }
);
