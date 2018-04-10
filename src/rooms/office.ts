import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const office = new Room({
    name: 'office',
    description: function (gamestate) {
        return "You are standing in what looks like the priest's office. On the wall, there is a shelf and on the shelf is an urn.";
    },
    doors: [        
        new Door({
            name: 'north',
            description: function (gamestate) {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'church',
            isLocked: false,
            isOpened: true
        }),
    ],
    items: [
        new Item({
            name: 'urn',
            description: function(gamestate) {
                return "Ewww, an urn. There's probably a dead person in it. Oh, actually, just a piece of paper.";
            },            
            canBePickedUp: true,
            isContainer: true,
            isLocked: false,
            isOpened: true,  
            items: [
                new Item({
                    name: 'paper',
                    description: function(gamestate) {
                        return "It's piece of paper with the number '762' written on it.";
                    },
                    use: function(gamestate) {
                        if(gamestate.currentRoom.name === 'orphanage outdoor') {
                            gamestate.currentRoom.doors[2].isLocked = false;
                            return "You unlock the door to the cellar."
                            
                        }
                        return "You can't use this piece of paper here.";
                    },
                    canBePickedUp: true
                })
            ]          
        })
    ]
});