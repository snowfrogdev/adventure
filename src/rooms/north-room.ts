import { TermNode, Room } from "../room";

const arriveTerm = new TermNode(['arrive']);
arriveTerm.text = 'You are in the North room. You can go East, South or West';

const southTerm = new TermNode(['south']);
southTerm.moveTo = 'centerRoom'; 

const walkTerm = new TermNode(['walk', 'go']);
walkTerm.next = [southTerm];

export const northRoom = new Room({
    roomName: 'northRoom',  
    data: [
        arriveTerm, walkTerm
    ]
});