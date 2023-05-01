import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../libs/default";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function User() {
  const [id, setId] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem("@user")
      .then((user) => {
        if (user) {
          const parsedUser = JSON.parse(user);
          setId(parsedUser.cliente_id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const { data, error, isLoading } = useSWR(
    `usuario?cliente_id=${id}`,
    fetcher,
    {
      refreshWhenHidden: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
    id: id,
  };
  0;
}
