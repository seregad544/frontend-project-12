import { React } from 'react';
import cn from 'classnames';

function DefaultChanel(props) {
  const { onClick, children, active } = props;
  const btnClass = cn('w-100', 'rounded-0', 'text-start', 'btn', 'text-light', 'ps-3', { 'btn-secondary': active });

  return (
    <li className="nav-item w-100">
      <button type="button" className={btnClass} onClick={onClick}>
        <span className="me-1"># </span>
        {children}
      </button>
    </li>
  );
}

export default DefaultChanel;
