import {books} from "./Books.js";
import Fade from "react-reveal/Fade";
import "./Archive.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import {ButtonAction} from "./Button.js"

export default function Archive(){

  const [aleph, setAleph] = useState(true);
  var bookslist = books.slice();

  return(
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <ButtonAction text="alphabetical/by date" width="15em" onClick={()=>{setAleph(!aleph)}}/>
      <Fade bottom>
      {
        (aleph? bookslist.sort((a,b)=>{return a.title>b.title}):books).map((book)=>(
          <div className="bookLink">
            <Link to={"/books/"+books.findIndex((a)=>{return a.title===book.title}) }>{book.title}</Link>
          </div>
        ))
      }
    </Fade>
    </div>
    )
}