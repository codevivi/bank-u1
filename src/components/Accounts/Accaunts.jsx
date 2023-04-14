import { useState } from "react";
import AddAccount from "./AddAccount";
import { v4 as uniqId } from "uuid";
import OneAccountRow from "./OneAccountRow";
import formatCurrency from "../../utils/formatCurrency";

export default function Accaunts({ addMsg }) {
  const [accounts, setAccounts] = useState([]);
  // const [errMsg, setErrMsg] = useState("");

  const addAccount = ({ name, surname }) => {
    setAccounts((accounts) => {
      return [...accounts, { id: uniqId(), name, surname, money: 0 }];
    });
  };

  return (
    <section className="accounts">
      <h1>Sąskaitos</h1>
      <div className={`info  + ${accounts?.length > 0 ? "left" : ""}`}>
        <p>
          <span className="info-header">Klientų skaičius: </span>
          <span className="info-stat">{accounts.length}</span>
        </p>
        <p>
          <span className="info-header">Bendra laikoma suma: </span>
          <span className="info-stat">{formatCurrency(accounts.reduce((acc, curr) => acc + curr.money, 0))}</span>
        </p>
      </div>
      {accounts.length > 0 && (
        <table className="accounts-table">
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
              <OneAccountRow key={account.id} account={account} setAccounts={setAccounts} addMsg={addMsg} />
            ))}
          </tbody>
        </table>
      )}
      <AddAccount addAccount={addAccount} />
    </section>
  );
}
