import React, { useState } from "react";
import axios from "axios";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightList from "../components/FlightList";

const Search = () => {
  const [flights, setFlights] = useState([]);

  const handleSearch = async (searchData) => {
    try {
      const response = await axios(
        `http://localhost:4000/api/flights/search?origin=${searchData.origin}&destination=${searchData.destination}&date=${searchData.date}`
      );
      const data = response.data;
      setFlights(data.payload.searchFlights);
      console.log(response);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <FlightSearchForm onSearch={handleSearch} />
      <FlightList flights={flights} />
    </div>
  );
};

export default Search;
