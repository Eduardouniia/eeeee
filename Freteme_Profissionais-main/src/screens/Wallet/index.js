import {
  Action,
  ActionLabel,
  Actions,
  AddButton,
  AddLabel,
  BalanceContainer,
  Bold,
  Card,
  CardBody,
  CardDetails,
  CardInfo,
  EyeButton,
  Header,
  HeaderContainer,
  PaymentMethods,
  PaymentMethodsTitle,
  Title,
  UseBalance,
  UseBalanceTitle,
  UseTicketButton,
  UseTicketContainer,
  UseTicketLabel,
  Value,
  Wrapper
} from './styles';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  BackgroundSecondary,
  Gradiente,
  Primary
} from '../../components/Colors';
import React, { useContext, useEffect, useState } from 'react';
import { Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import User from '../../context/useUser';
import { Image } from 'native-base';

export default function Wallet(route) {
  const { user, id } = User();
  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);
  const [useBalance, setUseBalance] = useState(true);
  function handleToggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  function handleToggleUseBalance() {
    setUseBalance((prevState) => !prevState);
  }

  return (
    <Wrapper>
      <Header
        colors={useBalance ? [Gradiente, Primary] : ['#D3D3D3', '#868686']}
      >
        <HeaderContainer>
          <Title>Saldo Disponível</Title>

          <BalanceContainer>
            <Value>
              <Bold>{isVisible ? user.carteira : '----'}</Bold>
            </Value>
            <EyeButton onPress={handleToggleVisibility}>
              <Feather
                name={isVisible ? 'eye' : 'eye-off'}
                size={28}
                color={BackgroundSecondary}
              />
            </EyeButton>
          </BalanceContainer>

          <Actions>
            <Action>
              <TouchableOpacity
                onPress={() => navigation.navigate('Pix')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <MaterialCommunityIcons
                  name="cash"
                  size={28}
                  color={BackgroundSecondary}
                />
                <ActionLabel>Retirar</ActionLabel>
              </TouchableOpacity>
            </Action>
          </Actions>
        </HeaderContainer>
      </Header>

      <UseBalance>
        <UseBalanceTitle>Permitir Retirada</UseBalanceTitle>

        <Switch value={useBalance} onValueChange={handleToggleUseBalance} />
      </UseBalance>

      <PaymentMethods>
        <PaymentMethodsTitle>Forma de Retirada</PaymentMethodsTitle>

        <Card>
          <CardBody>
            <CardDetails>
              <CardInfo>
                Você pode retirar por pix e transferencia bancária!
              </CardInfo>
            </CardDetails>

            <Image
              alt=""
              source={require('../../../assets/img/pix.png')}
              width={100}
              height={35}
            />
          </CardBody>

          <AddButton>
            <AntDesign name="pluscircleo" size={30} color={Primary} />
            <TouchableOpacity onPress={() => navigation.navigate('Pix')}>
              <AddLabel>Retirar Saldo</AddLabel>
            </TouchableOpacity>
          </AddButton>
        </Card>

        <UseTicketContainer>
          <UseTicketButton>
            <MaterialCommunityIcons
              name="ticket-outline"
              size={20}
              color={Primary}
            />
            <UseTicketLabel>Usar código promocional</UseTicketLabel>
          </UseTicketButton>
        </UseTicketContainer>
      </PaymentMethods>
    </Wrapper>
  );
}
