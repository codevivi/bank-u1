import { useEffect, useState } from "react";
import AddAccount from "./AddAccount";
import OneAccountRow from "./OneAccountRow";
import Filter from "./Filter";
import formatCurrency from "../../utils/formatCurrency";
import { dbAdd, dbDeleteById, dbGet, dbUpdate } from "../../db";

const DB_KEY = "accounts";

export default function Accounts({ addMsg }) {
  const [accounts, setAccounts] = useState(null);
  const [displayAccounts, setDisplayAccounts] = useState(accounts);
  const [filterFunc, setFilterFunc] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(null);

  const [newAccount, setNewAccount] = useState(null);
  const [deleteAccountId, setDeleteAccountId] = useState(null);
  const [updateAccount, setUpdateAccount] = useState(null);

  // get from db and use default sort by surname
  useEffect(() => {
    setAccounts(dbGet(DB_KEY).sort((a, b) => a.surname.localeCompare(b.surname, "lt", { sensitivity: "base" })));
  }, [lastUpdateTime]);

  // use filtered accounts for display if filter function set
  useEffect(() => {
    setDisplayAccounts(filterFunc !== null ? filterFunc(accounts) : accounts);
  }, [accounts, filterFunc]);

  // add account to db
  useEffect(() => {
    if (newAccount === null) {
      return;
    }
    dbAdd({ key: DB_KEY, data: newAccount });
    setLastUpdateTime(Date.now());
  }, [newAccount]);

  // delete account from db
  useEffect(() => {
    if (deleteAccountId === null) {
      return;
    }
    dbDeleteById({ key: DB_KEY, id: deleteAccountId });
    setLastUpdateTime(Date.now());
  }, [deleteAccountId]);

  // update account in db
  useEffect(() => {
    if (updateAccount === null) {
      return;
    }
    dbUpdate({ key: DB_KEY, data: updateAccount });
    setLastUpdateTime(Date.now());
  }, [updateAccount]);

  if (accounts === null || displayAccounts === null) {
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
          <Filter setFilterFunc={setFilterFunc} />

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
              {displayAccounts.map((account) => (
                <OneAccountRow key={account.id} account={account} setDeleteAccountId={setDeleteAccountId} setUpdateAccount={setUpdateAccount} addMsg={addMsg} />
              ))}
            </tbody>
          </table>
        </>
      )}
      <AddAccount setNewAccount={setNewAccount} addMsg={addMsg} />
    </section>
  );
}
