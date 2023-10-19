import { useState, useEffect } from "react";

import "./App.css";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(null);
  const [baseCountry, setBaseCountry] = useState("USD");
  const [convertCountry, setConvertCountry] = useState("EUR");
  const [output, setOutput] = useState(null);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchAmount() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${baseCountry}&to=${convertCountry}`,
            { signal: controller.signal },
          );

          if (!res.ok) {
            throw new Error("Failed to calculate Real Time conversion.");
          }

          const data = await res.json();
          setOutput(data.rates[convertCountry]);
        } catch (err) {
          if (err.name !== "AbortError") {
            alert(err.message);
          }
        }
      }
      if (amount !== null) {
        fetchAmount();
      } else return;

      return function () {
        controller.abort();
      };
    },
    [amount, baseCountry, convertCountry],
  );
  return (
    <div>
      <input
      min={0}
        type="number"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select onChange={(e) => setBaseCountry(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="BRL">BRL</option>
      </select>
      <select onChange={(e) => setConvertCountry(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
        <option value="BRL">BRL</option>
      </select>
      <p>{output !== null && <p>Output:{output}</p>}</p>
    </div>
  );
}
