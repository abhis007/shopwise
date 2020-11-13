import React, { Component,useState,useEffect } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, View } from 'native-base';
import {
 StyleSheet,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserDetailsScreen from './screens/UserDetailsScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const QrStack = createStackNavigator();
const UserStack = createStackNavigator();
const App = () => {

  const [qrData, setQrData] = useState('');
  
  const getQrValue =async () => {
    try{
    const saved = await AsyncStorage.getItem('@storage_Key')
    
     if(saved!=null)
     setQrData(saved);
    }
    catch(e) {}
  }
  React.useEffect(()  => {
    getQrValue();
  }, [])


const QrStackScreen =()=>{
  alert('here');
  return (
<QrStack.Navigator
       initialRouteName="QrScreen"
        screenOptions={{
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#3f51b5',
        
      },
    }}
 

      >
      
          <QrStack.Screen
          name="QrScreen"
          component={QrScreen}
          options={{ headerShown: false }}
        />
    
        <QrStack.Screen
          name="User"
          component={UserDetailsScreen}
          
        />
       
    
    </QrStack.Navigator>
  )

}



const UserStackScreen =()=>{
  return (
  <UserStack.Navigator
        
          screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#3f51b5',
          
        },
      }}
   
  
        >
         <UserStack.Screen
            name="User"
            component={UserDetailsScreen}
            
          />
            <UserStack.Screen
            name="QrScreen"
            component={QrScreen}
            options={{ headerShown: false }}
          />
    </UserStack.Navigator>
  )
  
}

  const QrScreen =({ route,navigation }) =>{
    if(route.params)
    if(route.params.blnValueChange==true){
      getQrValue();
    }
    return (
    <Container>
    <Header>
      <Left>
        <Button transparent>
        <Icon
          name="shopping-basket"
          style={{ color: '#ffff', fontSize: 25 }}
        />
        </Button>
      </Left>
      <Body>
        <Title>Shopwise</Title>
      </Body>
      <Right />
    </Header>
    <Content>
    <View style={styles.content} > 
    <Text style={{marginBottom:10 , fontWeight: 'bold',}}>show this qrcode to shopkeeper</Text>
<QRCode
  value={(qrData)?qrData:'qr code not set properly'}
  
  
/>
</View>
    </Content>
    <Footer>
      <FooterTab>
        <Button full  onPress={ () =>  navigation.navigate('User')}>
          <Text>Edit</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>)
  }

alert(qrData)
 

 
    return (
    <NavigationContainer>
       {qrData ? <QrStackScreen /> : <UserStackScreen />}
    </NavigationContainer>
    );
}
 
  
 

export default App;
var styles = StyleSheet.create({
  content:{
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:100
  },
})
