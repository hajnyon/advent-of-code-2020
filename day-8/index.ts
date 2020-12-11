import * as fs from 'fs';
import * as path from 'path';

const REGEX: RegExp = /(?<operation>\w+) (?<sign>.)(?<value>\d+)/;

function solve(data: string[]): number {
    const instructions: {
        operation: string;
        value: number;
        visited: boolean;
    }[] = [];

    for (const operation of data) {
        const parse: RegExpExecArray = REGEX.exec(operation);
        instructions.push({
            operation: parse.groups.operation,
            value: Number(parse.groups.value) * (parse.groups.sign === '+' ? 1 : -1),
            visited: false
        });
    }

    let acc: number = 0;
    let currentInstructionIndex: number = 0;

    while (!instructions[currentInstructionIndex].visited) {
        const currentInstruction = instructions[currentInstructionIndex];
        switch (currentInstruction.operation) {
            case 'nop':
                currentInstruction.visited = true;
                currentInstructionIndex++;
                break;
            case 'acc':
                acc += currentInstruction.value;
                currentInstruction.visited = true;
                currentInstructionIndex++;
                break;
            case 'jmp':
                currentInstruction.visited = true;
                currentInstructionIndex += currentInstruction.value;
                break;

            default:
                throw new Error(`Unknown operation '${currentInstruction.operation}'`);
        }
    }

    return acc;
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n');
    const acc: number = solve(data);
    console.log(`Last acc value: ${acc}`);
}

main();
