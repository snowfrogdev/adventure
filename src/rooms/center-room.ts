import { TermNode, Room } from "../room";

const arriveTerm = new TermNode(['arrive']);
arriveTerm.text = 'You are in the Center room. You can go North, East, South or West';

const northTerm = new TermNode(['north']);
northTerm.moveTo = 'northRoom';

const eastTerm = new TermNode(['east']);
eastTerm.moveTo = 'eastRoom'; //TODO change to east room

const walkTerm = new TermNode(['walk', 'go']);
walkTerm.next = [northTerm, eastTerm];

export const centerRoom = new Room({
    roomName: 'centerRoom',  
    data: [
        arriveTerm, walkTerm
    ]
});