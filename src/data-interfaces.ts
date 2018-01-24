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
    public canBePickedUp: boolean;
    public isContainer: boolean;
    public isLocked: boolean;
    public isOpened: boolean;
    public items: Item[];

    constructor(obj: {
        name: string;
        description: (this: Item) => string;
        canBePickedUp?: boolean;
        isContainer?: boolean;
        isLocked?: boolean;
        isOpened?: boolean;
        items?: Item[];
    }) {
        this.name = obj.name;
        this.description = obj.description;
        this.canBePickedUp = obj.canBePickedUp || false;
        this.isContainer = obj.isContainer || false;
        this.isLocked = obj.isLocked || false;
        this.isOpened = obj.isOpened || false;
        this.items = obj.items || [];
    }


    
}