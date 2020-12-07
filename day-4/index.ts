import * as fs from 'fs';
import * as path from 'path';

class Passport {
    public constructor(data: string) {}
}

function solve(): void {}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n\n');
    console.log('🚀 ~ file: index.ts ~ line 8 ~ main ~ data', data);
}

main();
