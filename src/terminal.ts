import { createScript, ScriptTypeBase } from "../lib/create-script-decorator";
import { waitForSeconds } from "../lib/utility";

@createScript()
class Terminal extends ScriptTypeBase implements ScriptType {
    name = 'terminal';
    text: string = '';
    textBuffer: string = '';
    queue: string[] = [];
    notProcessingQueue: boolean = true;

    initialize() {
        this.app.on('gameController:textOutput', this.onTextOutput, this);
    }

    update() {
        this.entity.element.text = this.text;
        if (this.notProcessingQueue) {
            this.processQueue(this.queue);
        }        
    }

    onTextOutput(text: string) {
        this.queue.push(text);
    }

    processQueue(queue: string[]) {
        
        if (queue.length) {
            const text = queue.shift() as string;
            this.text = this.textBuffer + '\n------------------------------\n';
            const processString = async (string: string) => {
                this.notProcessingQueue = false;
                for (let char of string) {
                    this.text += char;
                    await waitForSeconds(0.01);
                }
                this.notProcessingQueue = true;
            }
            processString(text);
            this.textBuffer = text;
        }                
    }
}