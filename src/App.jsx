import Accounts from "./components/Accounts/Accaunts";
import Header from "./components/Parts/Header";
import Footer from "./components/Parts/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container main">
        <Accounts />
      </main>
      <Footer />
    </div>
  );
}

export default App;
