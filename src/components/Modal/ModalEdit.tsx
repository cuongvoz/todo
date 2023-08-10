import React, { FC, useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import { Todo } from '../../shared/type/type';
import { editTask } from '../../service/todo';
import { toast } from 'react-toastify';
import { useTodoContext } from '../../features/Todo/contexts/TodoProvider';
import { actionEdit, actionRequest } from '../../shared/actions/actions';
import { validateForm } from '../../util/validation/validation';
import { EDIT } from '../../shared/constants/constants';
import { LoadingSpinnerNew } from '../Loading/LoadingSpinner';

interface ModalProps {
    isOpen: (type: string) => boolean;
    onClose: (type: string) => void;
    todo: Todo;
    getTodos: () => Promise<void>;
}

const ModalEdit: FC<ModalProps> = ({ isOpen, onClose, todo, getTodos }): JSX.Element => {
    const { dispatch } = useTodoContext()
    if (!isOpen(EDIT)) return <></>;
    const [todoEdit, setTodoEdit] = useState<Todo>(todo);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const editTaskTodo = async (): Promise<void> => {
        setIsLoading(true);
        if (isValid) {
            await editTask(todoEdit).then(data => {
                onClose(EDIT);
                toast.success('Update task success!');
                dispatch(actionEdit(data));
            }).catch(error => {
                toast.error('Update task failure!');
            });
        }
        setIsLoading(false);
    };

    const [isValid, setIsValid] = useState<boolean>(false)
    const [titleError, setTitleError] = useState<string>('');
    const [timeError, setTimeError] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTodoEdit({ ...todoEdit, [event.target.name]: event.target.value });
    }
    useEffect(() => {
        setTimeError(validateForm(todoEdit.title, todoEdit.time).time);
        setTitleError(validateForm(todoEdit.title, todoEdit.time).title);
        (timeError === '' && titleError === '') ? setIsValid(true) : setIsValid(false);
    }, [{ ...todoEdit }])
    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <h1 className={styles.modal_confirm}>
                    Edit task!
                </h1>
                <div >
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>
                                    <label className={styles.input_label}>Title: </label>
                                </th>
                                <th >
                                    <input className={styles.input_field} value={todoEdit.title} name='title' onChange={handleChange} placeholder='Enter task title here..' /> <br />
                                    <span className={styles.error_message}>{titleError}</span> <br />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <th>
                                    <label className={styles.input_label}>Datetime: </label>
                                </th>
                                <th >
                                    <input className={styles.input_field} type='datetime-local' name='time' onChange={handleChange} value={todoEdit.time} placeholder='Enter task title here..' /> <br />
                                    <span className={styles.error_message}>{timeError}</span>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {
                    isLoading ? <LoadingSpinnerNew /> : <>
                        <button disabled={isLoading} className={styles.button_cancel} onClick={() => onClose(EDIT)}>Cancel</button>
                        <button disabled={isLoading} className={styles.button_update} onClick={() => editTaskTodo()}>Update</button>
                    </>
                }
            </div>
        </div>
    );
};

export default ModalEdit;
