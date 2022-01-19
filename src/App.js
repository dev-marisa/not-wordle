import Letter from './components/Letter';
import React, {useState, useEffect} from "react";
import Keyboard from './components/Keyboard';
import words from "./words";

function App() {

  const [answer, setAnswer] = useState("");
  const [helpTextClass, setHelpTextClass] = useState("help hide");
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [matched, setMatched] = useState([]);
  const [present, setPresent] = useState([]);
  const [missing, setMissing] = useState([]);

  useEffect(() => {
    let word = words[Math.floor(Math.random() * words.length)];
    setAnswer(word);
  }, []);

  const makeGuess = e => {
    if(e.preventDefault) {
      e.preventDefault();
    }
    if(guess.length < 5) {
      return;
    }
    if(words.indexOf(guess) < 0) {
      setHelpTextClass("help");
      setTimeout(() => {
        setHelpTextClass("help hide");
      }, 1500);
      setGuess("");
      return;
    }
    setGuesses([...guesses, guess]);
    let tempMatched = [...matched];
    let tempPresent = [...present];
    let tempMissing = [...missing];
    for(let i=0; i<guess.length; i++) {
      if(answer[i] === guess[i]) {
        tempMatched.push(guess[i]);
      } else if(answer.indexOf(guess[i]) >= 0) {
        tempPresent.push(guess[i]);
      } else {
        tempMissing.push(guess[i]);
      }
    }
    setMatched([...matched, ...tempMatched]);
    setPresent([...present, ...tempPresent]);
    setMissing([...missing, ...tempMissing]);
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

  return (
    <div className="game">
      <h1>Not-Wordle</h1>
      <form onSubmit={makeGuess} className="">
        <input 
          type="text" 
          minLength={5} 
          maxLength={5} 
          onChange={e => setGuess(e.target.value.toUpperCase())}
          value={guess}
        />
        <input type="submit" value="guess" />
      </form>
      <p className={helpTextClass}>Not a valid word</p>
      {
        guesses.map((g,i) => 
          <p className="letters" key={i}>
            {
              g.split("").map((l, i) =>
                <Letter key={i} index={i} letter={l} answer={answer}/>
              )
            }
          </p>
        )
      }
      <Keyboard 
        matched={matched}
        present={present}
        missing={missing}
        click={click}
        backspace={backspace}
        guess={makeGuess}
      />
    </div>
  );
}

export default App;
