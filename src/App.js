
import { useEffect, useState } from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
const QuoteUrl='https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';


function App() {
  let [randomNumber,setRandomNumber]=useState(0);
  let [quotes,setQuotes]=useState(null);
  let [quote,setQuote]=useState(" Life isn’t about getting and having, it’s about giving and being.");
  let [author,setAuthor]=useState("Kevin Kruse");
  let [nextIndex,setNextIndex]=useState(0);
  let colors = [
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
const fadingEffect=()=>{

  
  let elements =document.getElementsByClassName("faded");

  Array.from(elements).forEach(element=>{
    element.classList.add("faded-text");
  element.addEventListener("animationend",function(){
    element.classList.remove("faded-text");
    element.style.opacity="1";
  });});
}

const getQuoteAndAuthor=()=>{

  setQuote(quotes[randomNumber].quote);
  setAuthor(quotes[randomNumber].author)

}
const generateRandomNumber=()=>{

  fadingEffect();
  setRandomNumber(Math.floor(quotes.length*Math.random()) );
  setNextIndex( ++nextIndex % colors.length);
  getQuoteAndAuthor();
 
}
 
  
 
useEffect(() => {

  fetch(QuoteUrl)
    .then((response) => response.json())
    .then((data) => {
      
      setQuotes(data.quotes);
     });
}, []);



 
  return (
    <div className="App"  >
      <header className="App-header" style={{"backgroundColor":colors[nextIndex],"transition-duration":"1s"}}>
      <div id="quote-box">
        {quotes &&<p id="text" class="faded" style={{"color":colors[nextIndex],"transition-duration":"1s"}} >
            <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>  { quote }</p>}
    
        {quotes && <p id="author" class="faded" style={{"color":colors[nextIndex],"transition-duration":"1s"}} >
                        -  { author}</p>}
       
        <div id="buttons"> 
        <a 
          style={{"color":colors[nextIndex],"transition-duration":"1s"}} id="tweet-quote" 
          href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote}${author}`)} target="_blank" 
          rel="noreferrer"> 
            <FontAwesomeIcon id="tweet-icon" icon={faTwitterSquare}></FontAwesomeIcon> 
        </a>

         <button 
          style={{"backgroundColor":colors[nextIndex]}} id="new-quote" onClick={()=>{generateRandomNumber()}}>
          New Quote
         </button>

        </div>
       
        
      </div>
      </header>
    </div>
  );
}


export default App;
