import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const orphanageOutdoor = new Room({
    name: 'orphanage outdoor',
    description: function(gamestate) {  
        if(gamestate.flags.readJournal) {
            this.doors[1].isLocked = false;
            this.doors[1].isOpened = true;
        }                
        return "You are standing in front of a large, old, and L-shaped building with a sign that reads:  " + 
        "Wisscasset Orphanage. On the west wall you see the main entrance door. On the north wall, " +
        "you see a door that probably leads to a basement cellar.";
    },
    doors: [
        new Door({
            name: 'east',
            description: function(gamestate) {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'town square',
            isLocked: false,
            isOpened: true
        }),
        new Door({
            name: 'west',
            description: function(gamestate) {
                if (this.isLocked) {
                    return "Looks like the orphanage is closed to visitors at the moment. You should try later."
                }
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'orphanage',
            isLocked: true,
            isOpened: false
        }),
        new Door({
            name: 'north',
            description: function(gamestate) {
                if (this.isLocked) {
                    return "This door is locked with a combination lock."
                }
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'cellar',
            isLocked: true,
            isOpened: false
        })
    ],    
    items: []
})