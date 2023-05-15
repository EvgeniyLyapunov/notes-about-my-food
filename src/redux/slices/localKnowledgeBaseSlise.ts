import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseItem } from '../../models/modelTypes';

interface KnowledgeBase {
  baseItemsList: BaseItem[];
  isAddItemModalVisible: boolean;
  isConfirmDeleteVisible: boolean;
  baseItemForEdit?: BaseItem;
  baseItemForDelete?: number;
}

const initialState: KnowledgeBase = {
  baseItemsList: [],
  isAddItemModalVisible: false,
  isConfirmDeleteVisible: false,
  baseItemForEdit: undefined,
  baseItemForDelete: undefined,
};

const localKnowledgeBaseSlice = createSlice({
  name: 'localKnowledgeBaseSlice',
  initialState,
  reducers: {
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
    // установка флага для открытия окна редактирования в режиме создания нового объекта
    setAddItemModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isAddItemModalVisible = action.payload;
    },
    // установка флага для открытия окна редактирования в режиме редактирования выбранного объекта
    setEditItemModalVisible: (state) => {
      state.isAddItemModalVisible = true;
    },
    // установка флага для показа окна подтверждения удаления записи из Базы Знания
    setConfirmForDeleteModalVisible: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isConfirmDeleteVisible = action.payload;
    },
  },
});

const { actions, reducer } = localKnowledgeBaseSlice;
export default reducer;
export const {
  addItemLocal,
  setAddItemModalVisible,
  editItemLocal,
  setEditItemModalVisible,
  setBaseItemForEdit,
  resetBaseItemForEdit,
  setBaseItemForDelete,
  setConfirmForDeleteModalVisible,
  resetBaseItemForDelete,
  deleteItemLocal,
} = actions;
