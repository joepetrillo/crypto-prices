import { useEffect, useState } from "react"
import convertTime from "convert-time"
import Card from "./Card"
import "./App.css"

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cryptocurrencyliveprices.com/api/")
      .then(res => res.json())
      .then(res => {
        setData(res.slice(0, 30))
        setLoading(false)
      })
  }, []);

  function parseTime(time) {
    console.log(time);
    let hour = parseInt(time.split(":")[0]);
    hour -= 7;

    if (hour < 0) {
      hour += 24;
    }

    return convertTime(`${hour}${time.substring(2, 5)}`);
  }

  return (
    <div className="App">
      <header>
        <h1>Latest Cryptocurrency Prices</h1>
        {!loading && <h3>Last updated at {parseTime(data[0].coin_last_updated.substring(11, 16))} EST</h3>}
      </header>
      {!loading ?
        <div className="cards__wrapper">
          {data.map((curr, index) => (
            <Card key={index} coin={{ name: curr.coin_name, symbol: curr.coin_symbol }} price={curr.coin_price_usd} />
          ))}
        </div>
        : <h1>Loading</h1>}
    </div>
  )
}