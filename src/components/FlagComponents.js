import React from "react";

// Banderas para las 4 divisas principales
export const FlagsPrincipal = (props) => {
  return (
    <div>
      {props.moneda[0][0] === "CAD" ? (
        <img className="flag" src="/images/cad.png" alt=""></img>
      ) : props.moneda[0][0] === "USD" ? (
        <img className="flag" src="/images/usd.png" alt=""></img>
      ) : props.moneda[0][0] === "EUR" ? (
        <img className="flag" src="/images/eur.png" alt=""></img>
      ) : props.moneda[0][0] === "GBP" ? (
        <img className="flag" src="/images/gbp.png" alt=""></img>
      ) : null}
    </div>
  );
};

// Banderas para las 4 divisas principales en caso de que
// la base sea EUR
export const FlagsPrincipalEUR = (props) => {
  return (
    <div>
      {props.moneda[0][0] === "CAD" ? (
        <img className="flag" src="/images/cad.png" alt=""></img>
      ) : props.moneda[0][0] === "USD" ? (
        <img className="flag" src="/images/usd.png" alt=""></img>
      ) : props.moneda[0][0] === "GBP" ? (
        <img className="flag" src="/images/gbp.png" alt=""></img>
      ) : null}
    </div>
  );
};

// Banderas para el resto de banderas, por favor, notificar si
// falta alguna, ya que es imposible testear fecha por fecha
// para verificar cuales monedas fueron cargadas a la API,
// existen muchas monedas que quedaron fuera de circulación
// con el paso del tiempo
export const FlagsResto = (props) => {
  return (
    <div>
      {props.moneda[0] === "AUD" ? (
        <img className="flag" src="/images/aud.png" alt=""></img>
      ) : props.moneda[0] === "BGN" ? (
        <img className="flag" src="/images/bgn.png" alt=""></img>
      ) : props.moneda[0] === "BRL" ? (
        <img className="flag" src="/images/brl.png" alt=""></img>
      ) : props.moneda[0] === "CHF" ? (
        <img className="flag" src="/images/chf.png" alt=""></img>
      ) : props.moneda[0] === "CNY" ? (
        <img className="flag" src="/images/cny.png" alt=""></img>
      ) : props.moneda[0] === "CZK" ? (
        <img className="flag" src="/images/czk.png" alt=""></img>
      ) : props.moneda[0] === "DKK" ? (
        <img className="flag" src="/images/dkk.png" alt=""></img>
      ) : props.moneda[0] === "HKD" ? (
        <img className="flag" src="/images/hkd.png" alt=""></img>
      ) : props.moneda[0] === "HRK" ? (
        <img className="flag" src="/images/hrk.png" alt=""></img>
      ) : props.moneda[0] === "HUF" ? (
        <img className="flag" src="/images/huf.png" alt=""></img>
      ) : props.moneda[0] === "IDR" ? (
        <img className="flag" src="/images/idr.png" alt=""></img>
      ) : props.moneda[0] === "ILS" ? (
        <img className="flag" src="/images/ils.png" alt=""></img>
      ) : props.moneda[0] === "INR" ? (
        <img className="flag" src="/images/inr.png" alt=""></img>
      ) : props.moneda[0] === "ISK" ? (
        <img className="flag" src="/images/isk.png" alt=""></img>
      ) : props.moneda[0] === "JPY" ? (
        <img className="flag" src="/images/jpy.png" alt=""></img>
      ) : props.moneda[0] === "KRW" ? (
        <img className="flag" src="/images/krw.png" alt=""></img>
      ) : props.moneda[0] === "MXN" ? (
        <img className="flag" src="/images/mxn.png" alt=""></img>
      ) : props.moneda[0] === "MYR" ? (
        <img className="flag" src="/images/myr.png" alt=""></img>
      ) : props.moneda[0] === "NOK" ? (
        <img className="flag" src="/images/nok.png" alt=""></img>
      ) : props.moneda[0] === "NZD" ? (
        <img className="flag" src="/images/nzd.png" alt=""></img>
      ) : props.moneda[0] === "PHP" ? (
        <img className="flag" src="/images/php.png" alt=""></img>
      ) : props.moneda[0] === "PLN" ? (
        <img className="flag" src="/images/pln.png" alt=""></img>
      ) : props.moneda[0] === "RON" ? (
        <img className="flag" src="/images/ron.png" alt=""></img>
      ) : props.moneda[0] === "RUB" ? (
        <img className="flag" src="/images/rub.jpg" alt=""></img>
      ) : props.moneda[0] === "SEK" ? (
        <img className="flag" src="/images/sek.png" alt=""></img>
      ) : props.moneda[0] === "SGD" ? (
        <img className="flag" src="/images/sgd.png" alt=""></img>
      ) : props.moneda[0] === "THB" ? (
        <img className="flag" src="/images/thb.png" alt=""></img>
      ) : props.moneda[0] === "TRY" ? (
        <img className="flag" src="/images/try.png" alt=""></img>
      ) : props.moneda[0] === "ZAR" ? (
        <img className="flag" src="/images/zar.png" alt=""></img>
      ) : props.moneda[0] === "LTL" ? (
        <img className="flag" src="/images/ltl.png" alt=""></img>
      ) : props.moneda[0] === "LVL" ? (
        <img className="flag" src="/images/lvl.png" alt=""></img>
      ) : props.moneda[0] === "MTL" ? (
        <img className="flag" src="/images/mtl.png" alt=""></img>
      ) : props.moneda[0] === "ROL" ? (
        <img className="flag" src="/images/ron.png" alt=""></img>
      ) : props.moneda[0] === "SIT" ? (
        <img className="flag" src="/images/sit.png" alt=""></img>
      ) : props.moneda[0] === "SKK" ? (
        <img className="flag" src="/images/skk.png" alt=""></img>
      ) : props.moneda[0] === "TRL" ? (
        <img className="flag" src="/images/try.png" alt=""></img>
      ) : props.moneda[0] === "EEK" ? (
        <img className="flag" src="/images/eek.png" alt=""></img>
      ) : props.moneda[0] === "CYP" ? (
        <img className="flag" src="/images/cyp.png" alt=""></img>
      ) : null}
    </div>
  );
};
