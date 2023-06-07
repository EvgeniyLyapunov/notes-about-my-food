import { createAsyncThunk } from '@reduxjs/toolkit';
import { IDataUser } from '../../models/modelTypes';

export const postNewUser = createAsyncThunk<
  IDataUser,
  string,
  { rejectValue: string }
>('authSlice/postNewUser', async (newUser, { rejectWithValue }) => {
  try {
    const response = await fetch('server/userReg.php', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: newUser,
    });

    if (!response.ok) {
      return rejectWithValue(
        `Server error!, ${response.status}, ${response.statusText}`
      );
    }
    const result = await response.json();
    if (result.status === 'Пользователь c таким ником уже существует') {
      return rejectWithValue(result.status);
    }
    return result.data as IDataUser;
  } catch {
    return rejectWithValue(`Ooops, error!`);
  }
});
