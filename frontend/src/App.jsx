import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateBook from './pages/CreateBook';
import DeleteBook from './pages/DeleteBook';
import EditBook from './pages/EditBook';
import Home from './pages/Home';
import ShowBook from './pages/ShowBook';
function App(props) {
  return (

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/books/edit/:id' element={<EditBook/>}/>
        <Route path='/books/delete/:id' element={<DeleteBook/>}/>
        <Route path='/books/details/:id' element={<ShowBook/>}/>
        <Route path='/books/create' element={<CreateBook/>}/>
      </Routes>

  );
}

export default App;