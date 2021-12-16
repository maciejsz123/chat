import React from 'react';
const style = {display: 'flex', padding: '5px', justifyContent: 'start'};

function OtherUserMessage(props) {
  return(
    <div style={style}>
      {props.message}
    </div>
  )
}

export default OtherUserMessage;
