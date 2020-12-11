import * as fs from 'fs';
import * as path from 'path';

const REGEX: RegExp = /(?<operation>\w+) (?<sign>.)(?<value>\d+)/;

interface IInstruction {
    operation: string;
    value: number;
}

function walkInstructions(instructions: IInstruction[]): { end: boolean; acc: number } {
    let acc: number = 0;
    let currentInstructionIndex: number = 0;

    const visited: Set<number> = new Set();

    while (!visited.has(currentInstructionIndex) && currentInstructionIndex < instructions.length) {
        const currentInstruction = instructions[currentInstructionIndex];
        switch (currentInstruction.operation) {
            case 'nop':
                visited.add(currentInstructionIndex);
                currentInstructionIndex++;
                break;
            case 'acc':
                acc += currentInstruction.value;
                visited.add(currentInstructionIndex);
                currentInstructionIndex++;
                break;
            case 'jmp':
                visited.add(currentInstructionIndex);
                currentInstructionIndex += currentInstruction.value;
                break;
            default:
                throw new Error(`Unknown operation '${currentInstruction.operation}'`);
        }
    }

    if (currentInstructionIndex === instructions.length) {
        return { end: true, acc: acc };
    }

    return { end: false, acc: acc };
}

function swapInstruction(instruction: IInstruction) {
    if (instruction.operation === 'nop') {
        instruction.operation = 'jmp';
    } else if (instruction.operation === 'jmp') {
        instruction.operation = 'nop';
    }
}

function solve(data: string[]): { lastAcc: number; endAcc: number } {
    const instructions: IInstruction[] = [];

    for (const operation of data) {
        const parse: RegExpExecArray = REGEX.exec(operation);
        instructions.push({
            operation: parse.groups.operation,
            value: Number(parse.groups.value) * (parse.groups.sign === '+' ? 1 : -1)
        });
    }

    const lastAcc: number = walkInstructions(instructions).acc;

    let endAcc: number;
    for (const instruction of instructions) {
        swapInstruction(instruction);
        const result = walkInstructions(instructions);
        if (result.end) {
            endAcc = result.acc;
            break;
        }
        swapInstruction(instruction);
    }

    return { lastAcc: lastAcc, endAcc: endAcc };
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n');
    const result: { lastAcc: number; endAcc: number } = solve(data);
    console.log(`Last acc value: ${result.lastAcc}`);
    console.log(`End acc value: ${result.endAcc}`);
}

main();
