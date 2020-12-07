import * as fs from 'fs';
import * as path from 'path';

const BAG_REGEX: RegExp = /(?<bagName>\w+ \w+) \w+ contain (?<bagContains>.*)\./;
const SUB_BAG_REGEX: RegExp = /(?<subBagCount>\d+).?(?<subBagName>\w+ \w+) .*/;
const SHINY_GOLD: string = 'shiny gold';

interface IBag {
    count: number;
    name: string;
}

// TODO: could be optimized by storing already visited bags
function containsShiny(bags: Map<string, IBag[]>, bagName: string): boolean {
    const subBags: IBag[] = <IBag[]>bags.get(bagName);
    for (const subBag of subBags) {
        if (subBag.name === SHINY_GOLD || containsShiny(bags, subBag.name)) {
            return true;
        }
    }
    return false;
}

// TODO: could be optimized by storing already visited bags
function bagsInShiny(bags: Map<string, IBag[]>, bagName: string): number {
    const subBags: IBag[] = <IBag[]>bags.get(bagName);
    if (subBags.length < 1) {
        return 1;
    }
    let count: number = 0;
    for (const subBag of subBags) {
        const subBagCount: number = bagsInShiny(bags, subBag.name);
        count += subBag.count * subBagCount;
    }
    // +1 for bag itself
    return count + 1;
}

function solve(data: string[]): { containsShiny: number; bagsInShiny: number } {
    const bags: Map<string, IBag[]> = new Map();

    for (const bag of data) {
        const parse: RegExpExecArray = BAG_REGEX.exec(bag);
        const contains: IBag[] = parse.groups.bagContains.split(',').map(
            (value: string): IBag => {
                const subBag: RegExpExecArray = SUB_BAG_REGEX.exec(value);
                if (!subBag) {
                    return { name: value, count: 1 };
                }
                return { name: subBag.groups.subBagName, count: parseInt(subBag.groups.subBagCount, 10) };
            }
        );
        bags.set(parse.groups.bagName, contains[0].name.includes('no other bags') ? [] : contains);
    }

    let shinyBagsCount: number = 0;
    for (const bagName of bags.keys()) {
        if (containsShiny(bags, bagName)) {
            shinyBagsCount++;
        }
    }

    // -1 for the shiny bag itself
    const bagsInShinyCount: number = bagsInShiny(bags, SHINY_GOLD) - 1;

    return { containsShiny: shinyBagsCount, bagsInShiny: bagsInShinyCount };
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n');
    const count: { containsShiny: number; bagsInShiny: number } = solve(data);
    console.log(`Shiny bags can be contained in: ${count.containsShiny}`);
    console.log(`Shiny bag contains: ${count.bagsInShiny}`);
}

main();
