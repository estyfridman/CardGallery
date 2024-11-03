import './App.css';
import CardGallery from './components/CardGallery';
import SearchBar from './components/SearchBar';
import { React, useState } from "react";

function App() {
  const [searchText, setSearchText] = useState("");

  function searchHandler(text) {
    var lowerCase = text.toLowerCase();
    setSearchText(lowerCase);
  };
  
  return (
    <div className="App">
      <header className="App-header">Card App</header>
      <div className='container'>
        <SearchBar searchFunc={searchHandler}/>
        <CardGallery searchText={searchText}/>
      </div>
    </div>
  );
}

export default App;
