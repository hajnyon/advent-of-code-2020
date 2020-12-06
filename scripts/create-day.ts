import * as fs from 'fs';
import * as path from 'path';

function main(): void {
    if (process.argv.length < 3) {
        throw new Error(`Usage: ts-node create-day.ts <DAY_NUMBER>`);
    }

    const dayNumber: number = parseInt(process.argv[2]);
    const dir: string = path.resolve(__dirname, '..', `day-${dayNumber}`);
    fs.mkdirSync(dir);
    fs.copyFileSync(path.resolve(__dirname, 'base-index.ts'), path.resolve(dir, 'index.ts'));
    fs.writeFileSync(path.resolve(dir, 'input.txt'), '', { encoding: 'utf-8' });
}

main();
