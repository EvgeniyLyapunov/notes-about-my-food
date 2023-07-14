import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import { IDataBaseItem } from '../../models/modelTypes';

import { getBaseList } from '../asyncThunks/getBaseList';
import { postNewFoodItem } from '../asyncThunks/postNewFoodItem';
import { postEditedFoodItem } from '../asyncThunks/postEditedFoodItem';
import { deleteBaseItem } from '../asyncThunks/deleteBaseItem';

import { baseSaveState } from '../../utils/browserStorage';

interface IDataFood {
  baseItemsList: IDataBaseItem[];
  baseItemForEdit?: IDataBaseItem;
  baseItemIdForDelete?: number;
  baseItemCalcPrice: number;
  dataLoadingStatus: boolean;
  dataLoadingError: string | null;
  isError: boolean;
}

const initialState: IDataFood = {
  baseItemsList: [],
  baseItemForEdit: undefined,
  baseItemIdForDelete: undefined,
  baseItemCalcPrice: 0,
  dataLoadingStatus: false,
  dataLoadingError: null,
  isError: false,
};

const dataFoodSlice = createSlice({
  name: 'dataFood',
  initialState,
  reducers: {
    // инициализация baseItemsList из localStorage
    initItemsList: (state, action: PayloadAction<IDataBaseItem[]>) => {
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
      state.isError = false;
    },
    // выполняется при совершении Logout
    resetKnowledgeBaseToInitState: (state) => {
      state.baseItemsList = [];
      state.baseItemIdForDelete = undefined;
      state.baseItemForEdit = undefined;
      state.baseItemCalcPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBaseList.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      // загрузка всего списка продуктов из БД
      // и обновления базы знаний в localStorage
      .addCase(
        getBaseList.fulfilled,
        (state, action: PayloadAction<IDataBaseItem[]>) => {
          state.dataLoadingStatus = false;
          state.baseItemsList = action.payload;
          baseSaveState(state.baseItemsList);
        }
      )
      .addCase(postNewFoodItem.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      // добавление новой записи в базе знаний (сюда приходит значение уже с id из БД)
      // и обновления базы знаний в localStorage
      .addCase(
        postNewFoodItem.fulfilled,
        (state, action: PayloadAction<IDataBaseItem>) => {
          state.dataLoadingStatus = false;
          state.baseItemsList.push(action.payload);
          baseSaveState(state.baseItemsList);
        }
      )
      .addCase(postEditedFoodItem.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      // сохранение отредактированной записи
      .addCase(
        postEditedFoodItem.fulfilled,
        (state, action: PayloadAction<IDataBaseItem>) => {
          state.dataLoadingStatus = false;
          state.baseItemsList = state.baseItemsList.filter(
            (item) => item.id !== action.payload.id
          );
          state.baseItemsList.push(action.payload);
          baseSaveState(state.baseItemsList);
        }
      )
      .addCase(deleteBaseItem.pending, (state) => {
        state.dataLoadingStatus = true;
        state.dataLoadingError = null;
      })
      // удаление одной записи в базе знаний (сюда приходит значение id удалённой записи)
      // и обновления базы знаний в localStorage
      .addCase(
        deleteBaseItem.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.dataLoadingStatus = false;
          state.baseItemsList = state.baseItemsList.filter(
            (item) => item.id !== action.payload
          );
          baseSaveState(state.baseItemsList);
        }
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.dataLoadingError = action.payload;
        state.dataLoadingStatus = false;
        state.isError = true;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = dataFoodSlice;
export default reducer;
export const {
  initItemsList,
  setBaseItemForEdit,
  resetBaseItemForEdit,
  setBaseItemIdForDelete,
  resetBaseItemIdForDelete,
  setCalcResult,
  resetCalcResult,
  resetErrorStatus,
  resetLoadingStatus,
  resetKnowledgeBaseToInitState,
} = actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
