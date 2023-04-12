import { useState } from "react";
import AddAccount from "./AddAccount";
import { v4 as uniqId } from "uuid";
import OneAccountRow from "./OneAccountRow";
import formatCurrency from "../functions/formatCurrency";

export default function Accaunts() {
  const [accounts, setAccounts] = useState([]);
  const [errMsg, setErrMsg] = useState("");

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
      <p className="error-msg">{errMsg}</p>
      <table className="table-saskaitos">
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Sąskaitos suma</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <OneAccountRow key={account.id} account={account} setAccounts={setAccounts} setErrMsg={setErrMsg} />
          ))}
        </tbody>
      </table>
      <AddAccount addAccount={addAccount} />
    </>
  );
}
