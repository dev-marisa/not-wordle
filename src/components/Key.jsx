import React from "react";

const Key = props => {

  let className = "key ";

  if(props.letter === "ENTER") {
    className += "wide";
  } else if(props.played[props.letter]) {
    className += props.played[props.letter];
  }
  
  const click = e => {
    props.click(props.letter);
  }

  return (
    <button 
      className={className} 
      onClick={click}>
        {props.letter}
    </button>
  );

}

export default Key;