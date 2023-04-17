import { useEffect, useState } from "react";
import AddAccount from "./AddAccount";
import { v4 as uniqId } from "uuid";
import OneAccountRow from "./OneAccountRow";
import formatCurrency from "../../utils/formatCurrency";

export default function Accounts({ addMsg }) {
  const [accounts, setAccounts] = useState(null);
  const [radioFilter, setRadioFilter] = useState(null);

  const handleFilterClick = (filter) => {
    if (radioFilter === filter || filter === null) {
      setRadioFilter(null);
      return;
    }
    setRadioFilter(filter);
  };

  useEffect(() => {
    let dbAccounts = localStorage.getItem("accounts");
    if (dbAccounts !== null) {
      setAccounts(JSON.parse(dbAccounts));
    } else {
      setAccounts([]);
    }
  }, []);

  useEffect(() => {
    if (accounts === null) {
      return;
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  const addAccount = ({ name, surname }) => {
    setAccounts((accounts) => {
      return [...accounts, { id: uniqId(), name, surname, money: 0 }];
    });
  };

  const deleteAccount = (id) => {
    setAccounts((accounts) => [...accounts].filter((account) => account.id !== id));
  };

  if (accounts === null) {
    return null;
  }
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
      <div className="filters">
        <p>Rodyti sąskaitas </p>
        <button className={"checkbox " + (radioFilter === null ? "checked" : "")} onClick={() => handleFilterClick(null)}>
          Visas
        </button>
        <button className={"checkbox " + (radioFilter === "with-money" ? "checked" : "")} onClick={() => handleFilterClick("with-money")}>
          Kuriose yra pinigų
        </button>
        <button className={"checkbox " + (radioFilter === "no-money" ? "checked" : "")} onClick={() => handleFilterClick("no-money")}>
          Tuščias
        </button>
      </div>
      {accounts.length > 0 && (
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Pavardė</th>
              <th>Vardas</th>
              <th>Sąskaitos suma</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {radioFilter === "with-money" &&
              [...accounts].sort((a, b) => a.surname.localeCompare(b.surname, "lt", { sensitivity: "base" })).map((account) => account.money > 0 && <OneAccountRow key={account.id} account={account} deleteAccount={deleteAccount} setAccounts={setAccounts} addMsg={addMsg} />)}
            {radioFilter === "no-money" &&
              [...accounts].sort((a, b) => a.surname.localeCompare(b.surname, "lt", { sensitivity: "base" })).map((account) => account.money === 0 && <OneAccountRow key={account.id} account={account} deleteAccount={deleteAccount} setAccounts={setAccounts} addMsg={addMsg} />)}
            {radioFilter === null && [...accounts].sort((a, b) => a.surname.localeCompare(b.surname, "lt", { sensitivity: "base" })).map((account) => <OneAccountRow key={account.id} account={account} deleteAccount={deleteAccount} setAccounts={setAccounts} addMsg={addMsg} />)}
          </tbody>
        </table>
      )}
      <AddAccount addAccount={addAccount} addMsg={addMsg} />
    </section>
  );
}
