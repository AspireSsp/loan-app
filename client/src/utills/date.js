exports.formatDate = (inputDate)=>{
    // Parse the input date string
    const date = new Date(inputDate);
    
    // Extract day, month, and year components
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    
    // Array of month names abbreviated
    const monthNamesAbbreviated = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    // Format the date string
    const formattedDate = `${day}, ${monthNamesAbbreviated[monthIndex]} ${year}`;
    
    return formattedDate;
  }