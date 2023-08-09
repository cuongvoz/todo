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