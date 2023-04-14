import Message from "./Message";

function Messages({ messages, deleteMsg, deleteAll }) {
  {
    console.log(messages);
  }
  return (
    <div className="messages">
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} deleteMsg={deleteMsg} />
      ))}
    </div>
  );
}

export default Messages;
