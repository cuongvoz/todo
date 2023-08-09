import React, { useEffect, useState } from 'react';
import styles from './Todo.module.scss';
import { Todo } from '../../../../shared/type/type';
import LoadingSpinner from '../../../../components/Loading/LoadingSpinner';
import { useTodoContext } from '../../contexts/TodoProvider';
import ModalEdit from '../../../../components/Modal/ModalEdit';
import ModalCheck from '../../../../components/Modal/ModalCheck';
import ModalDelete from '../../../../components/Modal/ModalDelete';
import { useModal } from '../../../../util/hook/useModal';
import { DELETE, DONE_TASK, EDIT, MODAL_CONSTANTS, filterStatus } from '../../../../shared/constants/constants';
import { toast } from 'react-toastify';

type TodoProps = {
    status: string;
    getTodos: () => Promise<void>;
}

const BoxTodo = (props: TodoProps): JSX.Element => {
    const { getTodos, status } = props;
    const { state: { todos, isLoading } } = useTodoContext();
    const [todoList, setTodoList] = useState<Todo[]>([...todos]);
    const [todoSelected, setTodoSelected] = useState<Todo>(todos[0]);
    const [isOpenModal, setOpenCloseModal] = useModal();
    const [isNotified, setIsNotified] = useState<boolean>(false);

    const setTodo = (typeModal: string, todo: Todo): void => {
        setTodoSelected(todo);
        setOpenCloseModal(typeModal);
    }

    const getAllToDoByFilter = (): void => {
        const { All, Active } = filterStatus;
        status === All ? setTodoList(todos) : status === Active ? setTodoList(todos.filter(todo => todo.isDone === false)) : setTodoList(todos.filter(todo => todo.isDone === true));
    }

    const partTime = (todo: Todo): string => {
        const { time, isDone } = todo;
        const targetDateTime = new Date(time)
        const currentTime = new Date();
        const timeDifference = targetDateTime.getTime() - currentTime.getTime();
        if (isDone) {
            return 'Finished.'
        }
        if (timeDifference <= 0) {
            return 'Overdue.';
        }
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;
        return `${days}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s time left.`
    }
    const notifyWarning = (todo: Todo): void => {
        const { time, isDone, title } = todo;
        const targetDateTime = new Date(time)
        const currentTime = new Date();
        const timeDifference = targetDateTime.getTime() - currentTime.getTime();
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        if (hours < 1 && !isDone  &&  minutes > 0) {
            toast.warning(`Task ${title} is ${remainingMinutes} minutes time left.`);
            setIsNotified(true);
        }
    }

    useEffect(() => {
        if (isNotified) return;
        todos.map(todo => notifyWarning(todo));
    }, [todos]);

    useEffect(() => {
        getAllToDoByFilter();
    }, [todos, status])

    return <div className={styles.box_todo}>
        {!isLoading ? todoList.map((todo: Todo) => (
            <React.Fragment key={todo.id}>
                <div className={`${styles.todo_item} ${todo.isDone && styles.isDone}`}>
                    <div className={styles.todo_action}>
                        <label  className={styles.checked_box}>
                            <input type="checkbox" onChange={() => { }} checked={todo.isDone} />
                            <span onClick={() => setTodo(DONE_TASK, todo)} className={`${styles.checkmark} ${todo.isDone && styles.done_tick}`}></span>
                        </label>
                    </div>
                    <div onClick={() => setTodo(DONE_TASK, todo)} className={styles.todo_title}>{todo.title}</div>
                    <div className={styles.todo_time}>
                        <span>{partTime(todo)}</span>
                    </div>
                    <div className={styles.todo_action}>
                        <label className={styles.dropdown}>
                            <div className={styles.dd_button}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                            <input type="checkbox" className={styles.dd_input} id="test" />
                            <ul className={styles.dd_menu}>
                                <li onClick={() => setTodo(EDIT, todo)}><i className="fa-solid fa-pen-to-square"></i> Edit tast</li>
                                <li onClick={() => setTodo(DELETE, todo)}><i className="fa-solid fa-trash"></i> Remove task</li>
                            </ul>
                        </label>
                    </div>
                </div>
            </React.Fragment>
        )) : <LoadingSpinner />}
        <ModalDelete isOpen={isOpenModal} onClose={setOpenCloseModal} todo={todoSelected} />
        <ModalEdit getTodos={getTodos} isOpen={isOpenModal} onClose={setOpenCloseModal} todo={todoSelected} />
        <ModalCheck isOpen={isOpenModal} onClose={setOpenCloseModal} todo={todoSelected} />
    </div>;
};

export default BoxTodo;