import "./App.scss";
import Accounts from "./components/Accaunts";
import logo from "./assets/logo96.png";

function App() {
  return (
    <div className="App">
      <header className="page-header">
        <div className="container">
          <img className="logo" src={logo} alt="React bank logo" width={96} />
        </div>
      </header>
      <div className="container">
        <Accounts />
      </div>
    </div>
  );
}

export default App;
