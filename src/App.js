import { View, ScrollView } from 'react-native';
import { useState, useEffect, Fragment } from 'react';
import { PaperProvider, Surface, Text, Searchbar, Appbar, Divider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Location from 'expo-location';
import apiResponseRealtimeJSON from '../apiResponseJson.json'
import apiResponseForecastJSON from '../apiResponseForecastJson.json'
import { HomeScreen } from './Home.js'
import { CitiesScreen } from './CitiesScreen';
import {styles, theme } from './Stylesheet.js'

const Stack = createStackNavigator();

function SettingsPage(){
  return(
    <>
    </>
  )
}

async function apiCall(endpoint){
  try
  {
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    const response = await fetch(endpoint, options);
    let result = await response.json();
    return(result);
  }
  catch(error)
  {
    console.error('Error while querting api: ', error);
  }
}

export default function App() {

  const [showMenu, setMenu] = useState(false);

  const [locationCoords, setLocationCoords] = useState(null);
  const [apiResponseRealtime, setApiResponseRealtime] = useState(apiResponseRealtimeJSON);
  const [apiResponseForecast, setApiResponseForecast] = useState(apiResponseForecastJSON);
  const [citiesList, setCitiesList] = useState([apiResponseForecast.location.name]);

  const apiKey = "6533b15ba3e54edabfb141617231309";
  const allowApiCalls = false;

  useEffect( () => {
    (async() => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let retrievedLocation = await Location.getCurrentPositionAsync({});
      setLocationCoords(retrievedLocation);

      let longitude = retrievedLocation.coords.longitude;
      let latitude = retrievedLocation.coords.latitude;
      
      const baseUrlRealtime = "https://api.weatherapi.com/v1/current.json?"
      const key  = `key=${apiKey}`;
      const fieldsRealtime  = `&q=${latitude},${longitude}`;
      const apiUrlRealtime = baseUrlRealtime + key + fieldsRealtime;

      const baseUrlForecast = "https://api.weatherapi.com/v1/forecast.json?";
      const fieldsForecast = `&q=${latitude},${longitude}&days=7`;
      const apiUrlForecast = baseUrlForecast + key + fieldsForecast;
      
      if(allowApiCalls)
      {
        const dataRealtime = await apiCall(apiUrlRealtime);
        setApiResponseRealtime(dataRealtime);

        const dataForecast = await apiCall(apiUrlForecast);
        setApiResponseForecast(dataForecast);
      }

      console.log(apiResponseRealtime);
      setCitiesList[apiResponseRealtime.location.name];
    }
   )();
  }, []);
  
  return (
    <View style={{flex:1}}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          <Stack.Screen 
            name="HomeScreen" 
            options={{
              headerShown:false
            }}
            children={(props) => <HomeScreen {...props} 
                                  apiResponseRealtime={apiResponseRealtime} 
                                  apiResponseForecast={apiResponseForecast}
                                  showMenu={showMenu}
                                  setMenu={setMenu}
                                 />}
          />
          <Stack.Screen 
            name="Cities" 
            options={{
              headerShown:false
            }}
            children={(props) => <CitiesScreen {...props}
                                  citiesList={citiesList}
                                  setCitiesList={setCitiesList}
                                 />}
          />
          <Stack.Screen name="Settings" component={SettingsPage}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
