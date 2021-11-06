import "./Card.css"

function roundValue(value) {
    let num = value.toString().split(".");
    return num[0] + "." + num[1].substring(0, 3);
}

export default function Card({ coin: { name, symbol }, price }) {

    const imgURL = `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`

    return (
        <div className="card">
            <div className="card__branding">
                <img src={imgURL} alt={symbol} className="card__image" />
                <div className="card__name">{name}</div>
            </div>
            <div className="card__price">${roundValue(price)}</div>
        </div>
    );
}