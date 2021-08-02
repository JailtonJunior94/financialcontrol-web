export function formatMoney(val: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(val);
}

export function formatDate(val: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(val))
}

export function formatDateA(val: Date): string {
    return new Intl.DateTimeFormat('pt-BR', { year: '2-digit', month: 'numeric' }).format(new Date(val))
}

export function monthName(val: Date): string {
    const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date(val))
    return `${monthName.charAt(0).toUpperCase()}${monthName.substring(1)}`;
}