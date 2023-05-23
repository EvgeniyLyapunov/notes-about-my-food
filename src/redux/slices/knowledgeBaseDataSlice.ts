import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import { BaseItem, IDataBaseItem, IBaseItem } from '../../models/modelTypes';

import { getKnowledgeBaseList } from '../asyncThunks/getKnowledgeBaseList';
import { postNewKnowledgeBaseItem } from '../asyncThunks/postNewKnowledgeBaseItem';
import { postEditedKnowledgeBaseItem } from '../asyncThunks/postEditedKnowledgeBaseItem';

import { knowledgeBaseSaveState } from '../../utils/browserStorage';

interface IKnowledgeBase {
  baseItemsList: IDataBaseItem[];
  baseItemForEdit?: IDataBaseItem;
  baseItemForDelete?: number;
  baseItemCalcPrice: number;
  dataLoadingStatus: boolean;
  dataLoadingError: string | null;
}

const initialState: IKnowledgeBase = {
  baseItemsList: [],
  baseItemForEdit: undefined,
  baseItemForDelete: undefined,
  baseItemCalcPrice: 0,
  dataLoadingStatus: false,
  dataLoadingError: null,
};

const knowledgeBaseSlice = createSlice({
  name: 'knowledgeBaseData',
  initialState,
  reducers: {
    // инициализация baseItemsList из localStorage
    setListFromStorage: (state, action: PayloadAction<IDataBaseItem[]>) => {
      state.baseItemsList = action.payload;
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
      .addCase(getKnowledgeBaseList.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      .addCase(getKnowledgeBaseList.fulfilled, (state, action) => {
        state.dataLoadingStatus = false;
        state.baseItemsList = action.payload;
      })
      .addCase(postNewKnowledgeBaseItem.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      // добавление новой записи в базе знаний (сюда приходит значение уже с id из БД)
      // и обновления базы знаний в localStorage
      .addCase(
        postNewKnowledgeBaseItem.fulfilled,
        (state, action: PayloadAction<IDataBaseItem>) => {
          state.dataLoadingStatus = false;
          state.baseItemsList.push(action.payload);
          knowledgeBaseSaveState(state.baseItemsList);
        }
      )
      .addCase(postEditedKnowledgeBaseItem.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      .addCase(
        postEditedKnowledgeBaseItem.fulfilled,
        (state, action: PayloadAction<IDataBaseItem>) => {
          state.dataLoadingStatus = false;
          state.baseItemsList = state.baseItemsList.filter(
            (item) => item.id !== action.payload.id
          );
          state.baseItemsList.push(action.payload);
          knowledgeBaseSaveState(state.baseItemsList);
        }
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.dataLoadingError = action.payload;
        state.dataLoadingStatus = false;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = knowledgeBaseSlice;
export default reducer;
export const { setListFromStorage, resetErrorStatus, resetLoadingStatus } =
  actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
