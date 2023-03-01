//kod från: https://github.com/XenoverseUp/chatter

import Message from "./message/message";
import ScrollToBottom from "react-scroll-to-bottom";
import "./messages.css";

const Messages = ({ messages, name }) => {
	return (
		<ScrollToBottom className="message-boxx">
			{messages.map((message, i) => (
				<div key={i}>
					<Message message={message} name={name} />
				</div>
			))}
		</ScrollToBottom> 
	);
};

export default Messages;