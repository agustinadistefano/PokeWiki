import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NotFound } from './components/NotFound'
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Genero } from './components/Genero';
import { Tipos } from './components/Tipos'
import { ListPokemon } from './components/ListPokemon'
import { Pokemon } from './components/Pokemon'
import './style.css';

function App() {

  const [search, setSearch] = useState('');
  const navigate = useNavigate(); 

  let sendSearch = (value) => {
    setSearch(value);
  }

  useEffect(() => {
    if(search !== ''){
      navigate("/pokemon/" + search);
    }
  }, [search])


  return ( 
    <>
    <Header sendSearch={sendSearch}/>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<ListPokemon />} />
        <Route path='/pokemon/:id' element={<Pokemon />} />
        <Route path='/genero' element={<Genero />} />
        <Route path='/tipos' element={<Tipos />} />
      </Routes>
    <Footer/>
    </>
  )
}

export default App
