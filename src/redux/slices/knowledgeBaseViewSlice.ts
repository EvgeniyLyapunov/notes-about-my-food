import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface KnowledgeBaseView {
  isAddItemModalVisible: boolean;
  isConfirmDeleteVisible: boolean;
  isCalcPriceVisible: boolean;
}

const initialState: KnowledgeBaseView = {
  isAddItemModalVisible: false,
  isConfirmDeleteVisible: false,
  isCalcPriceVisible: false,
};

const knowledgeBaseViewSlice = createSlice({
  name: 'knowledgeBaseView',
  initialState,
  reducers: {
    // установка флага для открытия окна редактирования в режиме создания нового объекта
    setCreateItemModalVisible: (state, action: PayloadAction<boolean>) => {
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
    // установка флага для открытия окна калькулятора стоимости 100 грамм продукта
    setCalcPriceVisible: (state, action: PayloadAction<boolean>) => {
      state.isCalcPriceVisible = action.payload;
    },
  },
});

const { actions, reducer } = knowledgeBaseViewSlice;
export default reducer;
export const {
  setCreateItemModalVisible,
  setEditItemModalVisible,
  setConfirmForDeleteModalVisible,
  setCalcPriceVisible,
} = actions;
