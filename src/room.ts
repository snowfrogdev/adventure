import { GameState } from "./game-controller";
import { Door, Lookable, Item } from "./data-interfaces";

export class Room {
    readonly name: string;
    private description: (this: Room, gameState: GameState) => string;
    readonly doors: Door[];
    readonly items: Item[];

    constructor(obj: {
        name: string;
        description: (this: Room, gameState: GameState) => string;
        doors: Door[];
        items: Item[];
    }) {
        this.name = obj.name;
        this.description = obj.description
        this.doors = obj.doors;
        this.items = obj.items;
    }

    processInput(terms: string[], gameState: GameState): Output {
        let output: Output = {
            text: '',
            sound: '',
            moveTo: '',
            inventory: {
                add: [],
                remove: []
            }
        }

        // LOOK
        const lookVerbs = ['look', 'examine', 'read'];
        for (const verb of lookVerbs) {
            if (terms.includes(verb)) {
                if (terms.includes('around') || terms.includes('room') || terms.includes(this.name)) {
                    output.text = this.description(gameState);
                    return output;
                }
                if (terms.includes('door')) {
                    for (const door of this.doors) {
                        if (terms.includes(door.name)) {
                            output.text = door.description(gameState);
                            return output;
                        }
                    }
                    output.text = "Sorry, I don't know which door you are talking about."
                    return output;
                }
                if (terms.includes('stairs')) {
                    for (const door of this.doors) {
                        if (door.name === 'up' || door.name === 'down') {
                            output.text = door.description(gameState);
                            return output;
                        }
                    }
                    output.text = "Sorry, I don't know which stairs you are talking about."
                    return output;
                }
                for (const item of this.items) {
                    if (terms.includes(item.name)) {
                        output.text = item.description(gameState);
                        return output;
                    }
                    if (item.isContainer && item.isOpened) {
                        for (const containedItem of item.items) {
                            if (terms.includes(containedItem.name)) {
                                output.text = containedItem.description(gameState);
                                return output;
                            }
                        }
                    }
                }
                for (const item of gameState.inventory) {
                    if (terms.includes(item.name)) {
                        output.text = item.description(gameState);
                        return output;
                    }
                }
                output.text = `Sorry, you can't look at that.`
                return output;
            }
        }

        // WALK
        const walkVerbs = ['walk', 'go', 'run', 'step'];
        for (const verb of walkVerbs) {
            if (terms.includes(verb)) {
                for (const door of this.doors) {
                    if (terms.includes(door.name)) {
                        if (!door.isLocked && door.isOpened) {
                            output.moveTo = door.destination;
                            output.sound = 'walking';
                            return output;
                        }
                        output.text = door.description(gameState);
                        return output;
                    }
                }
                output.text = "Sorry, I'm not sure where you are trying to go. \n" +
                "Try using one of these directions: north, east, south, west, up, down.";
                return output;
            }
        }

        // OPEN
        const openVerbs = ['open'];
        for (const verb of openVerbs) {
            if (terms.includes(verb)) {
                if (terms.includes('door')) {
                    for (const door of this.doors) {
                        if (terms.includes(door.name)) {
                            if (!door.isLocked) {
                                if (!door.isOpened) {
                                    door.isOpened = true;
                                    output.text = 'You open the door.';
                                    output.sound = 'openDoor';
                                    return output;
                                }
                                output.text = 'The door is already opened.';
                                return output;
                            }
                            output.text = 'The door is locked.';
                            return output;
                        }                        
                    }
                    output.text = "I don't know which door you are talking about. \n" +
                        "Try being more specific, like this: 'open north door'";
                        return output;
                }
                for (const item of this.items) {
                    if (terms.includes(item.name)) {
                        if (item.isContainer) {
                            if (!item.isLocked) {
                                if (!item.isOpened) {
                                    item.isOpened = true;
                                    output.text = `You open the ${item.name}.`;
                                    return output;
                                }
                                output.text = `The ${item.name} is already opened.`;
                                return output;
                            }
                            output.text = `The ${item.name} is locked.`;
                            return output;
                        }
                    }
                }
                for (const item of gameState.inventory) {
                    if (terms.includes(item.name)) {
                        if (item.isContainer) {
                            if (!item.isLocked) {
                                if (!item.isOpened) {
                                    item.isOpened = true;
                                    output.text = `You open the ${item.name}.`;
                                    return output;
                                }
                                output.text = `The ${item.name} is already opened.`;
                                return output;
                            }
                            output.text = `The ${item.name} is locked.`;
                            return output;
                        }
                    }
                }
            }
        }

        // TAKE
        const takeVerbs = ['take', 'collect', 'grab', 'pick', 'get'];
        for (const verb of takeVerbs) {
            if (terms.includes(verb)) {
                for (const item of this.items) {
                    if (terms.includes(item.name)) {
                        if (item.canBePickedUp) {
                            output.text = `You take the ${item.name}.`
                            item.pickedUp = true;
                            output.inventory.add = [item];
                            return output;
                        }
                        output.text = `Sorry, you can't take this item.`
                        return output;
                    }
                    if (item.isContainer && item.isOpened) {
                        for (const containedItem of item.items) {
                            if (terms.includes(containedItem.name)) {
                                if (containedItem.canBePickedUp) {
                                    output.text = `You take the ${containedItem.name}.`;
                                    output.inventory.add = [containedItem];
                                    return output;
                                }
                                output.text = `Sorry, you can't take this item.`;
                                return output;
                            }
                        }
                    }
                }
                output.text = `Sorry, you can't take this.`
                return output;
            }
        }

        // TALK
        const talkVerbs = ['talk', 'speak', 'converse', 'ask', 'tell'];
        for (const verb of talkVerbs) {
            if (terms.includes(verb)) {
                for (const item of this.items) {
                    if (terms.includes(item.name)) {                        
                        output.text = item.dialog(gameState);
                        // Checks a flag to see if character gives player an item
                        if(item.giveItem) {
                            output.inventory.add = [item.items[0]];
                            item.giveItem = false;
                        }                        
                        return output;
                    }                    
                }
                output.text = `Sorry, you can't talk to that.`
                return output;
            }
        }

        // UNLOCK

        // USE
        const useVerbs = ['use'];
        for (const verb of useVerbs) {
            if (terms.includes(verb)) {
                for (const item of gameState.inventory) {
                    if (terms.includes(item.name)) {                        
                        output.text = item.use(gameState);
                        return output;
                    }                    
                }
                output.text = `Sorry, you can't use that here.`
                return output;
            }
        }


        // INVENTORY
        if (terms.includes('inventory')) {
            const inventory = gameState.inventory.reduce((acc, item) => {
                return acc + '\n' + '- ' + item.name;
            }, '')
            output.text = 'Inventory:\n' + inventory;
            return output;
        }

        output.text = "Sorry, I don't understand. \n" +
        "Try using one of these verbs: walk, talk, open, use, look. \n" +
        "To look at your inventory you can simply type: inventory.";
        return output
    }
}

export interface Output {
    text: string;
    sound: string;
    moveTo: string;
    inventory: {
        add: Item[];
        remove: Item[];
    };
}



