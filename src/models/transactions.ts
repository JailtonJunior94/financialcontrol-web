export interface Transaction {
    id: string;
    date: Date;
    total: number;
    income: number;
    outcome: number;
    active: boolean;
    items: TransactionItem[]
}

export interface TransactionItem {
    id: string;
    title: string;
    value: number;
    type: string;
    isPaid?: boolean;
    active: boolean;
}
