import { createScript, ScriptTypeBase } from "../lib/create-script-decorator";
import { Room } from "./room";

const nlp = require('compromise');

@createScript()
class GameController extends ScriptTypeBase implements ScriptType {
    name = 'gameController';

    currentRoom: Room;

    initialize() {
        this.app.on('textInput:enter', this.onInput, this);

    }

    update() {

    }

    onInput(text: string) {
        // Parse string
        const parsedText = nlp(text).terms().data().map((term: any) => {
            if (term.bestTag === 'Verb' || term.bestTag === 'Noun')
                return term.normal;
        });

        const output = this.currentRoom.processInput();
        
        /*
        ((terms: string[]) => {
            if (terms.includes('like') && terms.includes('butts'))
                return 'And let me guess... you cannot lie?'
            
            if (terms.includes('sex'))
                return 'Oh you dirty bird you.'
            
            return 'I am sorry but I did not understand your request.'
        })(parsedText);
        */
        this.app.fire('gameController:textOutput', output)


    }
}