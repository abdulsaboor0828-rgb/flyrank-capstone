import SettingsForm from './components/SettingsForm';
import './styles/app.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <span className="app-logo">FlyRank</span>
        </div>
      </header>

      <main className="app-main">
        <SettingsForm />
      </main>
    </div>
  );
}

export default App;
