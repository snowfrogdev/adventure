import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const myRoom = new Room({
    name: 'my room',
    description: function() {
        if (this.doors[0].isOpened && this.items[0].pickedUp) {
            return "You are standing in your room at the Sortwell's Inn. " +
            "The door on the north wall is open."
        }
        if (this.items[0].pickedUp) {
            return "You are standing in your room at the Sortwell's Inn. " +
            "The door on the north wall is closed."
        }
        return "You are standing in your room at the Sortwell's Inn. " + 
        "A newspaper lies on the floor by the door on the north wall. " + 
        "Mrs. Sortwell must have slid the newspaper under the door early this morning.";
    },
    doors: [
        new Door({
            name: 'north',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'corridor',
            isLocked: false,
            isOpened: false
        })
    ],
    items: [
        new Item({
            name: 'newspaper',
            description: function() {
                return "A Wiscasset town newspaper dated April 16th, 1908. " + 
                "A main article talks about the recent disapearances of a young boy and " + 
                "an elderly man, both from Wiscasset, but no mention of your niece, Anna.";
            },
            canBePickedUp: true,
            isContainer: false,
            isLocked: false,
            isOpened: false,            
        })
    ]
})