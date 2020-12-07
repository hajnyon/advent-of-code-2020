import * as fs from 'fs';
import * as path from 'path';

function solve(data: string[]): { highest: number; missing: number } {
    const ids: boolean[] = [];
    let highestID: number = 0;
    let lowestID: number = Number.MAX_SAFE_INTEGER;
    for (const record of data) {
        let binRow: string = record.slice(0, 7).replace(/F/g, '0').replace(/B/g, '1');
        let binCol: string = record.slice(7).replace(/L/g, '0').replace(/R/g, '1');
        const row: number = parseInt(binRow, 2);
        const col: number = parseInt(binCol, 2);
        const id: number = row * 8 + col;
        ids[id] = true;
        if (id > highestID) {
            highestID = id;
        }
        if (id < lowestID) {
            lowestID = id;
        }
    }
    for (let i = lowestID; i < ids.length; i++) {
        if (!ids[i]) {
            return { highest: highestID, missing: i };
        }
    }
    throw new Error('No missing ID found.');
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n');
    const ids: { highest: number; missing: number } = solve(data);
    console.log(`Highest ID: ${ids.highest}`);
    console.log(`Missing ID: ${ids.missing}`);
}

main();
