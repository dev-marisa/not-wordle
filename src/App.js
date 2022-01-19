import Letter from './components/Letter';
import React, {useState, useEffect} from "react";
import Keyboard from './components/Keyboard';
import words from "./words";

function App() {

  const [answer, setAnswer] = useState("");
  const [helpTextClass, setHelpTextClass] = useState("help hide");
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [played, setPlayed] = useState({});

  // at start of game select a word at random
  useEffect(() => {
    let word = words[Math.floor(Math.random() * words.length)];
    setAnswer(word);
  }, []);

  // Binary Search
  // @param {string[]} list - sorted array of valid words
  // @param {string} word - word to search for in the array 
  function found(list, word) {
    var start = 0;
    var end = list.length-1;
    while(start <= end) {
      var mid = Math.floor((start + end)/2);
      if(word === list[mid]) {
        return true;
      } else if(word < list[mid]) {
        end = mid-1;
      } else {
        start = mid+1;
      }
    }
    return false;
  }

  // displays help text when there is an error
  function displayHelpText() {
    setHelpTextClass("help");
    setTimeout(() => {
      setHelpTextClass("help hide");
    }, 1500);
  }

  const makeGuess = e => {
    if(e && e.preventDefault) {
      e.preventDefault();
    }
    if(guess.length < 5) {
      return;
    }
    if(!found(words, guess)) {
      displayHelpText();
      setGuess("");
      return;
    }
    const temp = {...played};
    setGuesses([...guesses, guess]);
    for(let i=0; i<guess.length; i++) {
      if(answer[i] === guess[i]) {
        temp[guess[i]] = "match";
      } else if(!temp[guess[i]] && answer.indexOf(guess[i]) >= 0) {
        temp[guess[i]] = "partial";
      } else if(!temp[guess[i]]) {
        temp[guess[i]] = "missing";
      }
    }
    setPlayed(temp);
    setGuess("");
  }

  const click = l => {
    if(guess.length < 5) {
      setGuess(guess + l);
    }
  }
  
  const backspace = e => {
    setGuess(guess.slice(0, -1));
  }

  const press = e => {
    if(e.key === "Enter") {
      makeGuess();
    } else if(e.key === "Backspace") {
      backspace();
    } else if(/[a-z]/.test(e.key) && guess.length < 5) {
      setGuess(guess + e.key.toUpperCase());
    }
  }

  return (
    <div className="game" onKeyDown={press} tabIndex="0">
      
      <div className="column">

      
      
        <h1>Not-Wordle</h1>

        {
          guesses.map((g,i) => 
            <p className="letters" key={i}>
              {
                g.split("").map((l, i) =>
                  <Letter key={i} index={i} letter={l} answer={answer} />
                )
              }
            </p>
          )
        }

        <p className="letters">
        {
          guess.split("").map((l, i) => 
            <Letter key={i} index={i} letter={l} unplayed={true} answer="     " />
          )
        }
        {
          new Array(5 - guess.length).fill(" ").map((l, i) =>
            <Letter key={i} index={i} letter={l} unplayed={true} answer={answer} />
          )
        }
        </p>

        <p className={helpTextClass}>Not a valid word</p>
        
        <Keyboard 
          click={click}
          backspace={backspace}
          guess={makeGuess}
          played={played}
        />

      </div>

    </div>
  );
}

export default App;
