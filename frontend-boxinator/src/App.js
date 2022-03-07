import logo from './logo.svg';
import './App.css';
import {
  Navigate,
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import HeaderComponent from './components/HeaderComponent';
import AddBoxComponent from './components/AddBoxComponent';
import BoxlistComponent from './components/BoxlistComponent';


function App() {
  return (
    <div>
      <HashRouter className="App">
        <HeaderComponent />
        <div className="mainContainer">
          <Routes>
            <Route exact path='/' element={<Navigate replace to="/addbox"/>}></Route>
            <Route path="/addbox" element={<AddBoxComponent />} />
            <Route path="/listbox" element={<BoxlistComponent />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
