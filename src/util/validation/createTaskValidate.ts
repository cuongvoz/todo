export const validateForm = (title:string, time: string): any => {
  const errorMessage = {
    title: '',
    time: ''
  }
  if (!title.trim()) {
    errorMessage.title= 'Title is require.';
  }
  else if (title.length > 100) {
    errorMessage.title = 'Title must be less then 100 character.';
  }
  if(!time.trim()) errorMessage.time = 'Datetime is required.';
  const check = new Date(time).getTime() - Date.now();
  if (check < 0) errorMessage.time = 'Overdue date time.';
  return errorMessage;
}