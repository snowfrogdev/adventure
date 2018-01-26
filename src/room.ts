import { GameState } from "./game-controller";
import { Door, Lookable, Item } from "./data-interfaces";

export class Room {
    public name: string;
    private description: (this: Room) => string;
    private doors: Door[];
    private items: Item[];

    private lookables: Lookable[];

    constructor(obj: {
        name: string;
        description: (this: Room) => string;
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
            moveTo: '',
            inventory: {
                add: [],
                remove: []
            }
        }

        // LOOK
        const lookVerbs = ['look', 'examine'];
        for (const verb of lookVerbs) {
            if (terms.includes(verb)) {
                if (terms.includes('around')) {
                    output.text = this.description();
                    return output;
                }
                if (terms.includes('door')) {
                    for (const door of this.doors) {
                        if (terms.includes(door.name)) {
                            output.text = door.description();
                            return output;
                        }
                    }
                    output.text = "Sorry, I don't know which door you are talking about."
                    return output;
                }
                for (const item of this.items) {
                    if (terms.includes(item.name)) {
                        output.text = item.description();
                        return output;
                    }
                    if (item.isContainer && item.isOpened) {
                        for (const containedItem of item.items) {
                            if (terms.includes(containedItem.name)) {
                                output.text = containedItem.description();
                                return output;
                            }
                        }
                    }
                }
                for (const item of gameState.inventory) {
                    if (terms.includes(item.name)) {
                        output.text = item.description();
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
                            return output;
                        }
                        output.text = door.description();
                        return output;
                    }
                }
                output.text = `Sorry, you can't ${verb} there.`
                return output;
            }
        }

        // OPEN
        const openVerbs = ['open'];
        for (const verb of openVerbs) {
            if (terms.includes(verb)) {
                for (const door of this.doors) {
                    if (terms.includes(door.name)) {
                        if (!door.isLocked) {
                            if (!door.isOpened) {
                                door.isOpened = true;
                                output.text = 'You open the door.';
                                return output;
                            }
                            output.text = 'The door is already opened.';
                            return output;
                        }
                        output.text = 'The door is locked.';
                        return output;
                    }
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
                            output.inventory.add = [item];
                            return output;
                        }
                        output.text = `Sorry, you can't take this item.`
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
            }
        }

        // UNLOCK

        // INVENTORY
        if (terms.includes('inventory')) {
            const inventory = gameState.inventory.reduce((acc, item) => {
                return acc + '\n' + '- ' + item.name;
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
        add: Item[];
        remove: Item[];
    };
}



