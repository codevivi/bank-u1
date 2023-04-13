import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import formatCurrency from "../../utils/formatCurrency";

export default function OneAccountRow({ account, setAccounts, setErrMsg }) {
  const [newAmount, setNewAmount] = useState(null);

  const changeAmount = (value) => {
    if (value) {
      console.log(value);
      if (Number(value) > 1000000000000) {
        setNewAmount((1000000000000).toString());
        setErrMsg("Maksimali suma kurią galite pridėti vienu metu - 1 trilijonas.");
        return;
      }
      setNewAmount(value);
      return;
    }
    setNewAmount(null);
  };

  const addMoneyToAccount = () => {
    if (newAmount !== null) {
      setAccounts((accounts) => {
        return accounts.map((item) => (item.id === account.id ? { ...item, money: item.money + Number(newAmount) } : item));
      });
    }
    setNewAmount(null);
  };

  const subtractMoneyFromAccount = () => {
    if (newAmount !== null) {
      if (account.money - Number(newAmount) < 0) {
        setErrMsg("Pervedimas nepavyko: saskaitoje neužtenka pinigų.");
        return;
      }
      setAccounts((accounts) => {
        return accounts.map((item) => (item.id === account.id ? { ...item, money: item.money - Number(newAmount) } : item));
      });
    }

    setNewAmount(null);
  };
  return (
    <tr>
      <td>
        <span className="mobile-header">Vardas: </span>
        {account.name}
      </td>
      <td>
        <span className="mobile-header">Pavardė: </span>
        {account.surname}
      </td>
      <td>
        <span className="mobile-header">Suma: </span>
        {formatCurrency(account.money)}
      </td>
      <td className="td-actions">
        <CurrencyInput id="amount" placeholder="Įveskite sumą" suffix=" &euro;" decimalsLimit={2} decimalSeparator="." decimalScale={2} allowDecimals={true} name="amount" allowNegativeValue={false} groupSeparator="," value={newAmount || ""} onValueChange={(value) => changeAmount(value)} />
        <button className="green" onClick={addMoneyToAccount}>
          pridėti lėšų
        </button>
        <button className="orange" onClick={subtractMoneyFromAccount}>
          nuskaičiuoti lėšas
        </button>
        <button className="red">ištrinti</button>
      </td>
    </tr>
  );
}
