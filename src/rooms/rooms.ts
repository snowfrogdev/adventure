import { Room } from "../room";
import { CenterRoom } from "./center-room";
import { NorthRoom } from "./north-room";

const roomConstructors = [
    CenterRoom, NorthRoom
]

function roomFactory(roomCtrs: Array<new () => Room>) {
    return roomCtrs.map(roomConst => new roomConst());
}

export const rooms = roomFactory(roomConstructors);
