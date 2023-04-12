import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import AddAccount from "./AddAccount";
import { v4 as uniqId } from "uuid";

export default function Accaunts() {
  const [accounts, setAccounts] = useState([]);

  function addAccount({ name, surname }) {
    // e.preventDefault();
    console.log(name, surname);
    setAccounts((accounts) => {
      return [...accounts, { id: uniqId(), name, surname, money: 0 }];
    });
    // let formData = Object.fromEntries(new FormData());
  }

  return (
    <>
      <h1>Sąskaitos</h1>
      <table className="table-saskaitos">
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Sąskaitos suma</th>
            <th>Pervedimai</th>
            <th>Pašalinti sąskaitą</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{account.surname}</td>
              <td>{account.money}</td>
              <td className="td-buttons">
                <button className="green">pridėti lėšų</button>
                <CurrencyInput id="amount" name="amount" placeholder="Įveskite sumą" suffix=" &euro;" decimalsLimit={2} onValueChange={(value, name) => console.log(value, name)} />
                <button className="orange">nuskaičiuoti lėšas</button>
              </td>
              <td>
                <button className="red">ištrinti</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddAccount addAccount={addAccount} />
    </>
  );
}
