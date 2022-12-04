import { React } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeModal, selectModalIsOpened, selectTypeModal } from '../../../../store/modalSlice';
import ModalBodyAdd from './components/ModalBodyAdd';
import ModalBodyRename from './components/ModalBodyRename';
import ModalBodyRemove from './components/ModalBodyRemove';

function CustomModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const typeModal = useSelector(selectTypeModal);
  const isOpened = useSelector(selectModalIsOpened);
  const close = () => dispatch(closeModal());

  const title = {
    addChannel: t('modal.title.addChannel'),
    removeChanel: t('modal.title.removeChanel'),
    renameChanel: t('modal.title.renameChanel'),
  };
  const body = {
    addChannel: <ModalBodyAdd />,
    removeChanel: <ModalBodyRemove />,
    renameChanel: <ModalBodyRename />,
  };

  return (
    <Modal show={isOpened} centered onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title[typeModal]}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {body[typeModal]}
      </Modal.Body>
    </Modal>
  );
}

export default CustomModal;
