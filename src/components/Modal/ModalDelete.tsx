import React, { FC, useState } from 'react';
import styles from './Modal.module.scss';
import { Todo } from '../../shared/type/type';
import { deleteTaskById } from '../../service/todo';
import { toast } from 'react-toastify';
import { useTodoContext } from '../../features/Todo/contexts/TodoProvider';
import { actionRequest, deleteTaskTodo } from '../../shared/actions/actions';
import { DELETE } from '../../shared/constants/constants';
import { LoadingSpinnerNew } from '../Loading/LoadingSpinner';

interface ModalProps {
  isOpen: (type: string) => boolean;
  onClose: (type: string) => void;
  todo: Todo;
}

const ModalRemove: FC<ModalProps> = ({ isOpen, onClose, todo }): JSX.Element => {
  if (!isOpen(DELETE)) return <></>;
  const { dispatch } = useTodoContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteTask = async (id: number): Promise<void> => {
    setIsLoading(true);
    await deleteTaskById(id).then(
      () => {
        onClose(DELETE);
        dispatch(deleteTaskTodo(id));
        toast.success('Remove task success!');
      }
    ).catch(() => {
      toast.error('Remove task failure!');
    })
    setIsLoading(false);
  };
  const getIsDoneText = () => {
    return todo.isDone ? 'is done ' : 'is not done yet ?'
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <h1 className={styles.modal_confirm}>
          Confirm delete!
        </h1>
        <h3>Are you sure you want to delete this task?</h3>
        <h2>{`Task ${todo.title} ${getIsDoneText()} `}</h2>
        {
          isLoading ? <LoadingSpinnerNew /> : <>
            <button className={styles.button_cancel} onClick={() => onClose(DELETE)}>Cancel</button>
            <button className={styles.button_delete} onClick={() => deleteTask(todo.id || -1)}>Delete</button>
          </>
        }
      </div>
    </div>
  );
};

export default ModalRemove;
