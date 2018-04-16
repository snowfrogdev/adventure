import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const annaCell = new Room({
    name: 'anna cell',
    description: function (gamestate) {
        if (gamestate.flags.rescuedAnna) {
            this.items = [];
            "You are standing in a small cell, an open door to the east.";
        }
        return "You are standing in a small cell, an open door to the east. " + 
        "You find a young girl, dirty, crouched in a corner. She looks up at you, her eyes lit up " +
        "and she says: 'Uncle Victor!? Is that really you!?' It's your niece, Anna!";
    },
    doors: [
        new Door({
            name: 'east',
            description: function (gamestate) {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'cellar',
            isLocked: false,
            isOpened: true
        })
    ],
    items: [
        new Item({
            name: 'anna',
            description: function (gamestate) {
                return "Your niece looks like she's had a rough couple of weeks. She is dirty and discheveled.";
            },
            dialog: function (gamestate) {
                if (this.dialogLine === 1) {
                    this.dialogLine = 2
                    return "Anna!, is that really you! Dear God what have they done to you? \n" + 
                    "Yes it is! I was taken 3 weeks ago. I suspect that the priest was the one " +
                    "to have kidnapped me but I don’t know why. I think it was because I had asked him a "+ 
                    "lot of questions about the disappearing orphans. I suspect he might be involved somehow.";      
                }
                if (this.dialogLine === 2) {
                    this.dialogLine = 0;
                    return "It might be nothing but I heard a lot of odd mechanical type noises coming from the other door. " +
                    "I also heard it open and close when they brought me food.\n\n" + 
                    "You discuss some more and you send her straight to the sherrif’s station while you continue your investigation.";     
                }

                gamestate.flags.rescuedAnna = true;
                return "I'm just gathering myself a minute and going straight to the police like we discussed."           

            },
            canBePickedUp: false,
            isContainer: false,
            isLocked: false,
            isOpened: false
        })
    ]
});