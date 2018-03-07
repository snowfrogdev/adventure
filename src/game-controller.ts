import { createScript, ScriptTypeBase } from "../lib/create-script-decorator";
import { Room } from "./room";
import { rooms } from "./rooms/rooms";
import { Item } from "./data-interfaces";
import { waitForSeconds } from "../lib/utility";

const nlp = require('compromise');

@createScript()
class GameController extends ScriptTypeBase implements ScriptType {
    name = 'gameController';

    rooms: Room[] = rooms;
    gameState: GameState;



    initialize() {
        this.gameState = {
            currentRoom: rooms[0],
            inventory: [],
            flags: {
                rangBellInSchool: false
            }
        }


        this.app.on('textInput:enter', this.onInput, this);

    }

    postInitialize() {
        this.app.fire(
            'gameController:textOutput',
            this.gameState.currentRoom.processInput(['look', 'around'], this.gameState).text
        );
    }

    update() {

    }

    onInput(text: string) {
        // Parse string
        const parsedText = nlp(text).terms().data().map((term: any) => {
            return term.normal;
        });

        const output = this.gameState.currentRoom.processInput(parsedText, this.gameState);        

        if (output.moveTo) {
            const nextRoom = this.rooms.find(room => room.name === output.moveTo);
            if (!nextRoom)
                return this.app.fire('gameController:textOutput', 'No such room name');

            this.gameState.currentRoom = nextRoom;
            if (output.sound) {
                waitForSeconds(0.5)
                .then(() => {
                    this.entity.sound.play(output.sound);
                });            
            }
            return this.app.fire(
                'gameController:textOutput',
                this.gameState.currentRoom.processInput(['look', 'around'], this.gameState).text
            );
        }

        if (output.inventory.add.length) {
            output.inventory.add.forEach(item => {
                this.gameState.inventory.push(item);
            });
        }
        if (output.inventory.remove.length) {
            output.inventory.remove.forEach(item => {
                this.gameState.inventory = this.gameState.inventory.filter(e => e !== item)
            });
        }

        this.app.fire('gameController:textOutput', output.text)

        if (output.sound) {
            waitForSeconds(0.5)
            .then(() => {
                this.entity.sound.play(output.sound);
            });            
        }



    }
}

export interface GameState {
    currentRoom: Room;
    inventory: Item[];
    flags: {
        rangBellInSchool: boolean;

    }
}