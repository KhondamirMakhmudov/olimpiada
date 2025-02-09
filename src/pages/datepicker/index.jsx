import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function DateInput() {
  const [date, setDate] = useState(null);

  return (
    <div className="bg-black">
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Sanani tanlang"
        className="border p-2 rounded"
      />
    </div>
  );
}

export default DatePicker;
