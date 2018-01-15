import { rooms } from './rooms/rooms';
import { createScript, ScriptTypeBase } from "../lib/create-script-decorator";
import { Room } from "./room";
import { centerRoom } from "./rooms/center-room";

const nlp = require('compromise');

@createScript()
class GameController extends ScriptTypeBase implements ScriptType {
    name = 'gameController';

    currentRoom: Room;
    rooms = rooms;

    initialize() {
        this.currentRoom = centerRoom;
        
        this.app.on('textInput:enter', this.onInput, this);

    }

    postInitialize() {
        this.app.fire('gameController:textOutput', this.currentRoom.arrive);
    }

    update() {

    }

    onInput(text: string) {
        // Parse string
        const parsedText = nlp(text).terms().data().map((term: any) => {            
            return term.normal;
        });

        const output = this.currentRoom.processInput(parsedText);
        if (output.moveTo) { 
            const nextRoom = this.rooms.find(room => room.roomName === output.moveTo);
            if (!nextRoom) 
                return this.app.fire('gameController:textOutput', 'No such room name');         
            
            this.currentRoom = nextRoom;
            return this.app.fire('gameController:textOutput', this.currentRoom.arrive);
        }
       
        this.app.fire('gameController:textOutput', output.text)
                    


    }
}