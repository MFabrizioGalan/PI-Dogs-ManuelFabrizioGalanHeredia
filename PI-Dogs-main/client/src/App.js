import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Landing, Home, Form, Detail } from './views';

import { Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path ="/" component={Landing} />
      <Route exact path ="/home" component={Home} />
      <Route exact path ="/dogs/:id" component={Detail} />
      <Route exact path ="/create" component={Form} />
      <Route exact path ="/create/:id" component={Form} />
    </div>
  );
}

export default App;
