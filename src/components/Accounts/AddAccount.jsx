import { useState } from "react";

export default function AddAccount({ addAccount }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  function handleNameChange(e) {
    let name = e.target.value.trimStart();
    setName(name);
  }
  function handleSurnameChange(e) {
    let surname = e.target.value.trimStart();
    setSurname(surname);
  }
  function handleForm(e) {
    e.preventDefault();

    setName((name) => name.trim());
    setSurname((surname) => surname.trim());

    if (name && surname) {
      addAccount({ name, surname });
      setName("");
      setSurname("");
      return;
    }
  }

  return (
    <div className="add-account">
      <h2>Sukurti naują sąskaitą</h2>
      <form onSubmit={handleForm} className="add-account-form">
        <div>
          <label htmlFor="name">Vardas</label>
          <input id="name" onChange={handleNameChange} required minLength={2} maxLength={20} name="name" value={name} type="text" />
        </div>
        <div>
          <label htmlFor="surname">Pavardė</label>
          <input id="surname" onChange={handleSurnameChange} required minLength={2} maxLength={30} name="surname" value={surname} type="text" />
        </div>
        <button>Sukurti</button>
      </form>
    </div>
  );
}
