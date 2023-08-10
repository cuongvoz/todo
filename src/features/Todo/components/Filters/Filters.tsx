import React, { useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { Filter, Todo } from '../../../../shared/type/type';
import { filterStatus } from '../../../../shared/constants/constants';
import { useTodoContext } from '../../contexts/TodoProvider';
type FilerProps = {
  status: string,
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  count: number,
}

export const Filters = (props: FilerProps): JSX.Element => {
  const { status, setStatus } = props;
  const { state: { todos } } = useTodoContext();
  const [todoList, setTodosList] = useState<Todo[]>([]);
  const activeClass = (title: string): string => title === status ? `${styles.item_active}` : '';
  const setFilter = (title: string): void => {
    setStatus(title);
  }
  const getQuantityTodoByFilter = (isDone: boolean): number => todos.filter(item => item.isDone === isDone).length;;
  useEffect(() => {
    setTodosList(todos)
  }, [todos])
  return <div className={styles.box_filter}>
    <div onClick={() => setFilter(filterStatus.All)} className={`${styles.filter} ${activeClass(filterStatus.All)}`}>
      <p className={styles.title_filter}>All</p>
      <span className={styles.quantity}>{todoList.length}</span></div>
    <div onClick={() => setFilter(filterStatus.Active)} className={`${styles.filter} ${activeClass(filterStatus.Active)}`}>
      <p className={styles.title_filter}>Active</p>
      <span className={styles.quantity}>{getQuantityTodoByFilter(false)}</span></div>
    <div onClick={() => setFilter(filterStatus.Completed)} className={`${styles.filter} ${activeClass(filterStatus.Completed)}`}>
      <p className={styles.title_filter}>Completed</p>
      <span className={styles.quantity}>{getQuantityTodoByFilter(true)}</span></div>
  </div>
};
