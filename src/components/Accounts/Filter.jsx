import { useEffect, useState } from "react";

function Filter({ setFilterFunc }) {
  const [radioFilter, setRadioFilter] = useState(null);

  const filterWithMoney = (displayAccounts) => displayAccounts.filter((displayAccounts) => displayAccounts.money > 0);
  const filterNoMoney = (displayAccounts) => displayAccounts.filter((displayAccounts) => !displayAccounts.money);
  const noFilter = null;

  useEffect(() => {
    switch (radioFilter) {
      case "with-money":
        setFilterFunc(() => filterWithMoney);
        break;
      case "no-money":
        setFilterFunc(() => filterNoMoney);
        break;
      default:
        setFilterFunc(() => noFilter);
    }
  }, [radioFilter, setFilterFunc]);

  const handleFilterClick = (filter) => {
    if (radioFilter === filter || filter === null) {
      setRadioFilter(null);
      return;
    }
    setRadioFilter(filter);
  };

  return (
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
  );
}

export default Filter;
