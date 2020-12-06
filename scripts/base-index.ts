import * as fs from 'fs';
import * as path from 'path';

function solve(): void {}

function main(): void {
    const data: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' });
}

main();
