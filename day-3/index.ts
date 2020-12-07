import * as fs from 'fs';
import * as path from 'path';

function solve(data: string[][], right: number, down: number): number {
    const width: number = data[0].length;
    let x: number = 0;
    let y: number = 0;
    let treeCount: number = 0;

    while (y < data.length - down) {
        x = (x + right) % width;
        y += down;
        if (data[y][x] === '#') {
            treeCount++;
        }
    }

    return treeCount;
}

function main(): void {
    const data: string[][] = fs
        .readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' })
        .split('\n')
        .map((value: string) => value.split(''));

    const problemsSet: number[][] = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];
    let result: number = 1;

    for (const set of problemsSet) {
        const treeCount: number = solve(data, set[0], set[1]);
        result *= treeCount;
        console.log(`Encountered trees for right ${set[0]}, down:${set[1]}: ${treeCount}`);
    }
    console.log(`Final result: ${result}`);
}

main();
