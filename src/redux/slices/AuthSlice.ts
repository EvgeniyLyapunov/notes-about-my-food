import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { postNewUser } from '../asyncThunks/postNewUser';
import { logInUser } from '../asyncThunks/logInUser';
import { userSaveState, userLoadState } from '../../utils/browserStorage';
import { IDataUser } from '../../models/modelTypes';

interface IAuthSlice {
  isLoginViewVisible: boolean;
  isRegViewVisible: boolean;
  isSelectAuthVisible: boolean;
  isConfirmLogoutVisible: boolean;
  isLoading: boolean;
  isErrorMessage: string | null;
  isRegSuccess: boolean;
  isLogSuccess: boolean;
  user: IDataUser | undefined;
}

const initialState: IAuthSlice = {
  isLoginViewVisible: false,
  isRegViewVisible: false,
  isSelectAuthVisible: false,
  isConfirmLogoutVisible: false,
  isLoading: false,
  isErrorMessage: null,
  isRegSuccess: false,
  isLogSuccess: false,
  user: undefined,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IDataUser | undefined>) => {
      state.user = action.payload;
    },
    setRegViewVisible: (state, action: PayloadAction<boolean>) => {
      state.isRegViewVisible = action.payload;
    },
    setLoginViewVisible: (state, action: PayloadAction<boolean>) => {
      state.isLoginViewVisible = action.payload;
    },
    setSelectAuthVisible: (state, action: PayloadAction<boolean>) => {
      state.isSelectAuthVisible = action.payload;
    },
    setConfirmLogoutVisible: (state, action: PayloadAction<boolean>) => {
      state.isConfirmLogoutVisible = action.payload;
    },
    setRegSuccess: (state, action: PayloadAction<boolean>) => {
      state.isRegSuccess = action.payload;
    },
    setLogSuccess: (state, action: PayloadAction<boolean>) => {
      state.isLogSuccess = action.payload;
    },
    resetErrorMessage: (state) => {
      state.isErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewUser.pending, (state) => {
        state.isLoading = true;
        state.isErrorMessage = null;
      })
      .addCase(
        postNewUser.fulfilled,
        (state, action: PayloadAction<IDataUser>) => {
          state.isLoading = false;
          state.user = action.payload;
          userSaveState(action.payload);
          state.isRegSuccess = true;
        }
      )
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
        state.isErrorMessage = null;
      })
      .addCase(
        logInUser.fulfilled,
        (state, action: PayloadAction<IDataUser>) => {
          state.isLoading = false;
          state.user = action.payload;
          userSaveState(action.payload);
          state.isLogSuccess = true;
        }
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isErrorMessage = action.payload;
        state.isLoading = false;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = authSlice;
export default reducer;
export const {
  setUser,
  setRegViewVisible,
  setLoginViewVisible,
  setSelectAuthVisible,
  setConfirmLogoutVisible,
  setRegSuccess,
  setLogSuccess,
  resetErrorMessage,
} = actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
