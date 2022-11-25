import React, { useState } from 'react';
// import "./CountButton.css"
const ChoosenBook=(props)=> {
  return (
<div>
      <h3>Title:{props.book.volumeInfo.title}</h3> 
      <h3>Autor:{props.book.volumeInfo.authors && props.book.volumeInfo.authors[0]}</h3>
      <h3>Category:{props.book.volumeInfo.categories && props.book.volumeInfo.categories[0]}</h3>
      <button>add to favorites</button>
      </div>
  )
}

export default ChoosenBook;
