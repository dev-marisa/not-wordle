import React from "react";

const Letter = props => {

  let className = "letter";
  
  if(props.unplayed) {
    className += ""
  } else if(props.answer[props.index] === props.letter) {
    className += " match";
  } else if(props.answer.indexOf(props.letter) >= 0) {
    className += " partial";
  } else {
    className += " missing";
  }

  return (
    <span className={className}>{props.letter}</span>
  );
}

export default Letter;