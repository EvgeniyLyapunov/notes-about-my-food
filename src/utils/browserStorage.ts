import {
  IDataBaseItem,
  ICurrentDay,
  IMeal,
  IDataUser,
} from '../models/modelTypes';

const food = 'knowledgeBase';
const sets = 'knowledgeBaseSets';
const myDay = 'myDay';
const currentMeal = 'currentMeal';
const userId = 'userId';

export function baseLoadState(): IDataBaseItem[] | undefined {
  try {
    const serializedState = localStorage.getItem(food);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function baseSaveState(state: IDataBaseItem[]) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(food, serializedState);
  } catch (e) {
    // Ignore
  }
}

export function setsLoadState(): IDataBaseItem[] | undefined {
  try {
    const serializedState = localStorage.getItem(sets);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function setsSaveState(state: IDataBaseItem[]) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(sets, serializedState);
  } catch (e) {
    // Ignore
  }
}

export function myDayLoadState(): ICurrentDay | undefined {
  try {
    const serializedState = localStorage.getItem(myDay);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function myDaySaveState(state: ICurrentDay) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(myDay, serializedState);
  } catch (e) {
    // Ignore
  }
}

export function currentMealLoadState(): IMeal | undefined {
  try {
    const serializedState = localStorage.getItem(currentMeal);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function currentMealSaveState(state: IMeal) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(currentMeal, serializedState);
  } catch (e) {
    // Ignore
  }
}

export function clearMyDayLocalStorage(): void {
  try {
    localStorage.removeItem(currentMeal);
    localStorage.removeItem(myDay);
  } catch (e) {
    // Ignore
  }
}

export function totalClearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (e) {
    // ignore
  }
}

/**
 * Метод получает данные пользователя
 * из localStorage
 * */
export function userLoadState(): IDataUser | undefined {
  try {
    const serializedState = localStorage.getItem(userId);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}
/**
 * метод сохраняет данные о пользователе
 * в localStorage
 * @param state объект User
 */
export async function userSaveState(state: IDataUser) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(userId, serializedState);
  } catch (e) {
    // Ignore
  }
}
