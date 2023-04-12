import { useState } from "react";
import AddAccount from "./AddAccount";
import { v4 as uniqId } from "uuid";
import OneAccountRow from "./OneAccountRow";
import formatCurrency from "../functions/formatCurrency";

export default function Accaunts() {
  const [accounts, setAccounts] = useState([]);

  const addAccount = ({ name, surname }) => {
    setAccounts((accounts) => {
      return [...accounts, { id: uniqId(), name, surname, money: 0 }];
    });
  };

  return (
    <>
      <h1>Sąskaitos</h1>
      <p>Klientų skaičius: {accounts.length}</p>
      <p>Bendra laikoma suma: {formatCurrency(accounts.reduce((acc, curr) => acc + curr.money, 0))}</p>

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
            <OneAccountRow key={account.id} account={account} setAccounts={setAccounts} />
          ))}
        </tbody>
      </table>
      <AddAccount addAccount={addAccount} />
    </>
  );
}
