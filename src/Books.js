import "./Books.css";
import React from "react";
import { Animate } from "./Animations.js";
import { useCallback } from "react";
import wayfarers from "./images/wayfarers.jpg";
import kingkiller from "./images/kingkiller.jpg";
import stormlight from "./images/stormlight.jpg";
import baru from "./images/monsterbaru.jpg";
import firstlaw from "./images/firstlaw.jpg";
import fifthseason from "./images/fifthseason.jpg";
import murderbot from "./images/murderbot.jpg";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { ButtonAction } from "./Button.js";
import { useLocation } from "react-router-dom";

/**
 * Page to display and navigate my book reviews
 */
export default function Books() {
  // redirect to first book if url is invalid
  const history = useHistory();
  let location = parseInt(useLocation().pathname.split("/")[2]);
  const [index, setIndex] = useState(
    location > 0 && location < books.length ? location : 0
  );

  const [book, setBook] = useState(books[index]);

  /**
   * Set the current book to the book with the given title
   * @param title title of the book
   */
  const getBook = useCallback((title) => {
    setIndex(books.findIndex((book) => book.title === title));
  }, []);

  /**
   * Sets the current book to the next in the list
   */
  const nextBook = () => {
    let temp = index === books.length - 1 ? index : parseInt(index) + 1;
    setIndex(temp);
  };

  /**
   * Sets the current book to the previous in the list
   */
  const prevBook = () => {
    let temp = index <= 0 ? index : index - 1;
    setIndex(temp);
  };

  useEffect(() => {
    setBook(books[index]);
    history.replace({ pathname: index });
  }, [index, history]);

  return (
    <div className="column">
      <div className="row">
        <ButtonAction
          width="8.3em"
          text="|< First |<"
          onClick={() => {
            setBook(books[0]);
            setIndex(0);
          }}
        />
        <ButtonAction text="< Previous <" onClick={prevBook} />
        <Dropdown key={book.title} func={getBook} title={book.title} />
        <ButtonAction text="> Next >" onClick={nextBook} />
        <ButtonAction
          width="8.3em"
          text=">| Last >|"
          onClick={() => {
            setBook(books[books.length - 1]);
            setIndex(books.length - 1);
          }}
        />
      </div>
      <DisplayBook book={book ? book : books[0]} />
    </div>
  );
}

/**
 * Displays a book review.
 * @param book a book object as defined in the books array
 * @see books
 */
function DisplayBook(props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={loaded ? {} : { display: "none" }}>
      <Animate
        name={props.book.title}
        component={
          <div className="book">
            <a style={{ paddingRight: "2%" }} href={props.book.href}>
              <img
                onLoad={() => setLoaded(true)}
                src={props.book.src}
                alt={props.book.alt}
                style={{
                  maxHeight: "100%",
                  maxWidth: "300px",
                  alignSelf: "left",
                }}
              />
            </a>
            <div
              style={{
                backgroundColor: "inherit",
                flexBasis: "50%",
                flexGrow: 1,
              }}
            >
              <p className="header">{props.book.title}</p>
              <p style={{ fontWeight: 8 }}>{props.book.review}</p>
              <p className="quote">{'"' + props.book.quote + '"'}</p>
              <p className="rating">{props.book.rating}/5</p>
            </div>
          </div>
        }
        initial={{
          opacity: 0,
          transition: "all 1s ease-out",
        }}
        final={{
          opacity: 1,
          transition: "all 1s ease-out",
        }}
      />
    </div>
  );
}

/**
 * Creates a dropdown
 * @param func the function that will be called when an option is selected
 * @param initial initial selected value of the dropdown
 */
function Dropdown({ title, func }) {
  const [state, setState] = useState(title);

  const handleChange = (event) => {
    setState(event.target.value);
  };

  useEffect(() => {
    func(state);
  }, [state, func]);

  return (
    <form>
      <select value={title} onChange={handleChange}>
        {books.map((book) => (
          <option
            value={book.title}
            label={book.title}
            key={book.title}
          ></option>
        ))}
      </select>
    </form>
  );
}

/**
 * List of all book reviews
 */
