import React, { useState,useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
const App=(props)=> {
  const KEY="AIzaSyCULz8hPJshGbBVghHtjSxUOL27gWxVAMA"
  return (  
    <div>
    < SearchBar APIkey={KEY}/>
    </div>
  )
}

export default App;
