const Message = (props) => {
	return (
        <div className="text-break text-light mb-2">
            <b>{props.username}</b>: {props.children}
        </div>
	);
};

export { Message };
