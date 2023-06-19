import {
  IDataBaseItem,
  ICurrentDay,
  IMeal,
  IDataUser,
} from '../models/modelTypes';

const KBKEY = 'knowledgeBase';
const MDKEY = 'myDay';
const CMKEY = 'currentMeal';
const USER = 'userId';

export function knowledgeBaseLoadState(): IDataBaseItem[] | undefined {
  try {
    const serializedState = localStorage.getItem(KBKEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function knowledgeBaseSaveState(state: IDataBaseItem[]) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KBKEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

export function myDayLoadState(): ICurrentDay | undefined {
  try {
    const serializedState = localStorage.getItem(MDKEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function myDaySaveState(state: ICurrentDay) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(MDKEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

export function currentMealLoadState(): IMeal | undefined {
  try {
    const serializedState = localStorage.getItem(CMKEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function currentMealSaveState(state: IMeal) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(CMKEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

export function clearMyDayLocalStorage(): void {
  try {
    localStorage.removeItem(CMKEY);
    localStorage.removeItem(MDKEY);
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
    const serializedState = localStorage.getItem(USER);
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
    localStorage.setItem(USER, serializedState);
  } catch (e) {
    // Ignore
  }
}
