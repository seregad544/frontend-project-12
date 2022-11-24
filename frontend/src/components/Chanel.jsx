import cn from 'classnames';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { removeChanel, renameChanel } from '../store/modalSlice';
import { useTranslation } from 'react-i18next';

const Chanel = (props) => {
	const btnClass = cn('dropdownButton', {'activeDropdown': props.active});
	const dropBtnClass = cn('dropdownToggle', {'activeDropdown': props.active});
	const id = props.id;
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const rename = () => dispatch(renameChanel({id}));
	const remove = () => dispatch(removeChanel({id}));

	return (
        <>
		<li className="nav-item w-100">
			<Dropdown as={ButtonGroup}  bsPrefix={'dropdown'}>
				<Button variant="success" bsPrefix={btnClass} onClick={props.onClick}>
					<span className="me-1"># </span>
					{props.children}
				</Button>

				<Dropdown.Toggle split id="dropdown-split-basic" childBsPrefix={dropBtnClass}/>

				<Dropdown.Menu>
					<Dropdown.Item onClick={remove}>{t('dropdownMenu.remove')}</Dropdown.Item>
					<Dropdown.Item onClick={rename}>{t('dropdownMenu.rename')}</Dropdown.Item>
				</Dropdown.Menu>
    		</Dropdown>
		</li>
		</>
	);
};

export { Chanel };
