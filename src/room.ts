import { GameState } from "./game-controller";
import { Door, Lookable } from "./data-interfaces";

export class Room {
    public name: string;
    private description: (this: Room) => string;
    private doors: Door[];

    private lookables: Lookable[];

    constructor(obj: {
        name: string;
        description: (this: Room) => string;
        doors: Door[];
    }) {
        this.name = obj.name;
        this.description = obj.description
        this.doors = obj.doors;
    }

    processInput(terms: string[], gameState: GameState): Output {
        let output: Output = {
            text: '',
            moveTo: '',
            inventory: {
                add: [],
                remove: []
            }
        }

        // LOOK
        if (terms.includes('look')) {
            if (terms.includes('around')) {
                output.text = this.description();
                return output;
            }

            if (terms.includes('door')) {
                for(const door of this.doors) {
                    if (terms.includes(door.name)) {
                        output.text = door.description();
                        return output;
                    }
                }
                output.text = "Sorry, I don't know which door you are talking about."
                return output;
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



