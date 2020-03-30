import React from "react"

const allMessages = [
  { id: 1, title: 'Message001', content: '我爱你，中国' },
  { id: 3, title: 'Message003', content: '我爱你，老婆' },
  { id: 6, title: 'Message006', content: '我爱你，孩子' },
]

export default function MessageDetail(props) {

  const { id } = props.match.params
  const message = allMessages.find((m) => m.id === id*1)
  return (
    <ul>
      <li>ID:{message.id}</li>
      <li>TITLE:{message.title}</li>
      <li>CONTET:{message.content}</li>
    </ul>
  )
}