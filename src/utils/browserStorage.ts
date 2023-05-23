import { IDataBaseItem, BaseItem } from '../models/modelTypes';

const KBKEY = 'knowledgeBase';

export function knowledgeBaseLoadState():
  | IDataBaseItem[]
  | BaseItem
  | undefined {
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
