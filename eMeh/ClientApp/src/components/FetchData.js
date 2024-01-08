import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const FetchData = () => {

  const navigate = useNavigate();

  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const renderForecastsTable = (forecasts) => {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      console.log('Category:', categoryParam);
    }
  }, [location]);

  useEffect(() => {
    const populateWeatherData = async () => {
      try {
        const response = await fetch('weatherforecast');
        if (response.status == 401){
          navigate("/login");
        }
        const data = await response.json(); 
        setForecasts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    populateWeatherData();
  }, []);

  let contents = loading ? <p><em>Loading...</em></p> : renderForecastsTable(forecasts);

  return (
    <div>
      <h1 id="tableLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      {contents}
    </div>
  );
};

export default FetchData;
