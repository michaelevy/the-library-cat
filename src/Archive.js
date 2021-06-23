import {books} from "./Books.js";
import Fade from "react-reveal/Fade";
import "./Archive.css"
import { Link } from "react-router-dom";
export default function Archive(){

  return(
    <Fade bottom>
     { books.sort((a,b)=>(a.title>b.title))
      .map((book)=>(<div className="bookLink"><Link to={"/books/"+books.findIndex((a)=>{return a.title===book.title}) }>{book.title}</Link></div>))}
    </Fade>
    )
}