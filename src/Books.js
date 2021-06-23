import Fade from "react-reveal/Fade";
import "./Books.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { ButtonAction } from "./Button.js";
import { useLocation } from "react-router-dom";

export default function Books() {
  const history = useHistory();
  const [index, setIndex] = useState(useLocation().pathname.split("/")[2]);
  const [book, setBook] = useState(books[index]);

  const randomBook = () => {
    let temp = index;
    while (temp === index) {
      temp = (Math.floor(Math.random() * books.length));
    }
    setIndex(temp);
  };

  const nextBook = () => {
    let temp = (index === books.length - 1 ? index : parseInt(index) + 1);
    setIndex(temp);
  };

  const prevBook = () => {
    let temp = (index <= 0 ? index : index  - 1);
    setIndex(temp);
  };

  useEffect(()=>{
    console.log(index);
    setBook(books[index]);
    history.replace({pathname: index})
  },[index, history]) 

  return (
    <div className="column">
      <div className="row">
        <ButtonAction text="|< First |<" onClick={()=>{setBook(books[0]);setIndex(0)}} />
        <ButtonAction text="< Previous <" onClick={prevBook} />
        <ButtonAction text="Random" onClick={randomBook} />
        <ButtonAction text="> Next >" onClick={nextBook} />
        <ButtonAction text=">| Last >|" onClick={()=>{setBook(books[books.length-1]);setIndex(books.length-1)}} />
      </div>
      <Fade bottom>
      <DisplayBook book={book ? book : books[0]} />
      </Fade>
    </div>
  );
}

function DisplayBook(props) {
  return (
    <div className="book">
      <a style={{paddingRight:"2%"}} href={props.book.href}>
        <img
          src={props.book.src + ".jpg"}
          alt={props.book.alt}
          style={{ maxHeight: "100%",maxWidth:"100%", alignSelf:"left" }}
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

export const books = [
  {
    title: "A Memory Called Empire",
    href: "https://www.goodreads.com/book/show/37794149-a-memory-called-empire",
    src: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1526486594l/39863238",
    alt: "The front cover of A Memory Called Empire, which is a beautiful and aw-inspiring depiction of the main character standing in front of the sun throne - futuristic and blocky with a spiked semicircle reminiscent of the sun behind it. The largest spikes would be at least ten meters. It's representative of the ideals of Teixcalaan, imposing, artistic, luxurious.",
    review:
      "A beautiful exploration of an intoxicating foreign culture. Teixcalaan is a fabulously romantic sci-fi setting, with influences from Byzantium to Mesoamerica. Literature and politics are often one and the same, and the society is full of tantalising allusions and literary references which both the main character and the reader can just barely follow along. While the book is sci-fi, the emphasis is placed not on technology or spaceships. The focus is on language, translation, and cultural exchange. Martine carefully describes every social interaction, as the main character tries to work through their culture shock and struggles not to become enthralled in the powerfully enticing Empire. Set in this luscious landscape is a gripping political drama, with sharply intelligent characters to take you along for the ride.",
    quote:
      "Perhaps succor was enough to keep a whole population trapped, willingly.",
    rating: "5",
  },
  {
    title: "Wayfarers",
    href: "https://www.goodreads.com/book/show/32802595-record-of-a-spaceborn-few",
    src: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1516965190l/32802595._SY475_",
    alt: "The cover of 'record of a spaceborn few' (lowercase intentional). It pictures a small silhoutted figure at the bottom on silhouetted terrain. They're looking up at a nighttime galaxy awash with colour. The figure looks lonely, or possibly contemplative, but the sky looks beautiful.",
    review:
      "The Wayfarers series by Becky Chambers is a story that is heart-warming but not lacking in complexity. Every character is indescribably human (even when they're an alien), and the societies and communities described are unique, deep, and usually incredibly wholesome. The socialist community spirit found in the Exodan Fleet especially won my heart. The stories are on the whole mild, thoughtful, but their social commentaries and explorations of the human (and alien) experience are no less powerful for it. The focus is heavily on the characters, driven by their cultures and personalities. There is very little action, preferring to look at interpersonal and everyday problems. The term 'comfort sci-fi' has never been quite so applicable. ",
    quote: "I can wait for the galaxy outside to get a little kinder.",
    rating: "4.5",
  },
];
