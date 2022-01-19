import React from "react";

const Key = props => {

  let className = "key";

  if(props.matched.indexOf(props.letter) >= 0) {
    className += " match";
  } else if(props.present.indexOf(props.letter) >= 0) {
    className += " partial";
  } else if(props.missing.indexOf(props.letter) >= 0) {
    className += " missing";
  }

  if(props.letter === "ENTER") {
    className += " wide";
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