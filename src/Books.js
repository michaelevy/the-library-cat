import Fade from "react-reveal/Fade";
import "./Books.css";
import React from "react"
import { useCallback } from "react";
import wayfarers from "./wayfarers.jpg"
import kingkiller from "./kingkiller.jpg"
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { ButtonAction } from "./Button.js";
import { useLocation } from "react-router-dom";


/**
 * Page to display and navigate my book reviews
 */
export default function Books() {
  const history = useHistory();

  let location = useLocation().pathname.split("/")[2];
  const [index, setIndex] = useState(location.length>0?location:0);
  const [book, setBook] = useState(books[index]);

  /**
   * Set the current book to the book with the given title
   * @param title title of the book
   */
  const getBook = useCallback((title) => {
    setIndex(books.findIndex((book)=>(book.title===title)));
  },[]);

  /**
   * Sets the current book to the next in the list
   */
  const nextBook = () => {
    let temp = (index === books.length - 1 ? index : parseInt(index) + 1);
    setIndex(temp);
  };

  /**
   * Sets the current book to the previous in the list
   */
  const prevBook = () => {
    let temp = (index <= 0 ? index : index  - 1);
    setIndex(temp);
  };

  useEffect(()=>{
    setBook(books[index]);
    history.replace({pathname: index})
  },[index, history]) 

  return (
    <div className="column">
      <div className="row">
        <ButtonAction width="8.3em" text="|< First |<" onClick={()=>{setBook(books[0]);setIndex(0)}} />
        <ButtonAction text="< Previous <" onClick={prevBook} />
        <Dropdown func={getBook} title={book.title}/>
        <ButtonAction text="> Next >" onClick={nextBook} />
        <ButtonAction width="8.3em" text=">| Last >|" onClick={()=>{setBook(books[books.length-1]);setIndex(books.length-1)}} />
      </div>
      <Fade bottom>
      <DisplayBook book={book ? book : books[0]} />
      </Fade>
    </div>
  );
}

/**
 * Displays a book review.
 * @param book a book object as defined in the books array
 * @see books
 */
function DisplayBook(props) {
  return (
    <div className="book">
      <a style={{paddingRight:"2%"}} href={props.book.href}>
        <img
          src={props.book.src}
          alt={props.book.alt}
          style={{ maxHeight: "100%",maxWidth:"300px", alignSelf:"left" }}
        />
      </a>
      <div style={{backgroundColor: "inherit",  flexBasis:"50%", flexGrow:1}}>
        <p className="header">{props.book.title}</p>
        <p style={{ fontWeight: 8}}>{props.book.review}</p>
        <p className="quote">{'"' + props.book.quote + '"'}</p>
        <p className="rating">{props.book.rating}/5</p>
      </div>
    </div>
  );
}

/**
 * Creates a dropdown
 * @param func the function that will be called when an option is selected
 * @param initial initial selected value of the dropdown
 */
function Dropdown({title, func}){
  const [state, setState] = useState(title)

  const handleChange = (event) => {
    setState(event.target.value)
  }

  useEffect(()=>{
    func(state)
  },[state,func])

  return (
    <form>
        <select value={state.value} onChange={handleChange}>            
        {books.map((book)=>(
          <option value={book.title} label={book.title}></option>
        ))}
        </select>
    </form>
  )
}

/**
 * List of all book reviews
 */
export const books = [
  {
    title: "A Memory Called Empire",
    href: "https://www.goodreads.com/book/show/37794149-a-memory-called-empire",
    src: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1526486594l/39863238.jpg",
    alt: "The front cover of A Memory Called Empire, which is a beautiful and aw-inspiring depiction of the main character standing in front of the sun throne - futuristic and blocky with a spiked semicircle reminiscent of the sun behind it. The largest spikes would be at least ten meters. It's representative of the ideals of Teixcalaan, imposing, artistic, luxurious.",
    review:
      "A beautiful exploration of an intoxicating foreign culture. Teixcalaan is a fabulously romantic sci-fi setting, with influences from Byzantium to Mesoamerica. Literature and politics are often one and the same, and the society is full of tantalising allusions and literary references which both the main character and the reader can just barely follow along. While the book is sci-fi, the emphasis is placed not on technology or spaceships. The focus is on language, translation, and cultural exchange. Martine carefully describes every social interaction, as the main character tries to work through their culture shock and struggles not to become enthralled in the powerfully enticing Empire. Set in this luscious landscape is a gripping political drama, with sharply intelligent characters to take you along for the ride.",
    quote:
      "Perhaps succor was enough to keep a whole population trapped, willingly.",
    rating: "5",
    date: "22/06/21",
  },
  {
    title: "Wayfarers",
    href: "https://www.goodreads.com/series/170872-wayfarers",
    src: wayfarers,
    alt: "The cover of each book in the Wayfarers series. They picture a small silhoutted figure (or figures) at the bottom on silhouetted terrain. They're looking up at a nighttime galaxy awash with colour. The figures look lonely, or possibly contemplative, but the sky looks beautiful.",
    review:
      "The Wayfarers series by Becky Chambers is a story that is heart-warming but not lacking in complexity. Every character is indescribably human (even when they're an alien), and the societies and communities described are unique, deep, and usually incredibly wholesome. The socialist community spirit found in the Exodan Fleet especially won my heart. The stories are on the whole mild, thoughtful, but their social commentaries and explorations of the human (and alien) experience are no less powerful for it. The focus is heavily on the characters, driven by their cultures and personalities. There is very little action, preferring to look at interpersonal and everyday problems. The term 'comfort sci-fi' has never been quite so applicable. ",
    quote: "I can wait for the galaxy outside to get a little kinder.",
    rating: "4.5",
    date: "22/06/21",
  },
  {
    title: "The Kingkiller Chronicles",
    href: "https://www.goodreads.com/series/45262-the-kingkiller-chronicle",
    src: kingkiller,
    alt: "I merged the two book covers together and it looks horrible. I don't want to describe it.",
    review:
      "The Kingkiller Chronicles are popularly known for both their fantastic prose, and how it's been ten thousand years and we still don't have the third book. Your opinion on Rothfuss's writing speed notwithstanding, he has an undeniable talent for poetic writing and the ability to craft a world that feels both unknowable and fully realised. It follows the main character from their childhood onwards, from their desperate struggle against poverty to increasingly fantastical shenanigans. Rothfuss is a perfectionist, which is very apparent when reading - everything feels very intentional, the descriptions and foreshadowing are perfectly placed. It's entirely based around the character of Kvothe, so if you don't like his arrogant, flamboyant approach to life, the series may be hard for you. The second book is not nearly as good, with a lack of direction and... that sex demon bit. Yeah. No.",
    quote: "Words can light fires in the minds of men. Words can wring tears from the hardest hearts.",
    rating: "4",
    date: "24/06/21",
  },
];

