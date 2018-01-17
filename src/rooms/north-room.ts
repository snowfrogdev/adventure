import { Room, Output } from "../room";
import { GameState } from "../game-controller";

export class NorthRoom extends Room {
    roomName = 'northRoom';

    roomState = {
        
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
                output.text = 'You stand by the doorway, the darkness preventing you from going deeper in the room.\n' +
                    'To the South, you seem the empty room with the box, where you just came from.';
                return output;
            }
            
            output.text = `Sorry, you can't look at that.`;
            return output;
        }        

        // WALK
        if (terms.includes('walk')) {
            if (terms.includes('south')) {
                output.moveTo = 'centerRoom';
                return output;
            }
        }

        return super.processInput(terms, gameState);
    }
}