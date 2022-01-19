import React from "react";
import Key from "./Key";

const Keyboard = props => {

  return (
    <div className="keyboard">
      <p className="keys">
        {"QWERTYUIOP".split("").map((l, i) => 
          <Key letter={l} key={i} 
            matched={props.matched} present={props.present}
            missing={props.missing} click={props.click}  />
        )}
      </p>
      <p className="keys">
        {"ASDFGHJKL".split("").map((l, i) => 
          <Key letter={l} key={i} 
            matched={props.matched} present={props.present}
            missing={props.missing} click={props.click} />
          )}
      </p>
      <p className="keys">
          <Key letter={"ENTER"} matched={props.matched} 
            present={props.present} missing={props.missing} 
            click={props.click} click={props.guess} />
          
          {"ZXCVBNM".split("").map((l, i) => 
            <Key letter={l} key={i}
            matched={props.matched} present={props.present}
            missing={props.missing} click={props.click} />
          )}

          <Key letter={"⇐"} matched={props.matched} 
            present={props.present} missing={props.missing} 
            click={props.click}click={props.backspace} />
        </p>
    </div>
  )

}

export default Keyboard;