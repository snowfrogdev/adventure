import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const orphanage = new Room({
    name: 'orphanage',
    description: function(gamestate) {                  
        return "You are standing inside the orphanage. Mrs. Coolidge, the orphanage director, " + 
        "eyes you with an inquisitive look. A young boy in his early teens is mopping the floor. " + 
        "To the east is a door leading outside.";
    },
    doors: [
        new Door({
            name: 'east',
            description: function(gamestate) {                
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'orphanage outdoor',
            isLocked: false,
            isOpened: true
        })
    ],    
    items: [        
        new Item({
            name: 'coolidge',
            description: function(gamestate) {
                return "You see nothing special about Mrs. Coolidge.";
            },
            dialog: function(gamestate) {                
                return "You ask Mrs. Coolidge about the missing children. She explains that actually 3 children have gone missing in the past 2 years. " +
                "Nobody makes a fuss about it as they are orphans, poor souls.";           
                
            },
            canBePickedUp: false,
            isContainer: false,
            isLocked: false,
            isOpened: false
        }),
        new Item({
            name: 'boy',
            description: function(gamestate) {
                return "You see nothing special about this orphan boy.";
            },
            dialog: function(gamestate) {
                if (this.dialogLine === 1) {
                    this.dialogLine = 2
                    return "You ask him if if he knew the missing children. He explains to you that all the orphans " + 
                    "know each other but the missing children were very quiet and all three kept to themselves a lot.";     
                }
                if (this.dialogLine === 2) {
                    this.dialogLine = 3
                    return "You ask him if the orphanage gets any visitors and he tells you that it's very rare. " + 
                    "Sometimes adoptive parents come but aside from the local parish priest, they don't get much visitors.";     
                }
                if (this.dialogLine === 3) {
                    return "You ask him more about the priest, why does he come by?\n" + 
                    "He tells you about a cellar in the basement that is used by the church. " +
                    "Sometimes there are some boxes from the church that come and go but the cellar is locked under key and only the priest has the key.";     
                }  
                return "Hello mister, I hope than you can find you niece and my missing friends from the orphanage."               
                      
                
            },
            canBePickedUp: false,
            isContainer: false,
            isLocked: false,
            isOpened: false
        })
    ]
})