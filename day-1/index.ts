import * as fs from 'fs';
import * as path from 'path';

function solveSum3(values: number[], sum: number): number[] {
    for (let i = 0; i < values.length; i++) {
        const sum2: number = sum - values[i];
        const values2: number[] = values.slice(i + 1);
        const result2: number[] = solveSum2(values2, sum2);
        if (result2.length > 1) {
            return [values[i], ...result2];
        }
    }
    return [];
}

function solveSum2(values: number[], sum: number): number[] {
    let lowIndex: number = 0;
    let highIndex: number = values.length - 1;
    while (lowIndex < highIndex) {
        const currentSum: number = values[lowIndex] + values[highIndex];
        if (sum === currentSum) {
            return [values[lowIndex], values[highIndex]];
        } else if (sum > currentSum) {
            lowIndex++;
        } else {
            highIndex--;
        }
    }
    return [];
}

function main(): void {
    const expensesData: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' });
    const expenses: number[] = expensesData
        .split('\n')
        .map((value: string) => parseInt(value))
        .sort((a: number, b: number) => a - b);

    const result: number[] = solveSum2(expenses, 2020);
    if (result.length > 1) {
        console.log(`Result: ${result[0]} * ${result[1]} = ${result[0] * result[1]}`);
    } else {
        console.warn('No result found.');
    }

    const result2: number[] = solveSum3(expenses, 2020);
    if (result2.length > 2) {
        console.log(`Result: ${result2[0]} * ${result2[1]} * ${result2[2]} = ${result2[0] * result2[1] * result2[2]}`);
    } else {
        console.warn('No result found.');
    }
}

main();
