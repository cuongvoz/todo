import { useState } from 'react';
import { DELETE, DONE_TASK, EDIT } from '../../shared/constants/constants';

export const useModal = (initialState: boolean = false): [(type: string) => boolean, (type: string) => void] => {
  const [isOpenModalDelete, setOpenModalDelete] = useState<boolean>(initialState);
  const [isOpenModalEdit, setOpenModalEdit] = useState<boolean>(initialState);
  const [isOpenModalCheck, setOpenModalCheck] = useState<boolean>(initialState);
  const isOpenModal = (type: string): boolean => {
    switch (type) {
      case EDIT:
        return isOpenModalEdit;
      case DELETE:
        return isOpenModalDelete;
      case DONE_TASK:
        return isOpenModalCheck;
      default:
        return false;
    }
  }
  const setOpenCloseModal = (type: string): void => {
    switch (type) {
      case EDIT:
       setOpenModalEdit(!isOpenModalEdit)
       break;
      case DELETE:
        setOpenModalDelete(!isOpenModalDelete)
        break;
      case DONE_TASK:
       setOpenModalCheck(!isOpenModalCheck)
       break;
    }
  }
  return [isOpenModal, setOpenCloseModal];
}
