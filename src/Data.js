import axios from "axios";
import { useState, useRef } from "react";
function Data() {
  const [input, setInput] = useState("");
  const [photos, setPhotos] = useState();
  const [data, setData] = useState();
  const NameRef = useRef();
  let API_KEY = process.env.REACT_APP_API_KEY;
  let API_KEY_SPLASH = process.env.REACT_APP_API_KEY1;
  const fetchData = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input}&lang=fr&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        setData(response.data.list[0]);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });

    await axios
      .get(
        `https://api.unsplash.com/search/photos?query=${input}&client_id=${API_KEY_SPLASH}`
      )
      .then((response) => {
        setPhotos(response.data.results[1].urls.regular);
      });
  };
  function handleAddData(e) {
    if (e.keyCode === 13) {
      const name = NameRef.current.value;
      NameRef.current.value = null;
      fetchData();
    }
  }
  return (
    <>
      <div className="inputCity">
        <label>Please enter your location: </label>
        <input
          onKeyDown={handleAddData}
          ref={NameRef}
          value={input}
          onInput={(e) => setInput(e.target.value)}
        />
        <button onClick={fetchData}>Submit</button>
      </div>
      {data && (
        <div className="card">
          <h2>Date: {data.dt_txt}</h2>
          <h3>{input}</h3>
          <p>Description: {data.weather[0].description}</p>
          <p>Temp min : {Math.round(data.main.temp_min)}</p>
          <p>Temp max : {Math.round(data.main.temp_max)}</p>
          <p>Humidité: {data.main.humidity}</p>
        </div>
      )}
      <p>
        <img src={photos} alt={input}></img>
      </p>
    </>
  );
}

export default Data;
