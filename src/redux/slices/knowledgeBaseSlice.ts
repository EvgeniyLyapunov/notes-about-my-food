import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseItem } from '../../models/modelTypes';

type KnowledgeBase = {
  baseItemsList: BaseItem[];
  isAddItemModalVisible: boolean;
};

const initialState: KnowledgeBase = {
  baseItemsList: [],
  isAddItemModalVisible: false,
};

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
  },
});

const { actions, reducer } = knowledgeBaseSlice;
export default reducer;
export const { setbaseItems, setAddItemModalVisible } = actions;
