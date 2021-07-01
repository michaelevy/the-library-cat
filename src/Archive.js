import { books } from "./Books.js";
import "./Archive.css";
import goodreads from "./goodreads.png";
import { useState } from "react";
import { SelectButton, CircleButton } from "./Button.js";

/**
 * Page that displays all reviews in a list
 */
export default function Archive() {
  const [sortType, setSort] = useState(0);
  var bookslist = books.slice();

  /**
   * The three sort methods
   */
  const list = () => {
    if (sortType === 0) {
      // alphabetical
      return bookslist.sort((a, b) => {
        return a.title > b.title;
      });
    } else if (sortType === 1) {
      // date
      return books;
    } else {
      // rating
      return bookslist.sort((a, b) => {
        return a.rating < b.rating;
      });
    }
  };

  /**
   * Display links greener for better ratings
   * @param rating
   * @return string representing css rgb value
   */
  const color = (rating) => {
    let c = "rgb(" + (200 - rating * 40) + "," + rating * 40 + ",0)";
    return c;
  };

  let buttons = [
    {
      name: "Alphabetical",
      onClick: () => {
        setSort(0);
      },
      selected: sortType === 0,
    },
    {
      name: "Date",
      onClick: () => {
        setSort(1);
      },
      selected: sortType === 1,
    },
    {
      name: "Rating",
      onClick: () => {
        setSort(2);
      },
      selected: sortType === 2,
    },
  ];
  return (
    <div className="column">
      <SelectButton buttons={buttons} />
      <div style={{ padding: 10 }} />
      {list().map((book) => (
        <div className="bookLink" key={book.title}>
          <a
            href={
              "/books/" +
              books.findIndex((a) => {
                return a.title === book.title;
              })
            }
          >
            <p style={{ margin: 2, color: color(book.rating) }}>{book.title}</p>
          </a>
        </div>
      ))}
      <div style={{ fontSize: 5, paddingTop: 50 }}>
        <CircleButton
          text="Goodreads"
          link="https://www.goodreads.com/user/show/70102892-michael"
          image={goodreads}
        />
      </div>
    </div>
  );
}
