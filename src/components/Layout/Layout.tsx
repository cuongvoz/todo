import React, { useEffect, useState } from 'react';
import styles from './Layout.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Filters } from '../../features/Todo/components/Filters/Filters';
import { DatePicker } from '../DatePicker/DatePicker';
import BoxTodo from '../../features/Todo/components/TodoList/BoxTodo';
import { addTask, getAllTask } from '../../service/todo';
import { filterStatus } from '../../shared/constants/constants';
import { toast, ToastContainer } from 'react-toastify';
import { useTodoContext } from '../../features/Todo/contexts/TodoProvider';
import { actionCreate, actionRequest, setTodoList } from '../../shared/actions/actions';
import { validateForm } from '../../util/validation/validation';
import { getFormattedDate, getToDay } from '../../util/dateTime/dateTime';

const Layout: React.FC = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const { state: { todos, isLoading }, dispatch } = useTodoContext();
  const [status, setStatus] = useState<string>(filterStatus.All);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const addNewTask = async (): Promise<void> => {
    setIsChange(true);
    validationAddTask();
    if (errorMessage === '' && title.trim() && dateTime.trim()) {
      dispatch(actionRequest());
      addTask({ title: title.trim(), time: dateTime, isDone: false }).then(data => {
        setIsChange(false);
        toast.success("Add new task success!");
        setTitle('');
        setDateTime('');
        dispatch(actionCreate(data));
      }).catch(error => {
        toast.error("Add new task failure!");
      });
    };
  };

  const getAllToDo = async (status: string = ''): Promise<void> => {
    dispatch(actionRequest());
    await getAllTask(status).then(data => {
      dispatch(setTodoList(data));
    });
    
  };

  const validationAddTask = (): void => {
    setErrorMessage(validateForm(title, dateTime).title || validateForm(title, dateTime).time);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsChange(true);
    const { name, value } = event.target;
    if (name == 'title') {
      setTitle(value);
    }
    if (name == 'time') {
      setDateTime(value);
    }
  }
  useEffect(() => {
    validationAddTask();
  }, [title, dateTime])

  useEffect(() => {
    getAllToDo();
  }, []);

  return <div className={styles.container}>
    <ToastContainer />
    <h1 className={styles.box_datetime}>{`${getToDay()} ${getFormattedDate()}`} <i className="fa-solid fa-thumbtack"></i></h1>
    <h3>"Every day should be a good day. People fool themselves that they'll be here forever."</h3>
    <div className={`${styles.box_add_task} ${errorMessage !== '' && isChange && styles.is_invalid}`}>
      <i className={`fa fa-bars ${styles.menuItem}`}></i>
      <input className={styles.task_title} name='title' value={title} onChange={handleChange} placeholder='Add new task...' />
      <DatePicker dateTime={dateTime} setDatetime={handleChange} />
      <button disabled={isLoading} className={styles.button_add} onClick={addNewTask}><i className="fa-solid fa-plus"></i></button>
    </div>
    {isChange && <span className={styles.error_message}>{errorMessage}</span>}
    <Filters status={status} setStatus={setStatus} count={todos.length} />
    <BoxTodo status={status} getTodos={getAllToDo} />
  </div>;
};

export default Layout;
