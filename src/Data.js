import axios from "axios";
import nice from "./c.png";
import "./Data.css";
import { useState, useRef } from "react";
import Weather from "./Weather";
function Data() {
  const [input, setInput] = useState("");
  const [photos, setPhotos] = useState();
  const [data, setData] = useState();
  const NameRef = useRef();
  // API KEY
  let API_KEY = process.env.REACT_APP_API_KEY;
  let API_KEY_SPLASH = process.env.REACT_APP_API_KEY1;
  // Fetch data openweather
  const fetchData = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input}&lang=fr&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        setData(response.data);
        //console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // Fetch data unsplash
    await axios
      .get(
        `https://api.unsplash.com/search/photos?query=${input}&client_id=${API_KEY_SPLASH}`
      )
      .then((response) => {
        setPhotos(response.data.results[0].urls.regular);
        document.body.style.color = "white";
      })
      .catch(function (error) {
        setPhotos(window.alert("Erreur pas de photo de ce lieu"));
        setPhotos(nice);
        document.body.style.color = "black";
      });
  };
  // For Enter value when press space
  function handleAddData(e) {
    if (e.keyCode === 13) {
      const name = NameRef.current.value;
      NameRef.current.value = null;
      fetchData();
    }
  }
  document.body.style.backgroundImage = `url(${photos})`;
  return (
    <section>
      <div className="test">
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
        <p></p>
        {data && (
          <div className="card">
            <Weather data={data} />
          </div>
        )}
      </div>
    </section>
  );
}

export default Data;
