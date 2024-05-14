import { Routes,Route } from 'react-router';
import Home from './components/Home';
import StudentListView from './components/StudentListView';
import PageNotFound from './components/PageNotFound';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path="/addStudent" element={<Home />} />
        <Route path="/editStudent" element={<Home />} />
        <Route path="/studentListView" element={<StudentListView />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
