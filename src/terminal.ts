import { createScript, ScriptTypeBase } from "../lib/create-script-decorator";
import { waitForSeconds } from "../lib/utility";

@createScript()
class Terminal extends ScriptTypeBase implements ScriptType {
    name = 'terminal';
    text: string = '';

    initialize() {
        this.app.on('gameController:textOutput', this.onTextOutput, this)
    }

    update() {
        this.entity.element.text = this.text;
    }

    onTextOutput(text: string) {
        this.text = '';
        const processString = async (string: string) => {            
            for (let char of string) {     
                this.text += char  ;        
                await waitForSeconds(0.01);
            }
        }
        processString(text);      
    }
}