import cn from 'classnames';

const DefaultChanel = (props) => {
	const btnClass = cn('w-100', 'rounded-0', 'text-start', 'btn', 'text-light', 'ps-3', {'btn-secondary': props.active});
	return (
        <li className="nav-item w-100">
			<button type="button" className={btnClass} onClick={props.onClick}>
				<span className="me-1"># </span>
				{props.children}
			</button>
		</li>
	);
};

export { DefaultChanel };
