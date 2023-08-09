import React from 'react';
import styles from './DatePicker.module.scss'
interface DatePickerProp {
  dateTime: string
  setDatetime: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker = ({ dateTime, setDatetime }: DatePickerProp): JSX.Element => {
  return <><input className={styles.input_date} value={dateTime} name='time' onChange={setDatetime} type='datetime-local' /></>;
};
