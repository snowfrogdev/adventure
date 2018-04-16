import { Room } from "../room";
import { Door, Item } from "../data-interfaces";

export const church = new Room({
    name: 'church',
    ambientSounds: ['church'],
    noMusic: true,
    description: function (gamestate) {
        return "You are standing in a church. There are hundreds of lit candles next to an altar. " +
            "In one corner you can see a priest and a choir. On the south wall, " +
            "you can see a door that leads to an adjacent room. " + 
            "A door on the west wall leads back to the town quare.";
    },
    doors: [
        new Door({
            name: 'west',
            description: function (gamestate) {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'town square',
            isLocked: false,
            isOpened: true
        }),
        new Door({
            name: 'south',
            description: function (gamestate) {
                return `This door is currently ${this.isLocked ? 'locked' : 'unlocked'} and ${this.isOpened ? 'opened' : 'closed'}.`
            },
            destination: 'office',
            isLocked: false,
            isOpened: false
        }),
    ],
    items: [
        new Item({
            name: 'priest',
            description: function (gamestate) {
                return "The priest is busy rehearsing with the choir at the moment.";
            },
            dialog: function (gamestate) {
                return "You can't talk to the priest at the moment, he's busy with the choir.";

            },
            canBePickedUp: false,
            isContainer: false,
            isLocked: false,
            isOpened: false
        }),
        new Item({
            name: 'candle',
            description: function (gamestate) {
                return "It's a lit candle. Very useful in the dark.";
            },
            canBePickedUp: true,
            isContainer: false,
            isLocked: false,
            isOpened: false
        })
    ]
});