import * as fs from 'fs';
import * as path from 'path';

interface IAction {
    action: string;
    value: number;
}

function positiveModulo(val: number, mod: number): number {
    return ((val % mod) + mod) % mod;
}

function solve(actions: IAction[]): number {
    // +east, -west
    let x: number = 0;
    // +north, -south
    let y: number = 0;

    // 0 = east
    let direction: number = 0;

    for (const action of actions) {
        switch (action.action) {
            case 'N': // means to move north by the given value.
                y += action.value;
                break;
            case 'S': // means to move south by the given value.
                y -= action.value;
                break;
            case 'E': // means to move east by the given value.
                x += action.value;
                break;
            case 'W': // means to move west by the given value.
                x -= action.value;
                break;
            case 'L': // means to turn left the given number of degrees.
                direction = positiveModulo(direction - action.value, 360);
                break;
            case 'R': // means to turn right the given number of degrees.
                direction = positiveModulo(direction + action.value, 360);
                break;
            case 'F': // means to move forward by the given value in the direction the ship is currently facing.
                switch (direction) {
                    case 0:
                        x += action.value;
                        break;
                    case 90:
                        y -= action.value;
                        break;
                    case 180:
                        x -= action.value;
                        break;
                    case 270:
                        y += action.value;
                        break;

                    default:
                        throw new Error(`Unknown direction value '${direction}'`);
                }
                break;
            default:
                throw new Error(`Unknown action '${action.action}'`);
        }
    }

    return Math.abs(x) + Math.abs(y);
}

function parse(data: string[]): IAction[] {
    const actions: IAction[] = [];
    for (const action of data) {
        const parsed: RegExpExecArray = /(?<action>\w)(?<value>\d+)/.exec(action);
        actions.push({
            action: parsed.groups.action,
            value: parseInt(parsed.groups.value, 10)
        });
    }
    return actions;
}

function main(): void {
    const data: string[] = fs.readFileSync(path.resolve(__dirname, 'input.txt'), { encoding: 'utf-8' }).split('\n');
    console.log(`Manhattan distance: ${solve(parse(data))}`);
}

main();
