import { useEffect, useState } from "react"
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

  return (
    <div className="App">
      <header>
        <h1>Latest Cryptocurrency Prices</h1>
        {!loading && <h3>Last Updated at {data[0].coin_last_updated}</h3>}
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