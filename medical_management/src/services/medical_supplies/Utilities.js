export const formatDateValue = (inputDate) => {
    const parts = inputDate.split('-');
    const dateObject = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
  
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = dateObject.getMonth() +1;
    const monthEnd = month.toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = dateObject.getFullYear();

    const formattedDate = `${day}/${monthEnd}/${year}`;
    return formattedDate;
}