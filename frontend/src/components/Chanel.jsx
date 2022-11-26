import { React } from 'react';
import cn from 'classnames';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChanel, renameChanel } from '../store/modalSlice';

function Chanel(props) {
  const { active, onClick, children } = props;
  const btnClass = cn('dropdownButton', { activeDropdown: active });
  const dropBtnClass = cn('dropdownToggle', { activeDropdown: active });
  const { id } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rename = () => dispatch(renameChanel({ id }));
  const remove = () => dispatch(removeChanel({ id }));

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} bsPrefix="dropdown">
        <Button variant="success" bsPrefix={btnClass} onClick={onClick}>
          <span className="me-1"># </span>
          {children}
        </Button>

        <Dropdown.Toggle split id="dropdown-split-basic" childBsPrefix={dropBtnClass}>
          <span className="visually-hidden">{t('dropdownMenu.control')}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={remove}>{t('dropdownMenu.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={rename}>{t('dropdownMenu.rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
}

export default Chanel;
