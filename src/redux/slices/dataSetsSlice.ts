import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IDataBaseItem } from '../../models/modelTypes';

import { getSetsList } from '../asyncThunks/getSetsList';
import { postNewSetsItem } from '../asyncThunks/postNewSetsItem';
import { postEditedSetsItem } from '../asyncThunks/postEditedSetsItem';
import { deleteSet } from '../asyncThunks/deleteSet';

import { setsSaveState } from '../../utils/browserStorage';

interface IDataSets {
  setsList: IDataBaseItem[];
  setsForEdit?: IDataBaseItem;
  setsCalcCalories: number;
  setsIdForDelete?: number;
  setsLoadingStatus: boolean;
  setsLoadingError: string | null;
  isError: boolean;
}

const initialState: IDataSets = {
  setsList: [],
  setsForEdit: undefined,
  setsCalcCalories: 0,
  setsIdForDelete: undefined,
  setsLoadingStatus: false,
  setsLoadingError: null,
  isError: false,
};

const dataSetsSlice = createSlice({
  name: 'dataSets',
  initialState,
  reducers: {
    // инициализация setsList из localStorage
    initSetsList: (state, action: PayloadAction<IDataBaseItem[]>) => {
      state.setsList = action.payload;
    },
    // выбор объекта для редактирования и сохранение его в стэйт для передачи в модальное окно
    setSetsItemForEdit: (state, action: PayloadAction<number>) => {
      state.setsForEdit = state.setsList.find(
        (item) => item.id === action.payload
      );
    },
    // сброс поля где сохраняется объект для редактирования
    resetSetsItemForEdit: (state) => {
      state.setsForEdit = undefined;
    },
    // получение id записи перед подтверждением удаления
    setSetsIdForDelete: (state, action: PayloadAction<number>) => {
      state.setsIdForDelete = action.payload;
    },
    // сброс поля где сохраняется id записи перед подтверждением удаления
    resetSetsIdForDelete: (state) => {
      state.setsIdForDelete = undefined;
    },
    // промежуточное сохранение результата вычисления количества Ккал набора
    setSetsCalcResult: (state, action: PayloadAction<number>) => {
      state.setsCalcCalories = action.payload;
    },
    // сброс промежуточного результата вычисления количества Ккал набора
    resetSetsCalcResult: (state) => {
      state.setsCalcCalories = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSetsList.pending, (state) => {
        state.setsLoadingStatus = true;
        state.setsLoadingError = null;
      })
      // загрузка списка наборов из БД
      // и обновление спика наборов в localStorage
      .addCase(
        getSetsList.fulfilled,
        (state, action: PayloadAction<IDataBaseItem[]>) => {
          state.setsLoadingStatus = false;
          state.setsList = action.payload;
          setsSaveState(state.setsList);
        }
      )
      .addCase(postNewSetsItem.pending, (state) => {
        state.setsLoadingStatus = true;
        state.setsLoadingError = null;
      })
      // добавление новой записи в базе знаний (сюда приходит значение уже с id из БД)
      // и обновления базы знаний в localStorage
      .addCase(
        postNewSetsItem.fulfilled,
        (state, action: PayloadAction<IDataBaseItem>) => {
          state.setsLoadingStatus = false;
          state.setsList.push(action.payload);
          setsSaveState(state.setsList);
        }
      )
      .addCase(postEditedSetsItem.pending, (state) => {
        state.setsLoadingStatus = true;
        state.setsLoadingError = null;
      })
      // сохранение отредактированной записи
      .addCase(
        postEditedSetsItem.fulfilled,
        (state, action: PayloadAction<IDataBaseItem>) => {
          state.setsLoadingStatus = false;
          state.setsList = state.setsList.filter(
            (item) => item.id !== action.payload.id
          );
          state.setsList.push(action.payload);
          setsSaveState(state.setsList);
        }
      )
      .addCase(deleteSet.pending, (state) => {
        state.setsLoadingStatus = true;
        state.setsLoadingError = null;
      })
      // удаление одной записи в базе знаний (сюда приходит значение id удалённой записи)
      // и обновления базы знаний в localStorage
      .addCase(deleteSet.fulfilled, (state, action: PayloadAction<number>) => {
        state.setsLoadingStatus = false;
        state.setsList = state.setsList.filter(
          (item) => item.id !== action.payload
        );
        setsSaveState(state.setsList);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.setsLoadingError = action.payload;
        state.setsLoadingStatus = false;
        state.isError = true;
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = dataSetsSlice;
export default reducer;
export const {
  initSetsList,
  setSetsItemForEdit,
  resetSetsItemForEdit,
  setSetsIdForDelete,
  resetSetsIdForDelete,
  setSetsCalcResult,
  resetSetsCalcResult,
} = actions;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}
