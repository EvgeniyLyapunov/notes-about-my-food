import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataUser } from '../../models/modelTypes';

export const logInUser = createAsyncThunk<
  IDataUser,
  string,
  { rejectValue: string }
>('authSlice/logInUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await fetch('server/logInUser.php', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: userData,
    });

    if (!response.ok) {
      return rejectWithValue(
        `Server error!, ${response.status}, ${response.statusText}`
      );
    }

    const result = await response.json();
    if (result.status === 'Пользователь не найден') {
      return rejectWithValue(result.status);
    }
    return result.data as IDataUser;
  } catch {
    return rejectWithValue(`Ooops, error!`);
  }
});
