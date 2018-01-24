import { Room } from "../room";
import { Door } from "../data-interfaces";

export const northRoom = new Room({
    name: 'north room',
    description: function() {
        return 'You stand by the doorway, inside the room, the darkness preventing you from going deeper into the room.\n' +
        'To the South, you see the empty room with the box, where you just came from.';
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