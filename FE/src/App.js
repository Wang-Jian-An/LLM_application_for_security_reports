import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import ShowReport from "./Report";
import {React, useState} from 'react';
import GlobalContext from './GlobalContext';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [globalVariable, setGlobalVariable] = useState(null);
  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis_report" element={
              <ShowReport pred_data={globalVariable}/>
            } />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </GlobalContext.Provider>
  );

}

export default App;
