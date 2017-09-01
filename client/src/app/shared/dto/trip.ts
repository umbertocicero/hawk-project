export class Trip {
    id: string;
    name: string;
    description: string;
    stops: Stop[];
}

export class Stop {
    id: string;
    name: string;
    description: string;
    images: [object];
    coordinates: [number,number];
}