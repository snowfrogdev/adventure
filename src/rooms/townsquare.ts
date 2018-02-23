import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const townSquare = new Room({
    name: 'town square',
    description: function() {        
        return "You are standing in the Wisscasset town square. \n" + 
        "At the center of the square you see a fountain.\n" + 
        "To the north is a school, to the east a church and to the west an orphanage.\n" +
        "To the south is the Sortwell's Inn, where you have a room.";
    },
    doors: [
        new Door({
            name: 'south',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'lobby',
            isLocked: false,
            isOpened: true
        }),
        new Door({
            name: 'north',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'school',
            isLocked: true,
            isOpened: false
        })
    ],
    items: [ ]
})