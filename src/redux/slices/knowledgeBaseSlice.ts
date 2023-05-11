import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';

import { BaseItem } from '../../models/modelTypes';

type KnowledgeBase = {
  baseItemsList: BaseItem[];
  isAddItemModalVisible: boolean;
  dataLoadingStatus: boolean;
  dataLoadingError: string | null;
};

const initialState: KnowledgeBase = {
  baseItemsList: [],
  isAddItemModalVisible: false,
  dataLoadingStatus: false,
  dataLoadingError: null,
};

export const fetchData = createAsyncThunk<
  BaseItem[],
  undefined,
  { rejectValue: string }
>('knowledgeBase/fetchData', async (_, { rejectWithValue }) => {
  const response = await fetch('server/getGroceriesData.php');

  if (!response.ok) {
    return rejectWithValue(
      `Server error! ${response.status}, ${response.type}`
    );
  }

  const data = await response.json();

  return data;
});

export const addItem = createAsyncThunk<
  BaseItem,
  string,
  { rejectValue: string }
>('knowledgeBase/addItem', async (newItem, { rejectWithValue }) => {
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
  return (await response.json()) as BaseItem;
});

const knowledgeBaseSlice = createSlice({
  name: 'knowledgeBase',
  initialState,
  reducers: {
    setbaseItems: (state, action: PayloadAction<BaseItem[]>) => {
      state.baseItemsList = [...state.baseItemsList, ...action.payload];
    },
    setAddItemModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isAddItemModalVisible = action.payload;
    },
    resetLoadingStatus: (state) => {
      state.dataLoadingStatus = false;
    },
    resetErrorStatus: (state) => {
      state.dataLoadingError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.dataLoadingStatus = false;
        state.baseItemsList = action.payload;
      })
      .addCase(addItem.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.dataLoadingStatus = false;
        state.baseItemsList.push(action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.dataLoadingError = action.payload;
        state.dataLoadingStatus = false;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = knowledgeBaseSlice;
export default reducer;
export const {
  setbaseItems,
  setAddItemModalVisible,
  resetErrorStatus,
  resetLoadingStatus,
} = actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
