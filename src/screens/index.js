import React, { useContext, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { AuthContext } from '../context';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.Button`
  padding: 20px 10px;
  border-radius: 5px;
`;

export const Home = ({ navigation }) => {
  return (
    <Container>
      <Text>Master List Screen</Text>
      <Button
        title="Details"
        onPress={() =>
          navigation.push('AppHomeDetailsScreen', {
            name: 'React Native by Example',
          })
        }
      />
      <Button
        title="React Native School"
        onPress={() =>
          navigation.push('AppHomeDetailsScreen', {
            name: 'React Native by School',
          })
        }
      />
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </Container>
  );
};

export const Details = ({ route }) => (
  <Container>
    <Text>Details Screen</Text>
    {route.params?.name && <Text>{route.params.name}</Text>}
  </Container>
);

export const Search = ({ navigation }) => (
  <Container>
    <Text>Search Screen</Text>
    <Button
      title="Search 2"
      onPress={() => navigation.push('AppSearchScreen2')}
    />
    <Button
      title="To Home Detail From Search"
      onPress={() =>
        navigation.navigate('AppHomeTab', {
          screen: 'AppHomeDetailsScreen',
          params: { name: 'From Search' },
        })
      }
    />
    <Button
      title="Go To Profile"
      onPress={() => navigation.navigate('AppProfile')}
    />
  </Container>
);

export const Search2 = ({}) => (
  <Container>
    <Text>Search2 Screen</Text>
  </Container>
);

export const Profile = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  // NOTE: 因為 AppDrawerScreen 在跟 AuthScreen 切換時, Drawer Header 不能隱藏, 否者轉場效果會有閃跳問題
  // 這邊將透過隱藏子層 header, 並更新父層 header title 來解決此問題
  useLayoutEffect(() => {
    navigation.getParent().setOptions({
      headerTitle: 'Update your profile',
    });
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <Container>
      <Text>Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </Container>
  );
};

export const Splash = () => (
  <Container>
    <Text>Loading...</Text>
  </Container>
);

export const SignIn = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  return (
    <Container>
      <Text>Sign In Screen</Text>
      <Button title="Sign In" onPress={() => signIn()} />
      <Button
        title="Create Account"
        onPress={() => navigation.push('CreateAccount')}
      />
    </Container>
  );
};

export const CreateAccount = () => {
  const { signUp } = useContext(AuthContext);

  return (
    <Container>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
    </Container>
  );
};
