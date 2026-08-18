import SettingsForm from './components/SettingsForm';
import './styles/app.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <span className="app-logo">FlyRank</span>
          <nav className="app-nav" aria-label="Main">
            <a href="#" className="app-nav__link">Dashboard</a>
            <a href="#" className="app-nav__link app-nav__link--active" aria-current="page">
              Settings
            </a>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <SettingsForm />
      </main>
    </div>
  );
}

export default App;
