import React from "react";
import Key from "./Key";

const Keyboard = props => {

  return (
    <div className="keyboard">
      <p className="keys">
        {"QWERTYUIOP".split("").map((l, i) => 
          <Key letter={l} key={i} 
            click={props.click} played={props.played} />
        )}
      </p>
      <p className="keys">
        {"ASDFGHJKL".split("").map((l, i) => 
          <Key letter={l} key={i} 
            click={props.click} played={props.played} />
          )}
      </p>
      <p className="keys">
          <Key letter={"ENTER"} matched={props.matched} 
            click={props.guess} played={props.played} />
          
          {"ZXCVBNM".split("").map((l, i) => 
            <Key letter={l} key={i}
            click={props.click} played={props.played} />
          )}

          <Key letter={"⇐"} matched={props.matched} 
            click={props.backspace} played={props.played} />
        </p>
    </div>
  )

}

export default Keyboard;