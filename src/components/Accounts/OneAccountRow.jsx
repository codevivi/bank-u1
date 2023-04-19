import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import formatCurrency from "../../utils/formatCurrency";

export default function OneAccountRow({ account, setUpdateAccount, setDeleteAccountId, addMsg }) {
  const [newAmount, setNewAmount] = useState(null);

  const changeAmount = (value) => {
    if (value) {
      if (Number(value) > 1000000000000) {
        setNewAmount((1000000000000).toString());
        return;
      }
      setNewAmount(value);
      return;
    }
    setNewAmount(null);
  };

  const addMoneyToAccount = () => {
    if (newAmount !== null) {
      setUpdateAccount({ ...account, money: account.money + Number(newAmount) });
      addMsg({ type: "success", text: `${formatCurrency(newAmount)} pridėta į sąskaitą (${account.name} ${account.surname}).` });
    }
    setNewAmount(null);
  };

  const subtractMoneyFromAccount = () => {
    if (newAmount !== null) {
      if (account.money - Number(newAmount) < 0) {
        addMsg({ type: "error", text: "Pervedimas nepavyko: saskaitoje neužtenka pinigų." });
        return;
      }
      setUpdateAccount({ ...account, money: account.money - Number(newAmount) });
      addMsg({ type: "success", text: `${formatCurrency(newAmount)} nuskaičiuota iš (${account.name} ${account.surname}).` });
    }

    setNewAmount(null);
  };

  const handleDelete = () => {
    if (account.money > 0) {
      addMsg({ type: "error", text: "Sąskaitos kurioje yra pinigų ištrinti negalima." });
      return;
    }
    setDeleteAccountId(account.id);
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
        {formatCurrency(Number(account.money))}
      </td>
      <td className="td-actions">
        <CurrencyInput
          id="amount"
          placeholder="Įveskite sumą"
          suffix=" &euro;"
          decimalsLimit={2}
          decimalSeparator="."
          decimalScale={2}
          allowDecimals={true}
          name="amount"
          allowNegativeValue={false}
          groupSeparator=","
          value={newAmount || ""}
          onValueChange={(value) => changeAmount(value)}></CurrencyInput>
        <div className="control-box">
          <button className="green" onClick={addMoneyToAccount}>
            {!newAmount && <span className="inline-msg">Įrašykite sumą</span>}
            pridėti lėšų
          </button>
        </div>
        <div className="control-box">
          <button className={`orange ${account.money < newAmount ? "disabled" : null}`} onClick={subtractMoneyFromAccount}>
            {!newAmount && <span className="inline-msg">Įrašykite sumą</span>}
            {account.money < newAmount && <span className="inline-msg">Negalima nuskaičiuoti daugiau nei yra sąskaitoje.</span>}
            nuskaičiuoti lėšas
          </button>
        </div>
        <div className="control-box">
          <button className={`red ${account.money > 0 ? "disabled" : null}`} onClick={handleDelete}>
            {account.money > 0 && <span className="inline-msg">Negalima ištrinti sąskaitos kurioje yra pinigų.</span>}
            ištrinti
          </button>
        </div>
      </td>
    </tr>
  );
}
