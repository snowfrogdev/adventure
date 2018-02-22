export interface Lookable {
    name: string;
    description: () => string;
}

export class Door implements Lookable {
    public name: string; 
    public description: (this: Door) => string; 
    public isLocked: boolean;
    public isOpened: boolean;
    public destination: string;

    constructor(obj: {
        name: string; 
        description: (this: Door) => string; 
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
    public description: (this: Item) => string;
    public dialog: (this: Item) => string;
    public canBePickedUp: boolean;
    public pickedUp: boolean;
    public isContainer: boolean;
    public isLocked: boolean;
    public isOpened: boolean;
    public container: Item | undefined;
    public items: Item[];

    constructor(obj: {
        name: string;
        description: (this: Item) => string;
        dialog?: (this: Item) => string;
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
        this.canBePickedUp = obj.canBePickedUp || false;
        this.pickedUp = false;
        this.isContainer = obj.isContainer || false;
        this.isLocked = obj.isLocked || false;
        this.isOpened = obj.isOpened || false;
        this.container = obj.container || undefined;
        this.items = obj.items || [];
    }


    
}