import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const townSquare = new Room({
    name: 'town square',
    ambientSounds: ['fountain', 'birds'],
    description: function() {        
        return "You are standing in the Wisscasset town square. " +         
        "To the north is a school, to the east a church and to the west an orphanage. " +
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
            isLocked: false,
            isOpened: true
        }),
        new Door({
            name: 'west',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'orphanage outdoor',
            isLocked: false,
            isOpened: true
        }),
        new Door({
            name: 'east',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'church',
            isLocked: false,
            isOpened: true
        })
    ],
    items: [ ]
})