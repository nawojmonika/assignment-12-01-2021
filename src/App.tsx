import './App.css';
import SearchBar from "./components/search-bar/search-bar";
import {useState} from "react";
import CompanyList from "./components/company-list/companyList";

function App() {
    const [searched, setSearched] = useState('');

  return (
    <div className="App">
      <SearchBar searched={searched} setSearched={setSearched}/>
      <CompanyList searched={searched}/>
    </div>
  );
}

export default App;
