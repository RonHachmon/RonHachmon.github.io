import React, { useState } from 'react';
import "./SearchBar.css"
import ChoosenBook from '../ChoosenBook/choosenBook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const SearchBar=(props)=> {
  const GOOGLE_BOOKS_URL="https://www.googleapis.com/books/v1/volumes?"
  const MAX_FETCH_BOOKS=10

  const [searchValue,setSeachValue]=useState("")
  const [currentBook,setCurrentBook]=useState(null)
  const shouldDisplayClearButton=searchValue.length>0
  const [booksArray,setBooksArray]=useState([])
  const [currentIndex,setCurrentIndex]=useState(0)


  const handleInputChange=(event)=>{
    const searchInput=event.target.value
    setSeachValue(searchInput)
    if(searchInput.length>=3)
    {
      fetchBooks(searchInput,0)
      setCurrentIndex(MAX_FETCH_BOOKS)
    }

  }
  const handleClear=(event)=>{
    setSeachValue("")
    setCurrentBook(null)
    setBooksArray([])
  }

  const fetchBooks=(bookName,paginationIndex)=>{
    fetch(GOOGLE_BOOKS_URL+new URLSearchParams({
      q: bookName,
      startIndex:paginationIndex,
      maxResults:MAX_FETCH_BOOKS
    }))
            .then(res=>res.json())
            .then((resArray)=>
            {
              setBooksArray(resArray.items)
            })
  }

  const showBookInfo=(bookID)=>{
    booksArray.forEach((book)=>{
      if(book.id==bookID)
      {
        setCurrentBook(book)
      }
    })
  }

  const addBooks = ()=>
  {
    console.log(currentIndex)
    fetchBooks(searchValue,currentIndex)
    setCurrentIndex(currentIndex+MAX_FETCH_BOOKS)
    console.log(currentIndex)
  }
  return (
<div className="grid-container">
  <div className="book-list">
    <span>
        <input placeholder=' search book' type="text" className="input" value={searchValue} onChange={handleInputChange} />
        {shouldDisplayClearButton && <button  onClick={handleClear}>clear</button>}
        <ul>
            {booksArray.map((book)=>{
            return <div>
              <span> <li key={book.id} onClick={() => showBookInfo(book.id)}> {book.volumeInfo.title} <FontAwesomeIcon icon={faStar}  /></li> </span>
            </div>
            })}
        </ul>
        {booksArray.length!=0 && <button className='manage-button' onClick={addBooks}>show more</button>}
    </span>
  </div>
  <div className="choosen-book">
      {currentBook &&<span><h1>  choosen book</h1> <ChoosenBook book={currentBook}/> </span>}
  </div>
</div>
  )
      
}
export default SearchBar;
