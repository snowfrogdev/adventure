import { Room } from "../room";
import { Door } from "../data-interfaces";

export const centerRoom = new Room({
    name: 'center room',
    description: function() {
        return 'You are standing in an empty square room. Each of the four walls has a door.\n' +
        'You can see a small box on the floor in the middle of the room.';
    },
    doors: [
        new Door({
            name: 'north',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'north room',
            isLocked: true,
            isOpened: false
        }),
        new Door({
            name: 'east',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'east room',
            isLocked: true,
            isOpened: false
        }),
        new Door({
            name: 'south',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'south room',
            isLocked: true,
            isOpened: false
        }),
        new Door({
            name: 'west room',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'north room',
            isLocked: true,
            isOpened: false
        })
    ]
})
