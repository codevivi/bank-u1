import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import formatCurrency from "../functions/formatCurrency";

export default function OneAccountRow({ account, setAccounts }) {
  const [newAmount, setNewAmount] = useState("");

  const changeAmount = (value) => {
    console.log(value);
    if (value) {
      console.log(value);
      setNewAmount(value);
      return;
    }
    setNewAmount("");
  };

  const addMoneyToAccount = () => {
    if (newAmount !== "") {
      setAccounts((accounts) => {
        return accounts.map((item) => (item.id === account.id ? { ...item, money: item.money + newAmount } : item));
      });
      setNewAmount("");
    }
  };

  return (
    <tr>
      <td>{account.name}</td>
      <td>{account.surname}</td>
      <td>{formatCurrency(account.money)}</td>
      <td className="td-buttons">
        <button className="green" onClick={addMoneyToAccount}>
          pridėti lėšų
        </button>
        <CurrencyInput id="amount" placeholder="Įveskite sumą" suffix=" &euro;" decimalsLimit={2} value={newAmount} onValueChange={(value) => changeAmount(Number(value))} />
        <button className="orange">nuskaičiuoti lėšas</button>
      </td>
      <td>
        <button className="red">ištrinti</button>
      </td>
    </tr>
  );
}
