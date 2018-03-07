import { Room } from "../room";
import { Door, Item } from "../data-interfaces";
import { GameState } from "../game-controller";

export const lobby = new Room({
    name: 'lobby',
    description: function() {
        if (this.items[0].pickedUp) {
            return "You are standing in the lobby of the Sortwell's Inn. \n" + 
            "Mrs. Sortwell is standing behind the reception desk and greets you with a smile. \n" +             
            "On the north wall, you see the door leading to the town square outside the Inn.";
        }        
        return "You are standing in the lobby of the Sortwell's Inn. \n" + 
        "Mrs. Sortwell is standing behind the reception desk and greets you with a smile. \n" + 
        "On the desk, you see, next to a small bell, a sign that reads: 'Please ring for service'.\n"+
        "On the north wall, you see the door leading to the town square outside the Inn.";
    },
    doors: [
        new Door({
            name: 'north',
            description: function() {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'town square',
            isLocked: false,
            isOpened: false
        }),
        new Door({
            name: 'up',
            description: function() {
                return "The stairs lead up to the second floor, \n" + 
                "where your room is located."
            },
            destination: 'corridor',
            isLocked: false,
            isOpened: true
        })
    ],
    items: [
        new Item({
            name: 'bell',
            description: function() {
                return "A small handheld bell.";
            },
            use: function(gameState: GameState) {
                if(!gameState.flags.rangBellInSchool && gameState.currentRoom.name === 'school') {
                    gameState.flags.rangBellInSchool = true;
                    return "You ring the bell. Before Mrs. Kanmore can say anything, \n" + 
                    "the students quickly get up and get out of the classroom for recess."
                }
                return "You ring the bell and nothing happens."
            },
            canBePickedUp: true,
            isContainer: false,
            isLocked: false,
            isOpened: false,            
        }),
        new Item({
            name: 'sortwell',
            description: function() {
                return "Mrs. Sortwell is a tall, thin and dignified looking woman.\n"+
                "She runs the Sortwell's Inn with her husband.";
            },
            dialog: function() {
                return "Hello Mr. Victor, I hope you're having a pleasant stay."
            },
            canBePickedUp: true,
            isContainer: false,
            isLocked: false,
            isOpened: false,            
        })
    ]
})