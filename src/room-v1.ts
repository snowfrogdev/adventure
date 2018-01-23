import { GameState } from "./game-controller";

export abstract class Room {
    abstract name: string;   

    processInput(terms: string[], gameState: GameState): Output {
        let output: Output = {
            text: '',
            moveTo: '',
            inventory: {
                add: [],
                remove: []
            }
        }

        if (terms.includes('inventory')) {
            const inventory = gameState.inventory.reduce((acc, item) => {
                return acc + '\n' + '- ' + item;
            }, '')
            output.text = 'Inventory:\n' + inventory; 
            return output;
        }

        output.text = `Sorry, I don't understand.`
        return output
    }
}

export interface Output {
    text: string;
    moveTo: string;
    inventory: {
        add: string[];
        remove: string[];
    };
}



