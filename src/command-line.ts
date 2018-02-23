import { createScript, ScriptTypeBase } from "../lib/create-script-decorator";

@createScript()
class CommandLine extends ScriptTypeBase implements ScriptType {
    name = 'commandLine';
    textInput: string = '';    
    timer = 0;

    initialize() {
        this.app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
    }

    update(dt: number) {
        this.timer += dt; 
        if (this.timer > 1.2)
            this.timer= 0;
        else if (this.timer <= 0.6)
            this.entity.element.text = '>' + this.textInput + '_';
        else 
            this.entity.element.text = '>' + this.textInput
    }

    onKeyDown(event: pc.KeyboardEvent) {
        if(
            event.key === pc.KEY_SHIFT || 
            event.key === pc.KEY_CAPS_LOCK ||
            event.key === pc.KEY_ALT ||
            event.key === pc.KEY_CONTROL ||
            event.key === pc.KEY_CONTEXT_MENU ||
            event.key === pc.KEY_TAB ||
            event.key === pc.KEY_WINDOWS ||
            event.key === pc.KEY_ESCAPE ||          // TO DO: Give some behaviour to escape key ?
            event.key === pc.KEY_F1 ||
            event.key === pc.KEY_F2 ||
            event.key === pc.KEY_F3 ||
            event.key === pc.KEY_F4 ||
            event.key === pc.KEY_F5 ||
            event.key === pc.KEY_F6 ||
            event.key === pc.KEY_F7 ||
            event.key === pc.KEY_F8 ||
            event.key === pc.KEY_F9 ||
            event.key === pc.KEY_F10 ||
            event.key === pc.KEY_F11 ||
            event.key === pc.KEY_F12 ||
            event.key === pc.KEY_PRINT_SCREEN ||
            event.key === pc.KEY_HOME ||
            event.key === pc.KEY_END ||
            event.key === pc.KEY_INSERT ||
            event.key === pc.KEY_LEFT ||
            event.key === pc.KEY_RIGHT ||
            event.key === 223 ||                    // RIGHT_CONTROL
            event.key === 92  ||                    // RIGHT_WINDOWS
            event.key === 144 ||                    // NUM_LOCK
            event.key === 145 ||                    // SCROLL_LOCK
            event.key === 19  ||                    // PAUSE_BREAK
            event.key === 173 ||                    // MUTE_VOLUME
            event.key === 174 ||                    // DECREASE_VOLUME
            event.key === 175 ||                    // INCREASE_VOLUME
            event.key === 191                       // FORWARD SLASH OR Ç
        )
            return      
        if(event.key === pc.KEY_BACKSPACE || event.key === pc.KEY_DELETE) {
            this.textInput = this.textInput.slice(0, -1);
            this.playTypingSound();
            return;
        }
        if(event.key === pc.KEY_ENTER) {
            this.app.fire('textInput:enter', this.textInput);
            this.textInput = '';
            this.playTypingSound();
            return;
        }
        this.textInput += event.event.key;
        this.playTypingSound();
    }

    playTypingSound() {
        //this.entity.sound.pitch = pc.math.random(0.99, 1.01);
        this.entity.sound.play('typing');
    }
}