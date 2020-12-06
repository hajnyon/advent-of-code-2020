import * as fs from 'fs';
import * as path from 'path';

interface IPass {
    min: number;
    max: number;
    char: string;
    pass: string;
}

function solveIndex(passwords: IPass[]): number {
    let valid: number = 0;
    for (const pass of passwords) {
        const lowerIndexContainsChar: boolean = pass.pass.charAt(pass.min - 1) === pass.char;
        const higherIndexContainsChar: boolean = pass.pass.charAt(pass.max - 1) === pass.char;
        if (lowerIndexContainsChar !== higherIndexContainsChar) {
            valid++;
        }
    }

    return valid;
}

function solve(passwords: IPass[]): number {
    let valid: number = 0;
    for (const pass of passwords) {
        const regexp: RegExp = new RegExp(pass.char, 'g');
        const occurrencesCount: number = (pass.pass.match(regexp) || []).length;
        if (occurrencesCount >= pass.min && occurrencesCount <= pass.max) {
            valid++;
        }
    }

    return valid;
}

function main(): void {
    const data: string = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' });

    const passwords: IPass[] = data.split('\n').map((v: string) => {
        const value: string = v.trim();
        const values: string[] = value.split(' ');
        const minMax: RegExpMatchArray = values[0].match(/\d+/g);
        const char: RegExpMatchArray = values[1].match(/\w/g);
        return {
            min: parseInt(minMax.shift()),
            max: parseInt(minMax.shift()),
            char: char.shift(),
            pass: values[2]
        };
    });

    const validPasswords: number = solve(passwords);
    console.log(`Number of valid passwords - count: ${validPasswords}`);
    const validPasswordsIndex: number = solveIndex(passwords);
    console.log(`Number of valid passwords - index: ${validPasswordsIndex}`);
}

main();
