import { v4 as uuid } from "uuid";
const Weather = ({ data }) => {
  const items = [];
  let j = 0;
  for (let i = 0; i < data.list.length; i += 8, j += 8) {
    items.push(
      <div className="grid" key={uuid()}>
        <h2>Dans {j / 8} jours</h2>
        <img
          src={`http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`}
        ></img>
        <p>Min : {Math.floor(Math.ceil(data.list[i].main.temp_min))}°C</p>
        <p>Max : {Math.floor(Math.ceil(data.list[i].main.temp_max))}°C</p>
        <p>Humidité : {data.list[i].main.humidity}%</p>
      </div>
    );
  }
  return data && <div>{items}</div>;
};
export default Weather;
