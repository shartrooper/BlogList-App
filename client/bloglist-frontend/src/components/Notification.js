import React from 'react'

const Notification = ({message}) => {
  return message === null?null:<div style={message.style}>{message.message}</div>
}

export default Notification 