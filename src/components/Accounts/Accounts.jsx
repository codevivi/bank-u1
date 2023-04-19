import { useEffect, useState } from "react";
import AddAccount from "./AddAccount";
import OneAccountRow from "./OneAccountRow";
import formatCurrency from "../../utils/formatCurrency";
import { dbAdd, dbDeleteById, dbGet, dbUpdate } from "../../db";

const DB_KEY = "accounts";

export default function Accounts({ addMsg }) {
  const [accounts, setAccounts] = useState(null);

  const [newAccount, setNewAccount] = useState(null);
  const [deleteAccountId, setDeleteAccountId] = useState(null);
  const [updateAccount, setUpdateAccount] = useState(null);

  const [radioFilter, setRadioFilter] = useState(null);

  const handleFilterClick = (filter) => {
    if (radioFilter === filter || filter === null) {
      setRadioFilter(null);
      return;
    }
    setRadioFilter(filter);
  };

  useEffect(() => {
    setAccounts(dbGet(DB_KEY));
  }, []);

  useEffect(() => {
    if (newAccount) {
      dbAdd({ key: DB_KEY, data: newAccount });
      setAccounts(dbGet(DB_KEY));
      setNewAccount(null);
      return;
    }
    if (deleteAccountId) {
      dbDeleteById({ key: DB_KEY, id: deleteAccountId });
      setAccounts(dbGet(DB_KEY));
      setDeleteAccountId(null);
      return;
    }
    if (updateAccount) {
      dbUpdate({ key: DB_KEY, data: updateAccount });
      setAccounts(dbGet(DB_KEY));
      setUpdateAccount(null);
      return;
    }
  }, [newAccount, deleteAccountId, updateAccount]);

  if (accounts === null) {
    return (
      <section className="accounts">
        <h1 style={{ fontSize: "48px" }}>Loading...</h1>;
      </section>
    );
  }
  return (
    <section className="accounts">
      <h1>Sąskaitos</h1>
      <div className={`info  + ${accounts.length > 0 ? "left" : ""}`}>
        <p>
          <span className="info-header">Klientų skaičius: </span>
          <span className="info-stat">{accounts.length}</span>
        </p>
        <p>
          <span className="info-header">Bendra laikoma suma: </span>
          <span className="info-stat">{formatCurrency(accounts.reduce((acc, curr) => acc + curr.money, 0))}</span>
        </p>
      </div>
      {accounts?.length > 0 && (
        <>
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
                [...accounts].sort((a, b) => a.surname.localeCompare(b.surname, "lt", { sensitivity: "base" })).map((account) => account.money > 0 && <OneAccountRow key={account.id} account={account} setDeleteAccountId={setDeleteAccountId} setUpdateAccount={setUpdateAccount} addMsg={addMsg} />)}
              {radioFilter === "no-money" &&
                [...accounts].sort((a, b) => a.surname.localeCompare(b.surname, "lt", { sensitivity: "base" })).map((account) => account.money === 0 && <OneAccountRow key={account.id} account={account} setDeleteAccountId={setDeleteAccountId} setUpdateAccount={setUpdateAccount} addMsg={addMsg} />)}
              {radioFilter === null && [...accounts].sort((a, b) => a.surname.localeCompare(b.surname, "lt", { sensitivity: "base" })).map((account) => <OneAccountRow key={account.id} account={account} setDeleteAccountId={setDeleteAccountId} setUpdateAccount={setUpdateAccount} addMsg={addMsg} />)}
            </tbody>
          </table>
        </>
      )}
      <AddAccount setNewAccount={setNewAccount} addMsg={addMsg} />
    </section>
  );
}
