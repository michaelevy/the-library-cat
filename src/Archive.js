import {books} from "./Books.js";
import Fade from "./App.js";
import "./Archive.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import {SelectButton} from "./Button.js"

export default function Archive(){

  const [sortType, setSort] = useState(0);
  var bookslist = books.slice();

  const list = () => {
    if(sortType===0){
      return bookslist.sort((a,b)=>{return a.title>b.title})
    }else if(sortType===1){
      return books
    }else{
      return bookslist.sort((a,b)=>{return a.rating<b.rating})
    }
  }

  const color = (rating) => {
    let c = "rgb("+(200-rating*40)+","+rating*40+",0)"
    return c
  }

  return(
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <SelectButton buttons={[
        {name: "Alphabetical",onClick: ()=>{setSort(0)}, selected:sortType===0},
        {name: "Date",onClick: ()=>{setSort(1)},selected:sortType===1},
        {name: "Rating",onClick: ()=>{setSort(2)},selected:sortType===2}
      ]}/>
      {
        list().map((book)=>(
          <div className="bookLink">
            <Link to={"/books/"+books.findIndex((a)=>{return a.title===book.title}) }><p style={{margin:2, color:color(book.rating)}}>{book.title}</p></Link>
          </div>
        ))
      }
    </div>
    )
}
