export interface Bill {
    id: string;
    date: Date;
    total: number;
    sixtyPercent: number;
    fortyPercent: number;
    active: boolean;
    billItems: BillItem[]
}

export interface BillItem {
    id: string;
    title: string;
    value: number;
    active: boolean;
}
