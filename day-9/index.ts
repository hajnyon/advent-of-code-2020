import * as fs from 'fs';
import * as path from 'path';

const PREAMBLE_SIZE: number = 25;

function findError(data: number[]): number {
    let currentIndex: number = PREAMBLE_SIZE;
    let preamble: number[];
    let lowIndex: number;
    let highIndex: number;
    let sum: number;
    while (currentIndex < data.length) {
        preamble = data.slice(currentIndex - PREAMBLE_SIZE, currentIndex).sort((a, b) => a - b);
        lowIndex = 0;
        highIndex = preamble.length - 1;
        while (true) {
            sum = preamble[lowIndex] + preamble[highIndex];
            if (sum === data[currentIndex]) {
                break;
            } else if (sum > data[currentIndex]) {
                highIndex--;
            } else {
                lowIndex++;
            }
            if (lowIndex === highIndex) {
                return data[currentIndex];
            }
        }
        currentIndex++;
    }
}

function findWeakness(data: number[], error: number): number {
    let lowIndex: number = 0;
    let highIndex: number = 1;
    while (lowIndex < data.length - 2) {
        let sum: number = data[lowIndex];
        while (sum < error) {
            sum += data[highIndex];
            highIndex++;
        }
        if (sum === error) {
            const sorted = data.slice(lowIndex, highIndex).sort((a, b) => a - b);
            return sorted[0] + sorted[sorted.length - 1];
        }

        lowIndex++;
        highIndex = lowIndex + 1;
    }

    throw new Error(`Couldn't find weakness.`);
}

function solve(data: number[]): { error: number; weakness: number } {
    const error: number = findError(data);
    return { error: error, weakness: findWeakness(data, error) };
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n');
    const result: { error: number; weakness: number } = solve(data.map((value: string) => Number(value)));
    console.log(`Broken value: ${result.error}`);
    console.log(`Broken value: ${result.weakness}`);
}

main();
