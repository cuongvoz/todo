import React, { FC, useState } from 'react';
import styles from './Modal.module.scss';
import { Todo } from '../../shared/type/type';
import { editTask } from '../../service/todo';
import { toast } from 'react-toastify';
import { useTodoContext } from '../../features/Todo/contexts/TodoProvider';
import { actionDoneTask, actionRequest } from '../../shared/actions/actions';
import { DONE_TASK } from '../../shared/constants/constants';
import { LoadingSpinnerNew } from '../Loading/LoadingSpinner';

interface ModalProps {
  isOpen: (type: string) => boolean;
  onClose: (type: string) => void;
  todo: Todo;
}

const ModalCheck: FC<ModalProps> = ({ isOpen, onClose, todo }): JSX.Element => {
  if (!isOpen(DONE_TASK)) return <></>;
  const { dispatch } = useTodoContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const doneTask = async (id: number): Promise<void> => {
    setIsLoading(true);
    todo.isDone = true;
    await editTask(todo).then(() => {
      onClose(DONE_TASK);
      toast.success('You have completed the task successfully!');
      dispatch(actionDoneTask(id));
    }).catch(error => {
      toast.error('Error, try again.');
    });
    setIsLoading(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <h1 className={styles.modal_confirm}>
          Confirm done task!
        </h1>
        <h3>Are you sure you have completed this task?</h3>
        <h2>{`Task ${todo.title} is not done yet ? `}</h2>
        {
          isLoading ? <LoadingSpinnerNew /> : <>
            <button className={styles.button_cancel} onClick={() => onClose(DONE_TASK)}>No</button>
            <button className={styles.button_check} onClick={() => doneTask(todo.id || 0)}>Yes</button>
          </>
        }
      </div>
    </div>
  );
};

export default ModalCheck;
