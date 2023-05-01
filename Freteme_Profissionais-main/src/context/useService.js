import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
export const RideContext = createContext({});
const TrackRide = ({ children }) => {
  const [ride, setRide] = useState({});
  const [route, setRoute] = useState(null);
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);
  const RIDE_API = 'https://api.freteme.com/api/servicos?status=pendente';
  const fetchRideStatus = async () => {
    try {
      const { data: rideData } = await axios.get(RIDE_API);
      const pendingRides = rideData.filter(
        (ride) => ride.status === 'pendente'
      );
      if (pendingRides.length > 0) {
        setRide(pendingRides);
        setOrigem(pendingRides.endereco_origem);
        setDestino(pendingRides.endereco_destino);
      } else {
        setRide(null);
        setOrigem(null);
        setDestino(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    let intervalId = null;
    const fetchData = async () => {
      await fetchRideStatus();
      intervalId = setInterval(fetchRideStatus, 10000);
    };
    fetchData();
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <RideContext.Provider
      value={{
        ride,
        route,
        origem,
        destino
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export default TrackRide;
