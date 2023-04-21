import formatCurrency from "../../utils/formatCurrency";
function Stats({ accounts }) {
  const totalMoneyInAllAccounts = formatCurrency(accounts.reduce((acc, curr) => acc + curr.money, 0));

  return (
    <div className={`info  + ${accounts.length > 0 ? "left" : ""}`}>
      <p>
        <span className="info-header">Klientų skaičius: </span>
        <span className="info-stat">{accounts.length}</span>
      </p>
      <p>
        <span className="info-header">Bendra laikoma suma: </span>
        <span className="info-stat">{totalMoneyInAllAccounts}</span>
      </p>
    </div>
  );
}

export default Stats;
