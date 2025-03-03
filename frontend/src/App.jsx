import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/Header/Nav';
import Inventory from './components/Body/Inventory';
function App() {
 

  return (    
      <>
      <Inventory />
     </>
  )
}

export default App
