export const formatDateValue = (inputDate) => {
    const parts = inputDate.split('-');
    const dateObject = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
  
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = dateObject.getFullYear();
  
    const formattedDate = `${day}/${month}/${year}`;
  
    return formattedDate;
}