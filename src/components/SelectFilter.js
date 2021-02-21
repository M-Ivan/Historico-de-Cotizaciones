import React from "react";

export default function SelectBox(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency } = props;

  return (
    <div>
      <div className="text">Seleccione una divisa</div>
      <div>
        <select
          className="large"
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {" "}
          <option disabled selected>
            Seleccione una divisa
          </option>
          {currencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
