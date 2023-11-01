
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './Pages/HomePage';
import About from './components/About';
import Alert from './components/Alert';


function App() {

  console.log(process.env)

  return (
   <Router>
    <div>
      <Header/>
      <Routes>
      <Route  path="/" Component={HomePage} exact></Route>
      <Route path="/about" Component={About} exact></Route>
      </Routes>
    </div>
    <Alert/>
   </Router>
  );
}

export default App;

