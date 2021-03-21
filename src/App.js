import SelectBox from "./components/SelectFilter";
import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import DateFilter from "./components/DateFilter";
import ReactLoading from "react-loading";
import { Fade } from "react-animation-components";
import {
  FlagsResto,
  FlagsPrincipal,
  FlagsPrincipalEUR,
} from "./components/FlagComponents";
import MessageBox from "./components/MessageBox";

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
  const [error, setError] = useState(null);

  //Maneja la fecha del DatePicker
  const handleDateCallback = (date) => {
    if (date) {
      setYear(date.getFullYear());
      setMonth(date.getMonth() + 1);
      setDay(date.getDate());
    }
  };

  useEffect(() => {
    //Hace fetch al cargar la pagina por primera vez
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

  // Handler del boton buscar
  const searchHandler = () => {
    if (year && month && day && currency !== undefined) {
      fetch(`${BASE_URL}${year}-${month}-${day}?base=${currency}`)
        .then((res) => res.json())
        .then((data) => {
          setError(null);
          console.log("data", data);
          setCurrencyValues(
            Object.entries(data.rates).map((key) => {
              return key;
            })
          );
        })
        .catch((error) =>
          setError(
            error.message === "Cannot convert undefined or null to object"
              ? (error.message =
                  "Error 400: La divisa elegida es posterior a la fecha solicitada, o simplemente no hay registros de la fecha selccionada para la divisa elegida. No hay cotizaciones.")
              : null
          )
        );
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
      setNumberOfItemsShown(currencyValues.length);
    } else {
      setNumberOfItemsShown(4);
    }
  };

  // Filtros
  const USD = currencyValues.filter(([key]) => {
    return key === "USD";
  });

  const EUR = currencyValues.filter(([key]) => {
    if (currency !== "EUR") {
      return key === "EUR";
    } else {
      return null;
    }
  });

  const CAD = currencyValues.filter(([key]) => {
    return key === "CAD";
  });

  const GBP = currencyValues.filter(([key]) => {
    return key === "GBP";
  });

  // Devuelve las monedas que no sean GBP, USD, EUR o CAD
  // Por alguna razón que aún no comprendo no fue posible
  // resolver el mismo filtro en una sola función para el caso positivo
  // ya que solo devolvia el primer valor luego del return, incluso
  // copiando codigo y reemplazando !== por ===
  const filtered = currencyValues.filter(([key]) => {
    return key !== "CAD" && key !== "GBP" && key !== "USD" && key !== "EUR";
  });

  // Luego de filtrar las keys principales
  // las define en un array
  const a = [EUR, USD, CAD, GBP];

  // Se excluye EUR de las keys para pasarselas a .map;
  // ¿Por qué?: La API que utilizamos desgraciadamente
  // no devuelve un rate para EUR cuando EUR es la base (currency)
  // lo que hace que la app creashee, este array esquiva ese error
  // dandole a la app una alternativa si currency === EUR.
  const b = [USD, CAD, GBP];

  //Principales monedas
  const primeras =
    currencyValues.length > 0 && currency !== "EUR"
      ? a.slice(0, numberOfItemsShown).map((moneda) =>
          currency !== "EUR" ? (
            <li key={moneda[0][0]} value={moneda[0][1]}>
              {" "}
              <FlagsPrincipal moneda={moneda} />
              <strong>{moneda[0][0]}</strong>: {moneda[0][1].toFixed(3)}{" "}
            </li>
          ) : (
            "No se encontraron monedas"
          )
        )
      : currencyValues.length > 0 && currency === "EUR"
      ? b.slice(0, numberOfItemsShown).map((moneda) =>
          currency === "EUR" ? (
            <li key={moneda[0][0]} value={moneda[0][1]}>
              <FlagsPrincipalEUR moneda={moneda} />
              <strong>{moneda[0][0]}</strong>: {moneda[0][1].toFixed(3)}
            </li>
          ) : (
            "No se encontraron monedas"
          )
        )
      : null;

  // Todas las monedas que no son
  // las 4 principales
  const resto =
    currencyValues.length > 0
      ? filtered
          .sort()
          .slice(0, numberOfItemsShown)
          .map((moneda) => (
            <li key={moneda[0]} value={moneda[1]}>
              <FlagsResto moneda={moneda} />
              <strong>{moneda[0]}</strong>: {moneda[1].toFixed(3)}
            </li>
          ))
      : "No se encontraron monedas";

  //logs
  console.log("currencyValues:", currencyValues);
  console.log("currency: ", currency);
  console.log("loading", loading);
  console.log("numberOfItemsShown", numberOfItemsShown);
  console.log("year:", year, "month: ", month, "day ", day);

  return (
    <div className="card">
      <h1>Histórico de cotizaciones</h1>
      <SelectBox
        currencyValues={currencyValues}
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
              <hr />
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
              <Fade in>
                {!error && currency === "EUR" ? (
                  <li>
                    <img className="flag" src="/images/eur.png" alt=""></img>
                    <strong>EUR</strong>: 1.000
                  </li>
                ) : null}
                {error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : null}

                {!error && numberOfItemsShown <= 4 ? primeras : null}
                {!error && numberOfItemsShown > 4 ? primeras : null}
                {!error && numberOfItemsShown > 4 ? resto : null}
              </Fade>
            </ul>
            {!error && resto.length <= 4 ? (
              <button className="secondary" onClick={showMoreHandler}>
                Ver todas las cotizaciones
              </button>
            ) : !error && resto.length > 4 ? (
              <button className="secondary" onClick={showMoreHandler}>
                Ver menos cotizaciones
              </button>
            ) : error ? null : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
