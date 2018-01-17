import { Room, Output } from "../room";
import { GameState } from "../game-controller";

export class CenterRoom extends Room {
    roomName = 'centerRoom';

    roomState = {
        openedBox: false,
        keyTaken: false,
        northDoorUnlocked: false
    }

    processInput(terms: string[], gameState: GameState): Output {
        let output: Output = {
            text: '',
            moveTo: '',
            inventory: {
                add: [],
                remove: []
            }
        }

        // LOOK
        if (terms.includes('look')) {
            if (terms.includes('around')) {
                if (this.roomState.northDoorUnlocked) {
                    output.text = 'You are standing in an empty square room. Each of the four walls has a door.\n' +
                        'You can see a small box on the floor in the middle of the room.\n' +
                        'The door on the North wall is opened and leads to another room steeped in darkness.';
                    return output;
                }
                output.text = 'You are standing in an empty square room. Each of the four walls has a door.\n' +
                    'You can see a small box on the floor in the middle of the room.';
                return output;
            }
            if (terms.includes('box')) {
                if (this.roomState.openedBox && !this.roomState.keyTaken)
                    output.text = 'It is a plain wooden box with a lid. Inside, you see a small metal key.';
                else
                    output.text = 'It is a plain wooden box with a lid.'
                return output;
            }
            output.text = `Sorry, you can't look at that.`;
            return output;
        }

        // OPEN
        if (terms.includes('open')) {
            if (terms.includes('box')) {
                this.roomState.openedBox = true;
                output.text = 'You open the box. Inside, you see a small metal key.'
                return output;
            }
            output.text = `Sorry, you can't open that.`;
            return output;
        }

        // TAKE
        if (terms.includes('take')) {
            if (terms.includes('key') && this.roomState.openedBox) {
                if (this.roomState.keyTaken)
                    output.text = `You have already taken the key`;
                else {
                    this.roomState.keyTaken = true;
                    output.text = 'You take the key.';
                    output.inventory.add = ['a small metal key']
                }
                return output;
            }
            output.text = `Sorry, you can't take that.`
            return output;
        }

        // UNLOCK
        if (terms.includes('unlock')) {
            if (terms.includes('door') && this.roomState.keyTaken) {
                if (terms.includes('north')) {
                    if (this.roomState.northDoorUnlocked)
                        output.text = 'You have already unlocked the North door';
                    else
                        output.text = 'You unlock and open the north door.\n' +
                            'The room on the other side is steeped in darkness.'
                    this.roomState.northDoorUnlocked = true;
                    return output;
                }
                output.text = `Please identify the door you wish to unlock?`
                return output;
            } else {
                output.text = `Sorry, you can't unlock that.`
                return output;
            }
        }

        // WALK
        if (terms.includes('walk')) {
            if (terms.includes('north') && this.roomState.northDoorUnlocked) {
                output.moveTo = 'northRoom';
                return output;
            }
        }

        return super.processInput(terms, gameState);
    }
}
