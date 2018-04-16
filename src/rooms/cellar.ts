import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const cellar = new Room({
    name: 'cellar',
    description: function (gamestate) {
        for (const item of gamestate.inventory) {
            if (item.name === 'candle')
                return 'You see a dark passageway. The room is cold and musty. ' + 
                'At the end of the corridor you see two doors. One on the east side and one on the west side. ' + 
                'The west door is locked from this side with a bolt and you can open the door. ' + 
                'The east door is locked from the other side. ' + 
                'The south door leads outside.';
        }
        return "It’s dark. You can’t see anything. You should probably go back south, towards the light of day.";
    },
    doors: [        
        new Door({
            name: 'south',
            description: function (gamestate) {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'orphanage outdoor',
            isLocked: false,
            isOpened: true
        }),
        new Door({
            name: 'west',
            description: function (gamestate) {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'anna cell',
            isLocked: false,
            isOpened: false
        }),
        new Door({
            name: 'east',
            description: function (gamestate) {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'lab',
            isLocked: true,
            isOpened: false
        })
    ],
    items: [
        
    ]
});