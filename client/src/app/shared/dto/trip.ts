export class Trip {
    id: string;
    name: string;
    description: string;
    stops: Stop[];
}

export class Stop {
    constructor() { addId(this); }
    id: string;
    name: string;
    description: string;
    images: Image[];
    coordinates: [number, number];
}
export class Image {
    constructor() { this.id = guid(); }
    id: string;
    name: string;
    description: string;
    base64: string;
    path: string;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
export function addId(stop: Stop): string {
    stop.id = guid();
    return stop.id;
}