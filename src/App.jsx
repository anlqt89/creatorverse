import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import ShowCreators from './pages/ShowCreators';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ViewCreator from './pages/ViewCreator';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/AddCreator" element={<AddCreator/>}></Route>
        <Route path="/EditCreator" element={<EditCreator/>}></Route>
        <Route path="/viewCreator/:id" element={<ViewCreator />} />
    </Routes>
  )
}

export default App
