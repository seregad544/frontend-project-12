import { InputMessageFeed } from "./InputMessageFeed";
import { MessageBox } from "./MessageBox";
import { TopMessageFeed } from "./TopMessageFeed";

const MessageFeed = () => {	
	return (
        <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100 black-2">
                <TopMessageFeed></TopMessageFeed>
                <MessageBox></MessageBox>
                <InputMessageFeed></InputMessageFeed>
            </div>
        </div> 
	);
};

export { MessageFeed };
