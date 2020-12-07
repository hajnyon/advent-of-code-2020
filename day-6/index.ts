import * as fs from 'fs';
import * as path from 'path';

function solve(data: string[]): { trueSum: number; trueAllSum: number } {
    let trueSum: number = 0;
    let trueAllSum: number = 0;

    for (const group of data) {
        const trueAnswers: Set<string> = new Set();
        const trueAnswersAll: Map<string, number> = new Map();

        const people: string[] = group.split('\n');
        for (const person of people) {
            const answers: string[] = person.split('');
            for (const answer of answers) {
                trueAnswers.add(answer);
                const answerExists: boolean = trueAnswersAll.has(answer);
                if (answerExists) {
                    trueAnswersAll.set(answer, trueAnswersAll.get(answer) + 1);
                } else {
                    trueAnswersAll.set(answer, 1);
                }
            }
        }
        trueSum += trueAnswers.size;
        trueAnswersAll.forEach((value: number, key: string) => {
            if (value === people.length) {
                trueAllSum++;
            }
        });
    }

    return { trueSum: trueSum, trueAllSum: trueAllSum };
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n\n');
    const sum: { trueSum: number; trueAllSum: number } = solve(data);
    console.log(`Sum of true questions: ${sum.trueSum}`);
    console.log(`Sum of true questions of all people in group: ${sum.trueAllSum}`);
}

main();
