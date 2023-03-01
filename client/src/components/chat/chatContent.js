//kod från: https://github.com/XenoverseUp/chatter

import Messages from "./messages/messages";
import "./chatContent.css";

const ChatContent = ({
	message,
	setMessage,
	sendMessage,
	messages,
	name,
}) => {
    //<PhoneHeader room={room} />
	return (
		<div id="row-content-main-container">
			
			<div id="message-box">
				<Messages messages={messages} name={name} />
			</div>

			<form id="form">
				<input
					type="text"
					value={message}
					placeholder="Type a message..."
					onChange={event => setMessage(event.target.value)}
					onKeyPress={event =>
						event.key === "Enter" ? sendMessage(event) : null
					}
				/>
				<button onClick={event => sendMessage(event)}>
					
					<h1>Send</h1>
				</button>
			</form>
		</div>
	);
};

export default ChatContent;