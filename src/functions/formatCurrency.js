import { formatValue } from "react-currency-input-field";
export default function formatCurrency(number) {
  return formatValue({
    value: number.toString(),
    groupSeparator: ",",
    decimalSeparator: ".",
    intlConfig: { currency: "EUR", locale: "lt" },
  });
}
