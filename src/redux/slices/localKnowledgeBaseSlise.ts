import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseItem } from '../../models/modelTypes';

interface KnowledgeBase {
  baseItemsList: BaseItem[];
  baseItemForEdit?: BaseItem;
  baseItemForDelete?: number;
  baseItemCalcPrice: number;
}

const initialState: KnowledgeBase = {
  baseItemsList: [],
  baseItemForEdit: undefined,
  baseItemForDelete: undefined,
  baseItemCalcPrice: 0,
};

const localKnowledgeBaseSlice = createSlice({
  name: 'localKnowledgeBaseSlice',
  initialState,
  reducers: {
    // инициализация baseItemsList из localStorage
    setListFromStorage: (state, action: PayloadAction<BaseItem[]>) => {
      state.baseItemsList = action.payload;
    },
    // добавление новой записи
    addItemLocal: (state, action: PayloadAction<BaseItem>) => {
      action.payload.id = state.baseItemsList.length + 1;
      state.baseItemsList.push(action.payload);
    },
    // сохранение отредактированной записи
    editItemLocal: (state, action: PayloadAction<BaseItem>) => {
      state.baseItemsList = state.baseItemsList.filter(
        (item) => item.id !== action.payload.id
      );
      state.baseItemsList.push(action.payload);
    },
    // удаление выбранной записи
    deleteItemLocal: (state) => {
      state.baseItemsList = state.baseItemsList.filter(
        (item) => item.id !== state.baseItemForDelete
      );
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
    setBaseItemForDelete: (state, action: PayloadAction<number>) => {
      state.baseItemForDelete = action.payload;
    },
    // сброс поля где сохраняется id записи перед подтверждением удаления
    resetBaseItemForDelete: (state) => {
      state.baseItemForDelete = undefined;
    },
    // промежуточное сохранение результата вычисления цены за 100 грамм продукта
    setCalcResult: (state, action: PayloadAction<number>) => {
      state.baseItemCalcPrice = action.payload;
    },
    // сброс промежуточного результата вычисления цены за 100 грамм продукта
    resetCalcResult: (state) => {
      state.baseItemCalcPrice = 0;
    },
  },
});

const { actions, reducer } = localKnowledgeBaseSlice;
export default reducer;
export const {
  setListFromStorage,
  addItemLocal,
  editItemLocal,
  setBaseItemForEdit,
  resetBaseItemForEdit,
  setBaseItemForDelete,
  resetBaseItemForDelete,
  deleteItemLocal,
  setCalcResult,
  resetCalcResult,
} = actions;
