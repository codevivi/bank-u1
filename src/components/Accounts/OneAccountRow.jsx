import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import formatCurrency from "../../utils/formatCurrency";

export default function OneAccountRow({ account, setAccounts, deleteAccount, addMsg }) {
  const [newAmount, setNewAmount] = useState(null);

  const changeAmount = (value) => {
    if (value) {
      if (Number(value) > 1000000000000) {
        setNewAmount((1000000000000).toString());
        addMsg({ type: "error", text: "Maksimali suma kurią galite pridėti vienu metu - 1 trilijonas." });
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
      addMsg({ type: "success", text: "Lėšos sėkmingai pridėtos." });
    }
    setNewAmount(null);
  };

  const subtractMoneyFromAccount = () => {
    if (newAmount !== null) {
      if (account.money - Number(newAmount) < 0) {
        addMsg({ type: "error", text: "Pervedimas nepavyko: saskaitoje neužtenka pinigų." });
        return;
      }
      setAccounts((accounts) => {
        return accounts.map((item) => (item.id === account.id ? { ...item, money: item.money - Number(newAmount) } : item));
      });
      addMsg({ type: "success", text: "Lėšos sėkmingai nuskaičiuotos." });
    }

    setNewAmount(null);
  };

  const handleDelete = () => {
    if (account.money > 0) {
      addMsg({ type: "error", text: "Sąskaitos kurioje yra pinigų ištrinti negalima." });
      return;
    }
    deleteAccount(account.id);
    addMsg({ type: "success", text: `Kliento (${account.surname} ${account.name}) sąskaita sėkmingai panaikinta.` });
  };
  return (
    <tr>
      <td>
        <span className="mobile-header">Pavardė: </span>
        {account.surname}
      </td>
      <td>
        <span className="mobile-header">Vardas: </span>
        {account.name}
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
        <button className={`orange ${account.money < newAmount ? "disabled" : null}`} onClick={subtractMoneyFromAccount}>
          nuskaičiuoti lėšas
        </button>

        <button className={`red ${account.money > 0 ? "disabled" : null}`} onClick={handleDelete}>
          ištrinti
        </button>
      </td>
    </tr>
  );
}
