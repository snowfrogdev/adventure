import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const annaRoom = new Room({
    name: 'anna room',
    description: function() {
        if (this.items[0].pickedUp) {
            return "You are standing in Anna's room at the Sortwell's Inn. " +
            "The door on the south wall is open."
        }
        return "You are standing in Anna's room at the Sortwell's Inn. " + 
        "The door on the south wall is open. " +
        "A journal lies on the bedside table.";
    },
    doors: [
        new Door({
            name: 'south',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'corridor',
            isLocked: false,
            isOpened: true
        })
    ],
    items: [
        new Item({
            name: 'journal',
            description: function(gameState) {
                gameState.flags.readJournal = true;
                return "The last entry in Anna's journal reads: \n"+
                "I feel like I am getting close to discovering something horrible... " +
                "the disapearance of those children and of old Mrs. Coolidge. Something is not quite " +
                "right and I'm going to find out what it is. Tomorrow I'm going to investigate " +
                "the orphanage to see if I can't find out any clues.";
            },
            canBePickedUp: true,
            isContainer: false,
            isLocked: false,
            isOpened: false,            
        })
    ]
})