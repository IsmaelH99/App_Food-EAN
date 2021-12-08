import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from './components/NavBar';
import StockFiltrInput from './components/StockFiltrInput';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <main>
        <section className = "container">
          <section className = "row">
            <section className = "col-md-8">
              <h1 className = "mt-3">Saisir le numéro de code barre</h1>
              <hr />
            </section>
            <section className = "col-md-8">
              <StockFiltrInput />
            </section>
          </section>
        </section>
      </main>

    </div>
  );
}

export default App;
