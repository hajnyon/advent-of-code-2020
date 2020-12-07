import * as fs from 'fs';
import * as path from 'path';

class Passport {
    private data: { [key: string]: string | number } = {};

    private static readonly properties: string[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    private static readonly eyeColors: string[] = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

    public constructor(data: string) {
        const parts: string[] = data.split(/\s/);
        for (const part of parts) {
            const keyVal: string[] = part.split(':');
            this.data[keyVal[0]] = keyVal[1];
        }
    }

    public valid(): boolean {
        for (const property of Passport.properties) {
            if (!this.data[property]) {
                return false;
            }
            switch (property) {
                case 'byr':
                    const byr: number = Number(this.data[property]);
                    if (byr < 1920 || byr > 2002) {
                        return false;
                    }
                    break;

                case 'iyr':
                    const iyr: number = Number(this.data[property]);
                    if (iyr < 2010 || iyr > 2020) {
                        return false;
                    }
                    break;

                case 'eyr':
                    const eyr: number = Number(this.data[property]);
                    if (eyr < 2020 || eyr > 2030) {
                        return false;
                    }
                    break;

                case 'hgt':
                    const hgt: RegExpExecArray = /(\d+)(\w+)/.exec(<string>this.data[property]);
                    const value: number = Number(hgt[1]);
                    const units: string = hgt[2];
                    if (units === 'cm' && value >= 150 && value <= 193) {
                        break;
                    } else if (units === 'in' && value >= 59 && value <= 76) {
                        break;
                    }
                    return false;

                case 'hcl':
                    const hcl: boolean = /^#[0-9a-f]{6}$/.test(<string>this.data[property]);
                    if (!hcl) {
                        return false;
                    }
                    break;

                case 'ecl':
                    const ecl: boolean = Passport.eyeColors.includes(<string>this.data[property]);
                    if (!ecl) {
                        return false;
                    }
                    break;

                case 'pid':
                    const pid: boolean = /^[0-9]{9}$/.test(<string>this.data[property]);
                    if (!pid) {
                        return false;
                    }
                    break;

                default:
                    break;
            }
        }
        return true;
    }
}

function solve(data: string[]): number {
    let validPassports: number = 0;
    for (const record of data) {
        if (new Passport(record).valid()) {
            validPassports++;
        }
    }
    return validPassports;
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n\n');
    const validPassports: number = solve(data);
    console.log(`Valid passports: ${validPassports}`);
}

main();
