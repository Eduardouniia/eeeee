import { useState, useEffect, useContext } from "react";
import { useServer } from "./server";
import { AuthContext } from "../context/auth";
import { useNavigation } from "@react-navigation/native";

export default function handleService(limit, offset) {
  const navigation = useNavigation();
  const { getServices, real } = useServer();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const [encodedRoute, setEncodedRoute] = useState(null);
  const fetchData = (id) => {
    getServices(id, (error, response) => {
      if (error) {
        console.error("Error:", error);
      } else {
        if (response[0] !== order) {
          setOrder(response[0]);
        }
        if (response[0] && response[0].rota !== encodedRoute) {
          setEncodedRoute(response[0].rota);
        }
      }
    });
  };

  useEffect(() => {
    const id = user?.$id;

    fetchData(id);
  }, [real, user]);
  return { order, encodedRoute, setEncodedRoute };
}