export const books = [
  {
    title: "Teixcalaan",
    href: "https://www.goodreads.com/book/show/37794149-a-memory-called-empire",
    src: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1526486594l/39863238.jpg",
    alt: "The front cover of A Memory Called Empire, which is a beautiful and aw-inspiring depiction of the main character standing in front of the sun throne - futuristic and blocky with a spiked semicircle reminiscent of the sun behind it. The largest spikes would be at least ten meters. It's representative of the ideals of Teixcalaan, imposing, artistic, luxurious.",
    review:
      "A beautiful exploration of an intoxicating foreign culture. Teixcalaan is a fabulously romantic sci-fi setting, with influences from Byzantium to Mesoamerica. Literature and politics are often one and the same, and the society is full of tantalising allusions and literary references. While the book is sci-fi, the emphasis is placed not on technology or spaceships. The focus is on language, translation, and cultural exchange. Martine carefully describes every social interaction, as the main character tries to work through their culture shock and struggles not to become enthralled in the enticing, consuming Empire. Set in this luscious landscape is a gripping political drama, with sharply intelligent characters to take you along for the ride. Martin Cahill of TOR.com is a writer and so expressed it better than I ever could: 'it left me breathless with awe, this book that so effortlessly balances being a high-octane, science fiction action thriller, while also simultaneously being a thoughtful, complicated examination of identity, language, personhood, and truth'",
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
    rating: "5",
    date: "22/06/21",
  },

  {
    title: "The Kingkiller Chronicles",
    href: "https://www.goodreads.com/series/45262-the-kingkiller-chronicle",
    src: kingkiller,
    alt: "The cover of The Name of the Wind, the first book in the series. The name of the book and auther are depicted in a font with leafy, floral designs. In the center there is what appears to be Chancellor Palpatine, but probably isn't. It's a person wearing a black coat with a cowl, so you cannot see above their nose. What you can see is chalk white, with a slight sinister red glow coming from the hood where eyes probably are. They are framed by vines and trees.",
    review: [
      "The Kingkiller Chronicles are popularly known for both their fantastic prose, and how it's been ten thousand years and we still don't have the third book. Your opinion on Rothfuss's writing speed notwithstanding, he has an undeniable talent for poetic writing and the ability to craft a world that feels both unknowable and fully realised. It follows the main character from their childhood onwards, from their desperate struggle against poverty to increasingly fantastical shenanigans. Rothfuss is a perfectionist, which is very apparent when reading - everything feels very intentional, the descriptions and foreshadowing are perfectly placed. It's entirely based around the character of Kvothe, so if you don't like his arrogant, flamboyant approach to life, the series may be hard for you. The second book is not nearly as good, with a lack of direction and...",
      <i> that </i>,
      "scene. Yeah. No.",
    ],

    quote:
      "Words can light fires in the minds of men. Words can wring tears from the hardest hearts.",
    rating: "4",
    date: "24/06/21",
  },
  {
    title: "The Stormlight Archive",
    href: "https://www.goodreads.com/series/49075-the-stormlight-archive",
    src: stormlight,
    alt: "The covers of the first four Stormlight books, which I am now going to describe in far too much detail. They are all stark and stylised, designed with a limited but striking palette, only red, black and white. They all have a large, perfectly circular red sun in the background, which is the only colour except touches of red elsewhere. The first is the upper body of a knight, with their visor up. Stormlight is rising from their helmet and sword, and they are weary but ready to fight on. The second shows a man (Kaladin?)with a spear and ornate armour, with a long cloak caught by the wind, flaring to their side. The third shows Jasnah, glaring at the camera holding her sword to her side, like the absolute badass she is. Smoke is drifting behind her, and rough rocks are in the foreground. The final cover is Shallan, holding a very long, thing sword, in a dress that she really shouldn't be fighting in. There are some quite nice white blossoms at the top, and more of those rocks at the bottom. This description is possibly longer than the review.",
    quote: "Honour is dead. But I'll see what I can do.",
    review:
      "The Stormlight Archive is my favourite series. It's a story that is unrepentingly epic. Sanderson's worldbuilding is unparalleled, with an ability to craft worlds like no one else. The magic system in typical Sanderson fashion is as developed as a science. The plot is everything you could hope for from an epic fantasy series, with an ambitious scope and intricate threads underpinning every development. Although the cast is as large as it is diverse, each book focuses on an individual, making them intense character studies so that it's impossible to avoid falling in love with each main character. His prose is far more accessible than you would typically find in this genre, with solid pacing and a rare lack of over description. These are only some of the things making this series one of the most popular modern fantasy series. Brandon Sanderson is this generation's Tolkein, Jordan or Martin, and this is his magnum opus.",
    rating: "5",
    date: "26/06/21",
  },
  {
    title: "The Masquerade",
    href: "https://www.goodreads.com/series/199001-the-masquerade",
    src: baru,
    alt: "The cover of The Monster Baru Cormorant, which is an eery, smiling mask set aflame, crumbling, fire pouring out an eye. It's disturbing and symbolic, much like the book. The words 'Unmake the system' 'Remake the world' are written below.",
    quote: "This is the truth. You will know because it hurts.",
    review:
      "The Masquerade by Seth Dickinson follows Baru Cormorant, who I would really prefer not to follow but also can't look away. It's a stunning criticism of... pretty much everything. Colonialism, homophobia, transphobia, capitalism, racism - you name it, it's covered. The society providing the backdrop for this plethora of thematic messaging is Imperial Falcrest, one of the most intriguing fantasy cultures I've read - subtle, inexorable, cunning. It uses indoctrination, assimilation and economics to achieve its objectives. The series revolves around Baru's quest to destroy it from the inside while trying not to become a monster herself. Following Baru's increasingly unstable mental state, we are taken on a journey through economic machinations, geopolitics and revolution. The book didn't receive nearly as much acclaim as I think it deserves, with a lot of criticism around pacing and writing style (which is apparently 'Wikipedia style'), so bear that in mind. The climax of the first book left me heartbroken, and subsequent books left me both hating the books and loving them, feeling distinctly uncomfortable but still enthralled.",
    rating: "4",
    date: "27/06/21",
  },
  {
    title: "The First Law",
    href: "https://www.goodreads.com/series/43644-the-first-law",
    src: firstlaw,
    alt: "The covers of four First Law books, which feature the title of each book with representations of characters from the book. The titles and art are stylised as if they had been done in ink, pure black and white with spots of ink scattered about.",
    quote:
      "People love to see death. It reminds them that however mean, however low, however horrible their lives become…at least they have one.",
    review:
      "Grimdark is becoming a more popular subgenre of fantasy, possibly because of all the G.R.R Martin fans starved for content. Joe Abercrombie is currently the strongest alternative, and in my opinion, does a far better job. If you're unfamiliar with the term 'grimdark', it's about what you'd expect - gritty, morally grey, characters keep dying on you. Abercrombie's masterful ability to develop interesting and consistent characters is his greatest skill and makes even the most distasteful characters engaging narrators. That's a good thing too, since even the 'good' characters are fundamentally flawed and I wouldn't like to meet any of them. All of the choices made are believable, giving the plot a character-driven feel despite how its mysteries and reveals are clearly well thought out. The books are also packed with grim humour, which I had great fun with. Abercrombie is so well placed to be a spiritual successor to GRRM that honestly just let him finish ASOIAF...",
    rating: "4",
    date: "01/07/21",
  },
  {
    title: "The Broken Earth",
    href: "https://www.goodreads.com/series/112296-the-broken-earth",
    src: fifthseason,
    alt: "The cover of The Fifth Season, the first book in the series, which really isn't very interesting and appears to be some masonry. SALON.com states 'one of the most celebrated new voices in fantasy' and the subtitle is 'every age must come to an end.'",
    quote:
      "For all those that have to fight for the respect that everyone else is given without question.",
    review:
      "This series by N.K Jemisin is a wonderfully original approach to a large-scope fantasy series. Jemisin is a very strong literary author, and this book like her other works is very well-rounded, with very few inconsistencies or weaknesses. The worldbuilding is fascinating, with a focus on geology and the manipulation or repercussions of it. The books focus on an impending apocalypse bought about by, well, the earth being broken. As I expect from a Jemisin novel, heavy topics and social commentary are tackled head-on. The characters are very sympathetic, with effective emotional prose driving home all the pain they're put through. There are passages of second person, which has had a mixed reception - I found it weird at first but got used to it quickly. The twists completely recontextualise the whole series a few times, which was very impressive. The final book was not quite the climax I had hoped for, but it was still a traumatically emotional finale.",
    rating: "4",
    date: "01/07/21",
  },
  {
    title: "Murderbot",
    href: "https://www.goodreads.com/series/191900-the-murderbot-diaries",
    src: murderbot,
    alt: "The cover of the four Murderbot novellas, each of which features Murderbot, who looks sort of like someone in a cool spacesuit, along with traditional sci-fi imagery like space stations and starships.",
    quote: "I was having an emotion, and I hate that",
    review:
      "Murderbot is the softest and most fluffy death robot you'll ever meet. Mentally, that is. Physically, they have guns in their arms. The series is not just character-driven, but is almost a character study of Murderbot's psychology, history, and relationships. Through the first four novellas and subsequent novels, I cannot imagine a reader not falling in love with them.  It's pleasantly funny without being light-hearted, carefully handling Murderbot's mental health issues and especially social anxiety. That is correct, we are talking about a death robot with social anxiety. The setting is a dystopia of space capitalism, and the plot involves a lot of working out what the evil corporations are up to and stopping them (mainly to save friends rather than anti-capitalist sentiment, although that is also there). The action scenes are some of my favourites, with Murderbot's unique voice and Wells's practical prose making them feel very much like action is happening. ",
    rating: "4",
    date: "01/07/21",
  },
];
