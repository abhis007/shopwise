import React, { Component,useState ,useEffect } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Text, Item, Input,View } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet,  Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function UserDetailsScreen({ navigation }) {
    const [visitorName, setVisitorName] = useState('');
    const [visitorPhone, setVisitorPhone] = useState('');
    const [visitorLocation, setVisitorLocation] = useState('');
    const [visitorTemperature, setVisitorTemperature] = useState('');
 

    React.useEffect(()  => {
      const getQrValue =async () => {
        try{
        const saved =   await AsyncStorage.getItem('@storage_Key')
   //     alert('ttty',saved)
         if(saved){
           
           console.log('asd',saved);
          var userDetails = saved.split(';');
          console.log('asd',userDetails);
          let name = userDetails[0].split("=")
          let phone = userDetails[1].split("=")
          let location = userDetails[2].split("=")
          console.log("name",name)
          if(name[0]=='SW-Name')
          setVisitorName(name[1])
          if(phone[0]=='SW-Phone')
          setVisitorPhone(phone[1])
          if(location[0]=='SW-Location')
          setVisitorLocation(location[1])

         }
        
        }
        catch(e) {}
      
      }
      getQrValue();
    }, [])
    const saveDataToAsycStorage=async (value)=>{
        await AsyncStorage.setItem('@storage_Key', value)
        const saved = await AsyncStorage.getItem('@storage_Key')
        
        console.log(saved);
    }

    const storeData =  (value) => {
        
let phhone=visitorPhone;
        let strErrors =""
        if(visitorName=="")
        strErrors+="*Name is Mandatory\n\n"
        if(visitorPhone=="")
        strErrors+="*Phone is Mandatory\n\n"
        if(visitorLocation=="")
        strErrors+="*Location is Mandatory"
        if(!Number.isInteger(parseInt(visitorPhone)))
            strErrors+="*Mobile number should be numeric"
        else
         if(visitorPhone.length!=10) 
         strErrors+="*Invalid Mobile number "

        if(strErrors!="")
        Alert.alert("Insufficient Data\n\n",strErrors)
        else{
        try {

        let qrValue ='SW-Name='+visitorName+';SW-Phone='+visitorPhone+';SW-Location='+visitorLocation;
        saveDataToAsycStorage(qrValue);
       navigation.navigate('QrScreen',{
         blnValueChange:true
       })
      //    await AsyncStorage.setItem('@storage_Key', qrValue)
        } catch (e) {
          // saving error
        }
    }
      }
    return (
        <Container>
        {/* <Header>
        <Left>
          <Button transparent>
            <Icon
              name="shopping-basket"
              style={{ color: '#ffff', fontSize: 25 }}
            />
          </Button>
        </Left>
          <Body>
            <Title>Showise Shops</Title>
          </Body>
          <Right />
        </Header> */}
        <Content>
        <Text style={styles.titleText}>Let me have your details</Text>
        <View style={{ flex: 1, flexDirection: 'column',marginTop:10,padding:12 }}>
        <Item rounded>
            <Input placeholder='Name'  onChangeText={visitorName => setVisitorName(visitorName)}
        defaultValue={visitorName}/>
          </Item>
          <Item rounded style={{marginTop:10}}>
            <Input placeholder='Phone'  onChangeText={visitorPhone => setVisitorPhone(visitorPhone)}
        defaultValue={visitorPhone}/>
          </Item>
          <Item rounded style={{marginTop:10}}>
            <Input placeholder='Location'  onChangeText={visitorLocation => setVisitorLocation(visitorLocation)}
        defaultValue={visitorLocation}/>
          </Item>
          

          <Button rounded success block style={{marginTop:15}}  onPress={storeData}> 
            <Text>Save</Text>
          </Button>
        </View>
        </Content>
    
      </Container>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      alignItems: 'center',
    },
    titleText: {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold',
      marginTop: 16,
    },
    textStyle: {
      color: '#3a3a3a',
      fontSize: 16,
      textAlign: 'center',
      padding: 10,
      marginTop: 16,
    },
    buttonStyle: {
      fontSize: 16,
      color: 'white',
      backgroundColor: 'green',
      padding: 5,
      minWidth: 250,
    },
    buttonTextStyle: {
      padding: 5,
      color: 'white',
      textAlign: 'center',
    },
    textLinkStyle: {
      color: 'blue',
      paddingVertical: 20,
    },
  });
  
