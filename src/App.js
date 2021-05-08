import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import './App.scss';

const QuoteUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotes, setQuotes] = useState(null);
  const [singleQuote, setSingleQuote] = useState(" Life isn’t about getting and having, it’s about giving and being.");
  const [nextIndex, setNextIndex] = useState(0);
  const [fade, setFade] = useState(true)


  const generateRandomNumber = () => {
    setFade(true)
    setRandomNumber(Math.floor(quotes.length * Math.random()));
    setNextIndex(nextIndex + 1 % colors.length);
    setSingleQuote(quotes[randomNumber]);
  }

  useEffect(() => {
    fetch(QuoteUrl)
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data.quotes);
        setSingleQuote(data.quotes[0])
      });
  }, []);



  const handleOnAnimationEnd = () => {
    setFade(false)
  }


  return (
    <div className="App"  >
      <header className="App-header" style={{ "backgroundColor": colors[nextIndex], "transition-duration": "1s" }}>
        <div id="quote-box" onAnimationEnd={handleOnAnimationEnd}>
          {quotes && <p id="text" class={fade && 'faded-text'} style={{ "color": colors[nextIndex], "transition-duration": "1s" }} >
            <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>  {singleQuote.quote}</p>}

          {quotes && <p id="author" class={fade && 'faded-text'} style={{ "color": colors[nextIndex], "transition-duration": "1s" }} >
            -  {singleQuote.author}</p>}

          <div id="buttons">
            <a
              style={{ "color": colors[nextIndex], "transition-duration": "1s" }} id="tweet-quote"
              href={encodeURI(`http://www.twitter.com/intent/tweet?text=${singleQuote.quote}${singleQuote.author}`)} target="_blank"
              rel="noreferrer">
              <FontAwesomeIcon id="tweet-icon" icon={faTwitterSquare}></FontAwesomeIcon>
            </a>

            <button
              style={{ "backgroundColor": colors[nextIndex] }}
              id="new-quote"
              onClick={generateRandomNumber}>
              New Quote
         </button>
          </div>
        </div>
      </header>
    </div>
  );
}


export default App;
