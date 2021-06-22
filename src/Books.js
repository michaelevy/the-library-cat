import "./Books.css";
import { useState } from "react";
import { ButtonAction } from "./Button.js";
export default function Books() {
  const [book, setBook] = useState(books[0]);

  const randomBook = () => {
    let index = Math.floor(Math.random() * 2);
    while (books[index].title === book.title) {
      index = Math.floor(Math.random() * 2);
    }
    setBook(books[index]);
  };

  return (
    <div className="container">
      <ButtonAction text="Random" onClick={randomBook} />
      <DisplayBook book={book} />
    </div>
  );
}

function DisplayBook(props) {
  return (
    <div className="book">
      <a href={props.book.href}>
        <img
          src={props.book.src + ".jpg"}
          alt={props.book.alt}
          style={{ maxHeight: 500, paddingRight: 10 }}
        />
      </a>
      <div>
        <p className="header">{props.book.title}</p>
        <p style={{ fontWeight: 8 }}>{props.book.review}</p>
        <p className="quote">{'"' + props.book.quote + '"'}</p>
        <p className="rating">{props.book.rating}/10</p>
      </div>
    </div>
  );
}

const books = [
  {
    title: "A Memory Called Empire",
    href: "https://www.goodreads.com/book/show/37794149-a-memory-called-empire",
    src: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1526486594l/39863238",
    alt: "The front cover of A Memory Called Empire, which is a beautiful and aw-inspiring depiction of the main character standing in front of the sun throne - futuristic and blocky with a spiked semicircle reminiscent of the sun behind it. The largest spikes would be at least ten meters. It's representative of the ideals of Teixcalaan, imposing, artistic, luxurious.",
    review:
      "A beautiful exploration of an intoxicating foreign culture. Teixcalaan is a fabulously romantic sci-fi setting, with influences from Byzantium to Mesoamerica. Literature and politics are often one and the same, and the society is full of tantalising allusions and literary references which both the main character and the reader can just barely follow along. While the book is sci-fi, the emphasis is placed not on technology or spaceships. The focus is on language, translation, and cultural exchange. Martine carefully describes every social interaction, as the main character tries to work through their culture shock and struggles not to become enthralled in the powerfully enticing Empire. Set in this luscious landscape is a gripping political drama, with sharply intelligent characters to take you along for the ride.",
    quote:
      "Perhaps succor was enough to keep a whole population trapped, willingly.",
    rating: "10",
  },
  {
    title: "Wayfarers",
    href: "https://www.goodreads.com/book/show/32802595-record-of-a-spaceborn-few",
    src: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1516965190l/32802595._SY475_",
    alt: "The cover of 'record of a spaceborn few' (lowercase intentional). It pictures a small silhoutted figure at the bottom on silhouetted terrain. They're looking up at a nighttime galaxy awash with colour. The figure looks lonely, or possibly contemplative, but the sky looks beautiful.",
    review:
      "The Wayfarers series by Becky Chambers is a story that is heart-warming but not lacking in complexity. Every character is indescribably human (even when they're an alien), and the societies and communities described are unique, deep, and usually incredibly wholesome. The socialist community spirit found in the Exodan Fleet especially won my heart. The stories are on the whole mild, thoughtful, but their social commentaries and explorations of the human (and alien) experience are no less powerful for it. The focus is heavily on the characters, driven by their cultures and personalities. There is very little action, preferring to look at interpersonal and everyday problems. The term 'comfort sci-fi' has never been quite so applicable. ",
    quote: "I can wait for the galaxy outside to get a little kinder.",
    rating: "9.5",
  },
];
