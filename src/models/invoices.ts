import { Card } from "./cards";

export interface Invoice {
    id: string;
    cardId: string;
    date: Date;
    total: number;
    card: Card
    invoiceItems: InvoiceItem[]
}

export interface InvoiceItem {
    id: string;
    invoiceControl: number;
    purchaseDate: Date;
    description: string;
    totalAmount: number;
    installment: number;
    installmentValue: number;
    tags: string;
    category: Category
}

export interface Category {
    id: string;
    name: string;
    active: boolean;
}
