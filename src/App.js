import Header from './components/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route ,Routes} from 'react-router-dom'
import CardsDetails from './components/CardsDetails';
import Cards from './components/Cards';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Cards/>}/>
          <Route path='/cart/:id' element={<CardsDetails/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
