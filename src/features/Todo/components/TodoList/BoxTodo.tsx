import React, { useEffect, useState } from 'react';
import styles from './Todo.module.scss';
import { Todo } from '../../../../shared/type/type';
import { LoadingSpinner } from '../../../../components/Loading/LoadingSpinner';
import { useTodoContext } from '../../contexts/TodoProvider';
import ModalEdit from '../../../../components/Modal/ModalEdit';
import ModalCheck from '../../../../components/Modal/ModalCheck';
import ModalDelete from '../../../../components/Modal/ModalDelete';
import { useModal } from '../../../../util/hook/useModal';
import { CHECK, DELETE, DONE_TASK, EDIT, MODAL_CONSTANTS, filterStatus } from '../../../../shared/constants/constants';
import { toast } from 'react-toastify';
import { notifyWarning, partTime } from '../../../../util/dateTime/dateTime';

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
        if (!todo.isDone) {
            if (typeModal != CHECK) {
                setOpenCloseModal(typeModal);
            }
        } else if (todo.isDone && typeModal === DELETE) {
            setOpenCloseModal(typeModal);
        }
    }

    const getAllToDoByFilter = (): void => {
        const { All, Active } = filterStatus;
        status === All ? setTodoList(todos) : status === Active ? setTodoList(todos.filter(todo => todo.isDone === false)) : setTodoList(todos.filter(todo => todo.isDone === true));
    }

    useEffect(() => {
        if (isNotified) return;
        todos.map(todo => notifyWarning(todo, setIsNotified));
    }, [todos]);

    useEffect(() => {
        getAllToDoByFilter();
    }, [todos, status])

    return <div className={styles.box_todo}>
        {!isLoading ? todoList.map((todo: Todo) => (
            <React.Fragment key={todo.id}>
                <div className={`${styles.todo_item} ${todo.isDone && styles.isDone}`}>
                    <div className={styles.todo_action}>
                        <label className={styles.checked_box}>
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
                                {
                                    !todo.isDone && <li onClick={() => setTodo(EDIT, todo)}><i className="fa-solid fa-pen-to-square"></i> Edit tast</li>
                                }
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