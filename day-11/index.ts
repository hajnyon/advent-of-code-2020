import * as fs from 'fs';
import * as path from 'path';

// TODO: refactor first part of solution (commented)
// function occupiedAround(seats: string[][], row: number, seat: number): number {
//     let count: number = 0;
//     for (const directions of [
//         [-1, -1],
//         [-1, 0],
//         [-1, 1],
//         [0, -1],
//         [0, 1],
//         [1, -1],
//         [1, 0],
//         [1, 1]
//     ]) {
//         if (seats[row + directions[0]] !== undefined && seats[row + directions[0]][seat + directions[1]] === '#') {
//             count++;
//         }
//     }
//     return count;
// }

// function solve(seats: string[][]): number {
//     let anyChange: boolean = true;

//     let newSeats: string[][] = [];
//     while (anyChange) {
//         anyChange = false;
//         newSeats = [];
//         for (let row = 0; row < seats.length; row++) {
//             newSeats.push([]);
//             for (let seat = 0; seat < seats[row].length; seat++) {
//                 if (seats[row][seat] === '.') {
//                     newSeats[row].push('.');
//                     continue;
//                 }
//                 const occupiedAroundCount: number = occupiedAround(seats, row, seat);
//                 if (seats[row][seat] === 'L' && occupiedAroundCount === 0) {
//                     newSeats[row].push('#');
//                     anyChange = true;
//                 } else if (seats[row][seat] === '#' && occupiedAroundCount >= 4) {
//                     newSeats[row].push('L');
//                     anyChange = true;
//                 } else {
//                     newSeats[row].push(seats[row][seat]);
//                 }
//             }
//         }
//         seats = newSeats;
//     }

//     let occupied: number = 0;
//     let log = '\n';
//     for (const row of seats) {
//         for (const seat of row) {
//             log += seat;
//             if (seat === '#') {
//                 occupied++;
//             }
//         }
//         log += '\n';
//     }
//     console.log('🚀 ~ file: index.ts ~ line 34 ~ solve ~ log', log);

//     return occupied;
// }

function occupiedAround(seats: string[][], row: number, seat: number): number {
    let count: number = 0;
    for (const directions of [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ]) {
        let i = row + directions[0];
        let j = seat + directions[1];
        while (seats[i] !== undefined && seats[i][j] !== undefined) {
            if (seats[i][j] === '#') {
                count++;
                break;
            } else if (seats[i][j] === 'L') {
                break;
            }
            i = i + directions[0];
            j = j + directions[1];
        }
    }
    return count;
}

function solve(seats: string[][]): number {
    let anyChange: boolean = true;

    let newSeats: string[][] = [];
    while (anyChange) {
        anyChange = false;
        newSeats = [];
        for (let row = 0; row < seats.length; row++) {
            newSeats.push([]);
            for (let seat = 0; seat < seats[row].length; seat++) {
                if (seats[row][seat] === '.') {
                    newSeats[row].push('.');
                    continue;
                }
                const occupiedAroundCount: number = occupiedAround(seats, row, seat);
                if (seats[row][seat] === 'L' && occupiedAroundCount === 0) {
                    newSeats[row].push('#');
                    anyChange = true;
                } else if (seats[row][seat] === '#' && occupiedAroundCount >= 5) {
                    newSeats[row].push('L');
                    anyChange = true;
                } else {
                    newSeats[row].push(seats[row][seat]);
                }
            }
        }
        seats = newSeats;
    }

    let occupied: number = 0;
    let log = '\n';
    for (const row of seats) {
        for (const seat of row) {
            log += seat;
            if (seat === '#') {
                occupied++;
            }
        }
        log += '\n';
    }
    console.log('🚀 ~ file: index.ts ~ line 34 ~ solve ~ log', log);

    return occupied;
}

function main(): void {
    const data: string[][] = fs
        .readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' })
        .split('\n')
        .map((row: string) => row.split(''));
    const occupied: number = solve(data);
    console.log(`Occupied seats: ${occupied}`);
}

main();
