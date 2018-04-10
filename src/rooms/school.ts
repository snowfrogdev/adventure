import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const school = new Room({
    name: 'school',
    description: function(gamestate) {
        if(gamestate.flags.rangBellInSchool) {
            return "You are standing in a classroom. The students are all gone, " +
            "but Mrs. Canmore is still here, getting her things ready for the next class."
        }          
        return "You are standing at the back of a classroom filled with young students. " + 
        "They are listening intently to Mrs. Canmore's lesson on geography.";
    },
    doors: [
        new Door({
            name: 'south',
            description: function(gamestate) {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'town square',
            isLocked: false,
            isOpened: true
        }),
    ],
    items: [        
        new Item({
            name: 'canmore',
            description: function(gamestate) {
                return "Mrs. Canmore is a woman. "+
                "She teaches at the Wisscasset elementary school.";
            },
            dialog: function(gamestate) {
                if (gamestate.flags.rangBellInSchool && this.dialogLine === 1) {
                    this.dialogLine = 2;
                    this.giveItem = true;
                    return "You must be Mr. Victor, I was expecting you. I heard your were " +
                    "looking into your niece's dissapearance. I haven't seen her in about a month " +
                    "but she did leave me a letter saying that she was quitting her job at the school. " +
                    "Here, you can have it. (She hands you the letter and you take it)."
                }
                if (gamestate.flags.rangBellInSchool && this.dialogLine === 2) {
                    this.dialogLine = 3;
                    return "I know Anna had a room at the Sortwell's Inn, you might want to inquire there.";
                }   
                if (gamestate.flags.rangBellInSchool && this.dialogLine === 3) {
                    return "I'm sorry Mr. Victor, I can't be of further help and must prepare " +
                    "for class.";
                }   
                return "You can't talk to Mrs. Canmore while she's in the middle of teaching class. " +
                "If only recess could come sooner."           
                
            },
            canBePickedUp: false,
            isContainer: false,
            isLocked: false,
            isOpened: false,  
            items: [
                new Item({
                    name: 'letter',
                    description: function(gamestate) {
                        return "Dear Mrs. Canmore,\n\n" + 
                        "I hereby tender my resignation from the Wisscasset elementary school, " +
                        "effective immidiately.\n\n" +
                        "Anna Victor";
                    },
                    canBePickedUp: true
                })
            ]          
        })
    ]
})