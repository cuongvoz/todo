import { useState } from 'react';
import { DELETE, EDIT } from '../../shared/constants/constants';

export const useModal = (initialState: boolean = false): [(type: string) => boolean, (type: string) => void] => {
  const [isOpenModalDelete, setOpenModalDelete] = useState<boolean>(initialState);
  const [isOpenModalEdit, setOpenModalEdit] = useState<boolean>(initialState);
  const [isOpenModalCheck, setOpenModalCheck] = useState<boolean>(initialState);
  const isOpenModal = (type: string): boolean => {
   return type === EDIT ? isOpenModalEdit : type === DELETE ? isOpenModalDelete : isOpenModalCheck;
  }
  const setOpenCloseModal = (type: string): void => {
   type === EDIT ? setOpenModalEdit(!isOpenModalEdit) : type === DELETE ? setOpenModalDelete(!isOpenModalDelete) : setOpenModalCheck(!isOpenModalCheck);
   }
  return [isOpenModal, setOpenCloseModal];
}
