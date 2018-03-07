import { GameState } from "./game-controller";

export interface Lookable {
    name: string;
    description: (gameState: GameState) => string;
}

export class Door implements Lookable {
    public name: string; 
    public description: (this: Door, gameState: GameState) => string; 
    public isLocked: boolean;
    public isOpened: boolean;
    public destination: string;

    constructor(obj: {
        name: string; 
        description: (this: Door, gameState: GameState) => string; 
        destination: string;
        isLocked?: boolean;
        isOpened?: boolean;
    }) {
        this.name = obj.name;
        this.description = obj.description;
        this.destination = obj.destination;
        this.isLocked = obj.isLocked || false;
        this.isOpened = obj.isOpened || false;
    }    
}

export class Item implements Lookable {
    public name: string; 
    public description: (this: Item, gameState: GameState) => string;
    public dialog: (this: Item, gameState: GameState) => string;
    public dialogLine: number;
    public giveItem: boolean;
    public use: (this: Item, gameState: GameState) => string;
    public canBePickedUp: boolean;
    public pickedUp: boolean;
    public isContainer: boolean;
    public isLocked: boolean;
    public isOpened: boolean;
    public container: Item | undefined;
    public items: Item[];

    constructor(obj: {
        name: string;
        description: (this: Item, gameState: GameState) => string;
        dialog?: (this: Item, gameState: GameState) => string;
        use?: (this: Item, gameState: GameState) => string;
        canBePickedUp?: boolean;
        isContainer?: boolean;
        isLocked?: boolean;
        isOpened?: boolean;
        container?: Item;
        items?: Item[];
    }) {
        this.name = obj.name;
        this.description = obj.description;
        this.dialog = obj.dialog || function() { return "You can't talk to that." };
        this.dialogLine = 1;
        this.giveItem = false;
        this.use = obj.use || function() { return "You can't use that here."};
        this.canBePickedUp = obj.canBePickedUp || false;
        this.pickedUp = false;
        this.isContainer = obj.isContainer || false;
        this.isLocked = obj.isLocked || false;
        this.isOpened = obj.isOpened || false;
        this.container = obj.container || undefined;
        this.items = obj.items || [];
    }    
}