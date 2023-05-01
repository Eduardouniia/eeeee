import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  horizontalScale,
  scale,
  verticalScale
} from '../../../components/globalStyles';
import style from '../../../components/globalStyles';
import { AntDesign } from '@expo/vector-icons';
const CheckList = ({ check }) => {
  // Verifica se o parâmetro foi atingido para definir a cor de fundo dos círculos
  const backgroundColor = !check ? 'green' : style.lightGray;

  return (
    <View style={styles.container}>
      <View style={[styles.circulo, { backgroundColor }]}>
        <AntDesign name="check" size={15} color={style.white} />
      </View>
      <View style={styles.linha} />
      <View style={[styles.circulo, { backgroundColor }]}>
        <AntDesign name="check" size={15} color={style.white} />
      </View>
      <View style={styles.linha} />
      <View style={[styles.circulo, { backgroundColor }]}>
        <AntDesign name="check" size={15} color={style.white} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  circulo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(20),
    height: verticalScale(20),
    borderRadius: 10,

    marginVertical: verticalScale(5)
  },
  linha: {
    width: 1,
    height: verticalScale(20),
    backgroundColor: style.lightGray
  }
});

export default CheckList;
