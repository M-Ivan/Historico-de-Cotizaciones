import SelectBox from "./components/SelectFilter";
import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import DateFilter from "./components/DateFilter";
import ReactLoading from "react-loading";

const BASE_URL = "https://api.exchangeratesapi.io/";
function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currency, setCurrency] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [currencyValues, setCurrencyValues] = useState([]);
  const [numberOfItemsShown, setNumberOfItemsShown] = useState(4);
  const [loading, setLoading] = useState(true);

  const handleDateCallback = (date) => {
    if (date) {
      setYear(date.getFullYear());
      setMonth(date.getMonth() + 1);
      setDay(date.getDate());
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}latest?base=USD`)
      .then((res) => res.json())
      .then((data) => {
        setCurrencyOptions([...Object.keys(data.rates)]);
        setCurrency(data.base);
        setCurrencyValues(
          Object.entries(data.rates).map((key) => {
            return key;
          })
        );
        setLoading(false);
      });
  }, []);

  const searchHandler = () => {
    if (year && month && day && currency !== undefined) {
      fetch(`${BASE_URL}${year}-${month}-${day}?base=${currency}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrencyValues(
            Object.entries(data.rates).map((key) => {
              return key;
            })
          );
        });
    } else {
      fetch(`${BASE_URL}latest?base=${currency}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrencyValues(
            Object.entries(data.rates).map((key) => {
              return key;
            })
          );
        });
    }
  };

  //Boton ver mas
  const showMoreHandler = () => {
    if (numberOfItemsShown === 4) {
      setNumberOfItemsShown(+33);
    } else {
      setNumberOfItemsShown(4);
    }
  };

  // logs
  const USD = currencyValues.filter(([key]) => {
    return key === "USD";
  });
  const EUR = currencyValues.filter(([key]) => {
    return key === "EUR";
  });
  const CAD = currencyValues.filter(([key]) => {
    return key === "CAD";
  });
  const GBP = currencyValues.filter(([key]) => {
    return key === "GBP";
  });

  const a = [USD, EUR, CAD, GBP];

  const monedasPrincipal = a.slice(0, numberOfItemsShown).map((moneda) =>
    !loading ? ( //Principales monedas
      <li key={moneda[0]} value={moneda[0]}>
        {moneda[0][0]}: {moneda[0][1].toFixed(3)}
      </li>
    ) : null
  );

  const monedasTotal = currencyValues
    .sort()
    .slice(0, numberOfItemsShown)
    .map((moneda) =>
      !loading ? ( //Todas las monedas
        <li key={moneda[0][0]} value={moneda[0][1]}>
          {moneda[0]}: {moneda[1].toFixed(3)}
        </li>
      ) : null
    );
  console.log("currencyValues", currencyValues);
  console.log("loading", loading);
  console.log("numberOfItemsShown", numberOfItemsShown);
  console.log("Year:", year, "month: ", month, "day ", day);

  return (
    <div className="card">
      <h1>Historico de cotizaciones</h1>
      <SelectBox
        currencyOptions={currencyOptions}
        onChangeCurrency={(e) => setCurrency(e.target.value)}
      />
      <div>
        <DateFilter handleDateCallback={handleDateCallback} />
      </div>
      <div>
        <button className="primary" onClick={searchHandler}>
          Buscar cotizaciones
        </button>
        <div>
          <div>
            <div className="text">
              Cotizaciones para {currency} al dia de la fecha
              {year && month && day
                ? ": " + day + "-" + month + "-" + year
                : " actual"}
            </div>

            <ul className="text">
              {loading ? (
                <li>
                  <div className="loading">
                    <ReactLoading
                      type="spin"
                      color="#1656b6"
                      height={120}
                      width={120}
                    />
                  </div>
                </li>
              ) : null}
              {numberOfItemsShown <= 4 ? monedasPrincipal : null}
              {numberOfItemsShown > 4 ? monedasTotal : null}
            </ul>
            {monedasTotal.length <= 4 ? (
              <button className="secondary" onClick={showMoreHandler}>
                Ver todas las cotizaciones
              </button>
            ) : (
              <button className="secondary" onClick={showMoreHandler}>
                Ver menos cotizaciones
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
