import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const corridor = new Room({
    name: 'corridor',
    description: function() {        
        return "You are standing in a corridor. \n" + 
        "On the south wall is the door leading to your room.\n" + 
        "On the north wall you see another door, no doubt leading to another\n" +
        "guest's room. You also notice a set of stairs leading down to the lobby.";
    },
    doors: [
        new Door({
            name: 'south',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'my room',
            isLocked: false,
            isOpened: true
        }),
        new Door({
            name: 'north',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'anna room',
            isLocked: true,
            isOpened: false
        }),
        new Door({
            name: 'down',
            description: function() {
                return `The stairs lead down to the Sortwell's Inn lobby.`
            },
            destination: 'lobby',
            isLocked: false,
            isOpened: true
        }),
    ],
    items: [ ]
})