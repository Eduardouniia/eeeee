import React, { useContext, useEffect, useMemo } from "react";
import Pending from "../../components/modal/Pending";
import { AuthContext } from "../../context/auth";
import useConfig from "../../libs/config";
import HandleServices from "../../libs/services";
import { Box, Image, Switch, Text, View } from "native-base";
import styles from "./styles";
import Accepted from "../../components/modal/Accepted";
const Modal = () => {
  const [config] = useConfig();
  const { user } = useContext(AuthContext);
  const { order } = HandleServices();
  const [work, setWork] = React.useState(false);

  if (order && order?.status == "pendente") {
    return <Pending order={order} user={user} />;
  } else if (order && order?.status != "pendente") {
    return <Accepted order={order} />;
  }
};

export default Modal;
