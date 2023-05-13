import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseItem } from '../../models/modelTypes';

interface KnowledgeBase {
  baseItemsList: BaseItem[];
  isAddItemModalVisible: boolean;
  baseItemforEdit: BaseItem | undefined;
}

const initialState: KnowledgeBase = {
  baseItemsList: [],
  isAddItemModalVisible: false,
  baseItemforEdit: undefined,
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
    // выбор объекта для редактирования и сохранение его в стэйт для передачи в модальное окно
    setBaseItemforEdit: (state, action: PayloadAction<number>) => {
      state.baseItemforEdit = state.baseItemsList.find(
        (item) => item.id === action.payload
      );
    },
    // сброс поля где сохраняется объект для редактирования
    resetBaseItemforEdit: (state) => {
      state.baseItemforEdit = undefined;
    },
    // установка флага для открытия окна редактирования в режиме создания нового объекта
    setAddItemModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isAddItemModalVisible = action.payload;
    },
    // установка флага для открытия окна редактирования в режиме редактирования выбранного объекта
    setEditItemModalVisible: (state) => {
      state.isAddItemModalVisible = true;
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
  setBaseItemforEdit,
  resetBaseItemforEdit,
} = actions;
