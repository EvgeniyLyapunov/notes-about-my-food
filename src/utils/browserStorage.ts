import { IDataBaseItem, ICurrentDay, IMeal } from '../models/modelTypes';

const KBKEY = 'knowledgeBase';
const MDKEY = 'myDay';
const CMKEY = 'currentMeal';

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

export function clearLocalStorage(): void {
  try {
    localStorage.removeItem(CMKEY);
    localStorage.removeItem(MDKEY);
  } catch (e) {
    // Ignore
  }
}
