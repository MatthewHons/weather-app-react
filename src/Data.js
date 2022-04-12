import { useState } from "react";
function Data() {
  const [input, setInput] = useState(""); // '' is the initial state value
  let API_KEY = process.env.REACT_APP_API_KEY;
  let API_KEY_SPLASH = process.env.REACT_APP_API_KEY1;
  const fetchData = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${input}&lang=fr&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    await fetch(`https://api.unsplash.com/photos/?client_id=${API_KEY_SPLASH}`)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <p>Hello world</p>
      <label>Please specify:</label>
      <input value={input} onInput={(e) => setInput(e.target.value)} />
      <button onClick={fetchData}>Click</button>
    </div>
  );
}

export default Data;
