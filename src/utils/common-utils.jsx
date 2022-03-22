import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//ag-grid filter
export const agDateColumnFilter = () => {
  return {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      const dateAsString = cellValue;
      if (dateAsString == null) return -1;
      const dateParts = dateAsString.split("/");
      const cellDate = new Date(
        Number(dateParts[0]),
        Number(dateParts[1]) - 1,
        Number(dateParts[2])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
    suppressAndOrCondition: true,
    defaultOption: "startsWith",
  };
};

export const Toastify = () => {
  toast.info("toast messge");
};

export const randomString = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const stringLength = 6;
  let randomstring = "";
  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
};
