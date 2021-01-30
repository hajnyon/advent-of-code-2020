import * as fs from 'fs';
import * as path from 'path';

function solve(arrival: number, lines: string[]): number {
    let multiplier: number = parseInt(lines[0]);
    let timestamp: number = 0;
    for (let i = 1; i < lines.length; i++) {
        if (lines[i] === 'x') {
            continue;
        }
        const line = parseInt(lines[i]);
        while (true) {
            if ((timestamp + i) % line === 0) {
                multiplier *= line;
                break;
            }
            timestamp += multiplier;
        }
    }

    return timestamp;
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n');
    console.log(`Earliest bus: ${solve(parseInt(data[0]), data[1].split(','))}`);
}

main();
