import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const school = new Room({
    name: 'school',
    description: function(gamestate) {
        if(gamestate.flags.rangBellInSchool) {
            return "You are standing in a classroom. The students are all gone, \n" +
            "but Mrs. Kanmore is still here, getting here things ready for the next class."
        }          
        return "You are standing at the back of a classroom filled with young students. \n" + 
        "They are listening intently to Mrs. Kanmore's lesson on geography.";
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
            name: 'kanmore',
            description: function(gamestate) {
                return "Mrs. Kanmore is a woman.\n"+
                "She teaches at the Wisscasset elementary school.";
            },
            dialog: function(gamestate) {
                if (gamestate.flags.rangBellInSchool && this.dialogLine === 1) {
                    this.dialogLine = 2;
                    this.giveItem = true;
                    return "You must be Mr. Victor, I was expecting you. I heard your were \n" +
                    "looking into your niece's dissapearance. I haven't seen her in about a month \n" +
                    "but she did leave me a letter saying that she was quitting her job at the school. \n" +
                    "Here, you can have it. (She hands you the letter and you take it)."
                }
                if (gamestate.flags.rangBellInSchool && this.dialogLine === 2) {
                    return "I'm sorry Mr. Victor, I can't be of further help and must prepare \n" +
                    "for class.";
                }   
                return "You can't talk to Mrs. Kanmore while she's in the middle of teaching class. \n" +
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
                        return "Dear Mrs. Kanmore,\n" + 
                        "I hereby tender my resignation from the Wisscasset elementary school,\n" +
                        "effective immidiately.\n" +
                        "Anna Victor";
                    },
                    canBePickedUp: true
                })
            ]          
        })
    ]
})