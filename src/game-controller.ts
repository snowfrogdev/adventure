import { createScript, ScriptTypeBase } from "../lib/create-script-decorator";
import { Room } from "./room";
import { rooms } from "./rooms/rooms";
import { Item } from "./data-interfaces";
import { waitForSeconds } from "../lib/utility";

const nlp = require('compromise');

@createScript()
class GameController extends ScriptTypeBase implements ScriptType {
    name = 'gameController';

    rooms: Room[];
    gameState: GameState;


    initialize() {
        
        this.loadGame();

        this.app.on('textInput:enter', this.onInput, this);

    }

    postInitialize() {
        // Play room ambient sounds
        if (this.gameState.currentRoom.ambientSounds) {
                
            if(this.gameState.currentRoom.noMusic) {
                this.entity.sound.pause('music');
            } else {
                waitForSeconds(0.5)
                .then(() => {
                    this.entity.sound.resume('music');
                })
                
            }
            
            waitForSeconds(0.5)
            .then(() => {
                (<string[]>this.gameState.currentRoom.ambientSounds).forEach(sound => this.entity.sound.play(sound));
            })
        }           

        if (this.gameState.currentRoom.name === 'my room') {
            return this.app.fire(
                'gameController:textOutput',
                this.gameState.currentRoom.processInput(['look', 'around'], this.gameState).text
            );
        }

        this.app.fire(
            'gameController:textOutput',
            'Welcome Back!\n' + this.gameState.currentRoom.processInput(['look', 'around'], this.gameState).text
        ); 
    }

    update() {

    }

    onInput(text: string) {        
        // Parse string
        if (text === '')
            return;

        const parsedText = nlp(text).terms().data().map((term: any) => {
            return term.normal;
        });

        const output = this.gameState.currentRoom.processInput(parsedText, this.gameState);        

        if (output.moveTo) {
            const nextRoom = this.rooms.find(room => room.name === output.moveTo);
            if (!nextRoom)
                return this.app.fire('gameController:textOutput', 'No such room name');


            // Stop current room ambient sounds
            if (this.gameState.currentRoom.ambientSounds)
            this.gameState.currentRoom.ambientSounds.forEach(sound => this.entity.sound.stop(sound));
            
            // Change room
            this.gameState.currentRoom = nextRoom;

            // Play output sound (walking)
            if (output.sound) {
                waitForSeconds(0.5)
                .then(() => {
                    this.entity.sound.play(output.sound);
                    
                });            
            }

            // Play new room ambient sounds
            if (this.gameState.currentRoom.ambientSounds) {
                
                if(this.gameState.currentRoom.noMusic) {
                    this.entity.sound.pause('music');
                } else {
                    waitForSeconds(0.5)
                    .then(() => {
                        this.entity.sound.resume('music');
                    })
                    
                }
                
                waitForSeconds(0.5)
                .then(() => {
                    (<string[]>this.gameState.currentRoom.ambientSounds).forEach(sound => this.entity.sound.play(sound));
                })
            }          

            this.saveGame();
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

        if (output.restart) {
            return waitForSeconds(1)
            .then(() => {
                this.restart();
            })
        }

        if (output.sound) {
            waitForSeconds(0.5)
            .then(() => {
                this.entity.sound.play(output.sound);
            });            
        }
        this.saveGame();
    }

    saveGame() {
        const roomsJSON = JSON.stringify(this.rooms);
        const gameStateJSON = JSON.stringify(this.gameState);

        localStorage.setItem('rooms', roomsJSON);
        localStorage.setItem('gameState', gameStateJSON);
    }

    loadGame() {
        const roomsJSON = localStorage.getItem('rooms');
        const gameStateJSON = localStorage.getItem('gameState');

        this.rooms = rooms;
        this.gameState = {
            currentRoom: this.rooms[0],
            inventory: [],
            flags: {
                rangBellInSchool: false,
                readJournal: false
            }
        }            
        if (roomsJSON && gameStateJSON) {
            const deserializedRoomsJSON = JSON.parse(roomsJSON);
            const deserializedGameStateJSON = JSON.parse(gameStateJSON);
            for (const savedRoom of deserializedRoomsJSON) {
                let room = this.rooms.find(room => room.name === savedRoom.name) as Room;
                for (let i = 0; i < room.doors.length; i++) {
                    Object.assign(room.doors[i], savedRoom.doors[i]);
                }
                for (let i = 0; i < room.items.length; i++) {                    
                    for (let j = 0; j < room.items[i].items.length; j++) {
                        Object.assign(room.items[i].items[j], savedRoom.items[i].items[j]);
                        Object.assign(savedRoom.items[i].items[j], room.items[i].items[j]);
                    }
                    Object.assign(room.items[i], savedRoom.items[i]);
                }
                
            }
            const currentRoom = this.rooms.find(room => room.name === deserializedGameStateJSON.currentRoom.name) as Room;
            Object.assign(this.gameState, deserializedGameStateJSON);
            this.gameState.currentRoom = currentRoom;
            this.gameState.inventory = deserializedGameStateJSON.inventory.map((item: Item) => {
                for (const room of this.rooms) {
                    for (const roomItem of room.items) {
                        if (roomItem.name === item.name)
                        return roomItem;

                        for (const subItem of roomItem.items) {
                            if (subItem.name === item.name)
                            return subItem
                        }
                    }
                }
            });
        }       
    }
    restart() {
        localStorage.clear();
        window.location.reload();
    }
}

export interface GameState {
    currentRoom: Room;
    inventory: Item[];
    flags: {
        rangBellInSchool: boolean;
        readJournal: boolean;

    }
}