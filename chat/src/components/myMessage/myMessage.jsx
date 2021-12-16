import React from 'react';
const style = {display: 'flex', padding: '5px', justifyContent: 'end'};

function MyMessage(props) {
  return(
    <div style={style}>
      {props.message}
    </div>
  )
}

export default MyMessage;
