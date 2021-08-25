import { useEffect, useState } from "react";
//import "./styles.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState([]);

  const getData = () => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then(
        (data) => {
          setLoading(true);
          setCountries(data);
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  useEffect(() => {
    setFilterCountry(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="App">
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <ul>
          {filterCountry.map((country, idx) => (
            <li key={idx}>{country.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
