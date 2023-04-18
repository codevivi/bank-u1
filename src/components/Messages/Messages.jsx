import { useState } from "react";
import Message from "./Message";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
function Messages({ messages, deleteMsg, deleteAllMsg }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`messages ${isExpanded ? "expanded" : null}`}>
      <div className="messages-inner">
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} deleteMsg={deleteMsg} />
        ))}
      </div>
      {messages.length > 1 && (
        <div className="controls">
          <button className="toggle-expand" onClick={() => setIsExpanded((is) => !is)}>
            {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
          </button>
          <button onClick={deleteAllMsg} className="delete-all red">
            Panaikinti visas {messages.length}
          </button>
        </div>
      )}
    </div>
  );
}

export default Messages;
