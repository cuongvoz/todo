import { toast } from "react-toastify";
import { Todo } from "../../shared/type/type";

export const getFormattedDate = (): string => {
    const date = new Date();
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
    return formattedDate;
}

export const getToDay = (): string => {
    const today = new Date();
    const dayIndex = today.getDay();
    const daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[dayIndex];
}
export const partTime = (todo: Todo): string => {
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
export const notifyWarning = (todo: Todo, setIsNotified: React.Dispatch<React.SetStateAction<boolean>>): void => {
    const { time, isDone, title } = todo;
    const targetDateTime = new Date(time)
    const currentTime = new Date();
    const timeDifference = targetDateTime.getTime() - currentTime.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours < 1 && !isDone && minutes > 0) {
        toast.warning(`Task ${title} is ${remainingMinutes} minutes time left.`);
        setIsNotified(true);
    }
}