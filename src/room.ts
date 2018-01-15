export class Room {
    public roomName: string;
    private data: TermNode[];

    constructor(roomData: RoomData) {
        this.roomName = roomData.roomName;
        this.data = roomData.data;
    }

    processInput(terms: string[], nodes: TermNode[] = this.data): Output {
        let output: Output = {
            text: '',
            moveTo: ''
        }

        for(const term of terms) {            
            const node = nodes.find(termNode => {
                return termNode.values.includes(term);
            });
            if (node) {
                if (node.text) {
                    output.text = node.text;
                    return output;
                }                    
                if (node.moveTo){
                    output.moveTo = node.moveTo;
                    return output
                }
                if (node.next) {
                    return this.processInput(terms, node.next);
                }
            }
        }

        output.text = 'Sorry, I do not understand.';
        return output;

        
        /*
        let output: Output = {
            text: '',
            moveTo: ''
        }

        for(const term of terms) {
            console.log({outerTerm: term})
            const node = this.data.find(termNode => {
                return termNode.values.includes(term);
            });
            console.log({node});
            if (node) {
                if (node.text) {
                    output.text = node.text;
                    return output;
                }                    
                if (node.moveTo){
                    output.moveTo = node.moveTo;
                    return output
                }
                if (node.next) {
                    for (const term1 of terms) {
                        console.log({innerTerm:term1})
                        const nextNode = node.next.find(termNode => {
                            return termNode.values.includes(term1);
                        });
                        console.log({nextNode});
                        if (nextNode) {                            
                            if (nextNode.text) {
                                output.text = nextNode.text;
                                return output;
                            }                    
                            if (nextNode.moveTo) {
                                output.moveTo = nextNode.moveTo;
                                return output
                            }                            
                        }
                    }
                }

            }
        }
        output.text = 'Sorry, I do not understand.';
        return output;
        */       
    }

    get arrive() {
        const node = this.data.find(node => {
            return node.values.includes('arrive')
        })
        if (!node) {
            return 'Oops, looks like we are missing a description for this room'
        }
        return node.text;
    }
}

interface Output {
    text: string;
    moveTo: string;
}

interface RoomData {
    roomName: string;
    data: TermNode[];
}

export class TermNode {
    constructor(
        public values: string[], 
        public next?: TermNode[], 
        public text?: string,
        public moveTo?: string
    ) { }    
}



