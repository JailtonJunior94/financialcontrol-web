export interface Card {
    id: string;
    name: string;
    number: string;
    description: string;
    closingDay: number;
    expirationDate: Date;
    active: string;
    flag: Flag
}

export interface Flag {
    id: string;
    name: string;
    active: boolean;
}
