import './App.css';
import CardGallery from './components/CardGallery';
import SearchBar from './components/SearchBar';

function App() {

  return (
    <div className="App">
      <header className="App-header">Card App</header>
      <div className='container'>
        <SearchBar/>
        <CardGallery/>
      </div>
    </div>
  );
}

export default App;
