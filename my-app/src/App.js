import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Table } from './components/table/table';
import { Create } from './components/create/create';
import { Update } from './components/update/update';
import { Student } from './components/student/student';

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Table />} />
            <Route path='/student/:id' element={<Student />} />
            <Route path='/create' element={<Create />} />
            <Route path='/update/:id' element={<Update />} />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
