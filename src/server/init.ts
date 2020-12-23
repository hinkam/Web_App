import { getDataBase } from './database';

export async function init(): Promise<void> {
    await getDataBase();
}
