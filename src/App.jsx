import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import ShowCreators from './pages/ShowCreators';
import ViewCreators from './pages/ViewCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreators';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/ViewCreators" element={<ViewCreators/>}></Route>
        <Route path="/AddCreator" element={<AddCreator/>}></Route>
        <Route path="/EditCreator" element={<EditCreator/>}></Route>
    </Routes>
  )
}

export default App
