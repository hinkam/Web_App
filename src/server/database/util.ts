import { readFileSync } from 'fs';

export function sql(path: string): string {
    return readFileSync( path, { encoding: 'utf8' } );
}
