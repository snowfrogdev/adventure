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
        "On the desk, you see, next to a small bell, a sign that reads: 'Please ring for service'."+
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
            use: function(gamestate) {
                if(!gamestate.flags.rangBellInSchool && gamestate.currentRoom.name === 'school') {
                    gamestate.flags.rangBellInSchool = true;
                    return "You ring the bell. Before Mrs. Canmore can say anything, \n" + 
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
            dialog: function(gamestate) {
                if (gamestate.flags.rangBellInSchool && this.dialogLine === 1) {
                    this.giveItem = true;
                    return "Hello Mr. Victor, I heard you were looking into the disappearance of Anna. \n" +
                    "I had no idea she was missing. But now that I think of it, I can't quite remember \n" + 
                    "the last time I saw her. Since you are family, I'll give you the key to her room; \n" +
                    "maybe you can find something helpful in there. (She hands you a key and you take it)";
                }

                return "Hello Mr. Victor, I hope you're having a pleasant stay."
            },
            canBePickedUp: false,
            isContainer: false,
            isLocked: false,
            isOpened: false,
            items: [
                new Item({
                    name: 'key',
                    description: function(gamestate) {
                        return "A key to Anna's room at the Sortwell's Inn.";
                    },
                    use: function(gamestate) {
                        if(gamestate.currentRoom.name === 'corridor') {
                            gamestate.currentRoom.doors[1].isLocked = false;
                            return "You unlock the door to Anna's room."
                            
                        }
                        return "You can't use the key here";
                    },
                    canBePickedUp: true
                })
            ]                   
        })
    ]
})