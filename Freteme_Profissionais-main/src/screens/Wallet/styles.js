import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled.View`
  background: #fafafa;
  flex: 1;
`;

export const Header = styled(LinearGradient)`
  height: 280px;
`;

export const HeaderContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'roboto';
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export const BalanceContainer = styled.View`
  margin: 5px 0;
  flex-direction: row;
  align-items: center;
`;

export const Value = styled.Text`
  font-family: 'roboto';
  font-size: 34px;
  color: #fff;
  font-weight: 200;
`;

export const Bold = styled.Text`
  font-family: 'roboto';
  font-weight: bold;
`;

export const EyeButton = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const Info = styled.Text`
  font-family: 'roboto';
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export const Actions = styled.View`
  flex-direction: row;
  margin-top: 40px;
`;

export const Action = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.6);
  width: 50%;
  height: 45px;
  border-radius: 10px;
  margin: 0 10px;
`;

export const ActionLabel = styled.Text`
  font-family: 'roboto';
  font-size: 14px;
  color: #fff;
  margin-left: 10px;
`;

export const UseBalance = styled.View`
  background: #fff;
  height: 60px;
  flex-direction: row;
  padding: 0 16px;
  align-items: center;
  justify-content: space-between;
`;

export const UseBalanceTitle = styled.Text`
  font-family: 'roboto';
  color: #121212;
  font-size: 14px;
  font-weight: 500;
  font-family: 'roboto';
`;

export const PaymentMethods = styled.View`
  margin-top: 25px;
  padding: 0 14px;
`;

export const PaymentMethodsTitle = styled.Text`
  font-family: 'roboto';
  color: #404040;
  font-size: 14px;
  text-transform: uppercase;
`;

export const Card = styled.View`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 10px;
`;

export const CardBody = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CardDetails = styled.View`
  flex: 1;
  margin-right: 20px;
`;

export const CardTitle = styled.Text`
  font-family: 'roboto';
  font-size: 14px;
  font-weight: bold;
  color: #121212;
`;

export const CardInfo = styled.Text`
  font-family: 'roboto';
  font-size: 14px;
  color: '#121212';
  margin-top: 15px;
  width: 105%;
`;

export const Img = styled.Image`
  width: 60px;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;

export const AddLabel = styled.Text`
  font-family: 'roboto';
  color: #4a87ea;
  font-size: 14px;
  font-weight: bold;
  margin-left: 15px;
`;

export const UseTicketContainer = styled.View`
  align-items: center;
  margin-top: 25px;
`;

export const UseTicketButton = styled.TouchableOpacity`
  flex-direction: row;
`;

export const UseTicketLabel = styled.Text`
  font-family: 'roboto';
  color: #4a87ea;
  font-size: 14px;
  font-weight: bold;
  margin-left: 15px;
  text-decoration-line: underline;
`;
