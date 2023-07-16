import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeActiveTab } from '../../models/modelTypes';

interface dataView {
  activeTab: TypeActiveTab;
  isAddItemModalVisible: boolean;
  isConfirmDeleteVisible: boolean;
  isCalcPriceVisible: boolean;
  isCalcCaloriesVisible: boolean;
}

const initialState: dataView = {
  activeTab: 'food',
  isAddItemModalVisible: false,
  isConfirmDeleteVisible: false,
  isCalcPriceVisible: false,
  isCalcCaloriesVisible: false,
};

const dataViewSlice = createSlice({
  name: 'dataView',
  initialState,
  reducers: {
    setViewTab: (state, action: PayloadAction<TypeActiveTab>) => {
      state.activeTab = action.payload;
    },
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
    // установка флага для открытия окна калькулятора калорийности набора
    setCalcCaloriesVisible: (state, action: PayloadAction<boolean>) => {
      state.isCalcCaloriesVisible = action.payload;
    },
  },
});

const { actions, reducer } = dataViewSlice;
export default reducer;
export const {
  setViewTab,
  setCreateItemModalVisible,
  setEditItemModalVisible,
  setConfirmForDeleteModalVisible,
  setCalcPriceVisible,
  setCalcCaloriesVisible,
} = actions;
