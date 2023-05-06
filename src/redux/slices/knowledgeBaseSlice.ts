import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseItem } from '../../models/modelTypes';

type KnowledgeBase = {
  baseItemsList: BaseItem[];
};

const initialState: KnowledgeBase = {
  baseItemsList: [],
};

const knowledgeBaseSlice = createSlice({
  name: 'knowledgeBase',
  initialState,
  reducers: {
    getbaseItems: (state, action: PayloadAction<BaseItem[]>) => {
      state.baseItemsList = [...state.baseItemsList, ...action.payload];
    },
  },
});

const { actions, reducer } = knowledgeBaseSlice;
export default reducer;
export const { getbaseItems } = actions;
