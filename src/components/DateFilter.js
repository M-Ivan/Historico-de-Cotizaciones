import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateFilter(props) {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
    props.handleDateCallback(date);
  };

  return (
    <div>
      <div className="text">Elegir una fecha</div>
      <div>
        <DatePicker
          className="large"
          selected={date}
          maxDate={new Date()}
          minDate={new Date("1999-01-05")}
          onChange={onChange}
          dateFormat="dd-MM-yyyy"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="DD-MM-YYYY"
          todayButton="Hoy"
        />
      </div>
    </div>
  );
}
