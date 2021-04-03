import IntlCurrencyInput from 'react-intl-currency-input';

interface CurrencyInputProps {
    value: number;
    handleCurrencyChange: (event: React.ChangeEvent<HTMLInputElement>, value: number, maskedValue: string) => void;
}

const currencyConfig = {
    locale: "pt-BR",
    formats: {
        number: {
            BRL: {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        },
    },
};

export function CurrencyInput({ value, handleCurrencyChange }: CurrencyInputProps) {
    return (
        <IntlCurrencyInput
            currency="BRL"
            config={currencyConfig}
            className="form-control"
            value={value ?? 0}
            onChange={handleCurrencyChange}
        />
    )
}
