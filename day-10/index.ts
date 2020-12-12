import * as fs from 'fs';
import * as path from 'path';

import { count } from 'console';

function jolts(sorted: number[]): number {
    const jolts: number[] = [0, 0, 0];
    let currentJolts: number = 0;
    for (const adapter of sorted) {
        jolts[adapter - currentJolts - 1]++;
        currentJolts = adapter;
    }
    return jolts[0] * jolts[2];
}

function countWays(data: number[], index: number, visited: Map<number, number>): number {
    let count: number = 0;

    if (visited.has(index)) {
        return visited.get(index);
    }

    if (data[index] === data[data.length - 1]) {
        return 1;
    }

    for (const neighbor of [1, 2, 3]) {
        if (data[index + neighbor] - data[index] <= 3 && index + neighbor < data.length) {
            count += countWays(data, index + neighbor, visited);
        }
    }

    visited.set(index, count);

    return count;
}

function ways(sorted: number[]): number {
    return countWays(sorted, 0, new Map());
}

function main(): void {
    const data: number[] = fs
        .readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' })
        .split('\n')
        .map((value: string) => Number(value));

    const sorted: number[] = data.sort((a, b) => a - b);
    sorted.push(sorted[sorted.length - 1] + 3);

    console.log(`Multiple of 1 and 3 jolts: ${jolts(sorted)}`);
    console.log(`Adapters ways: ${ways([0, ...sorted])}`);
}

main();
