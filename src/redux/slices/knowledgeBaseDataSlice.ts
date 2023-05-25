import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import { BaseItem, IDataBaseItem, IBaseItem } from '../../models/modelTypes';

import { getKnowledgeBaseList } from '../asyncThunks/getKnowledgeBaseList';
import { postNewKnowledgeBaseItem } from '../asyncThunks/postNewKnowledgeBaseItem';
import { postEditedKnowledgeBaseItem } from '../asyncThunks/postEditedKnowledgeBaseItem';
import { deleteKnowledgeBaseItem } from '../asyncThunks/deleteKnowledgeBaseItem';

import { knowledgeBaseSaveState } from '../../utils/browserStorage';

interface IKnowledgeBase {
  baseItemsList: IDataBaseItem[];
  baseItemForEdit?: IDataBaseItem;
  baseItemIdForDelete?: number;
  baseItemCalcPrice: number;
  dataLoadingStatus: boolean;
  dataLoadingError: string | null;
}

const initialState: IKnowledgeBase = {
  baseItemsList: [],
  baseItemForEdit: undefined,
  baseItemIdForDelete: undefined,
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
    // выбор объекта для редактирования и сохранение его в стэйт для передачи в модальное окно
    setBaseItemForEdit: (state, action: PayloadAction<number>) => {
      state.baseItemForEdit = state.baseItemsList.find(
        (item) => item.id === action.payload
      );
    },
    // сброс поля где сохраняется объект для редактирования
    resetBaseItemForEdit: (state) => {
      state.baseItemForEdit = undefined;
    },
    // получение id записи перед подтверждением удаления
    setBaseItemIdForDelete: (state, action: PayloadAction<number>) => {
      state.baseItemIdForDelete = action.payload;
    },
    // сброс поля где сохраняется id записи перед подтверждением удаления
    resetBaseItemIdForDelete: (state) => {
      state.baseItemIdForDelete = undefined;
    },
    // промежуточное сохранение результата вычисления цены за 100 грамм продукта
    setCalcResult: (state, action: PayloadAction<number>) => {
      state.baseItemCalcPrice = action.payload;
    },
    // сброс промежуточного результата вычисления цены за 100 грамм продукта
    resetCalcResult: (state) => {
      state.baseItemCalcPrice = 0;
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
      // загрузка всего списка продуктов из БД
      // и обновления базы знаний в localStorage
      .addCase(
        getKnowledgeBaseList.fulfilled,
        (state, action: PayloadAction<IDataBaseItem[]>) => {
          state.dataLoadingStatus = false;
          state.baseItemsList = action.payload;
          knowledgeBaseSaveState(state.baseItemsList);
        }
      )
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
      // сохранение отредактированной записи
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
      .addCase(deleteKnowledgeBaseItem.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      // удаление одной записи в базе знаний (сюда приходит значение id удалённой записи)
      // и обновления базы знаний в localStorage
      .addCase(
        deleteKnowledgeBaseItem.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.dataLoadingStatus = false;
          state.baseItemsList = state.baseItemsList.filter(
            (item) => item.id !== action.payload
          );
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
export const {
  setListFromStorage,
  setBaseItemForEdit,
  resetBaseItemForEdit,
  setBaseItemIdForDelete,
  resetBaseItemIdForDelete,
  setCalcResult,
  resetCalcResult,
  resetErrorStatus,
  resetLoadingStatus,
} = actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
