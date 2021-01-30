import * as fs from 'fs';
import * as path from 'path';

function solve(arrival: number, lines: string[]): number {
    let earliest: number = Number.MAX_SAFE_INTEGER;
    let id: number = -1;
    for (const line of lines) {
        if (line === 'x') {
            continue;
        }
        const lineId: number = parseInt(line);
        const diff = (Math.floor(arrival / lineId) + 1) * lineId - arrival;
        if (diff < earliest) {
            earliest = diff;
            id = lineId;
        }
    }

    return earliest * id;
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n');
    console.log(`Earliest bus: ${solve(parseInt(data[0]), data[1].split(','))}`);
}

main();
