import './css/App.css';

import { Routes, Route } from 'react-router-dom';

import Basket from './pages/Basket';
import Page404 from './pages/Page404';

import Header from './components/Header';
import Home from './components/Home';
import  Search  from './components/Search';

import TopCards from './components/TopCards';
import Top from './components/Top';

import Category from './components/Category';

function App() {
  return (
    <div>
      <Header />
          <Category />
            <Top />
              <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/category' element={ <Category /> } />
                <Route path='/search' element={ <Search /> } />
                <Route path='/mon-panier' element={ <Basket />} />
                <Route path='*' element={ <Page404 />} />
              </Routes>
    </div>
  );
}

export default App;
