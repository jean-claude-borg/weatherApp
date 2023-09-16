import { View, ScrollView, Image} from 'react-native';
import { useState, useEffect, Fragment } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Location from 'expo-location';
import apiResponseRealtimeJSON from '../apiResponseJson.json'
import apiResponseForecastJSON from '../apiResponseForecastJson.json'
import { HomeScreen } from './Home.js'
import { CitiesScreen } from './CitiesScreen';
import {styles, theme } from './Stylesheet.js'
import PagerView from 'react-native-pager-view';

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

function HomePager({ apiResponseRealtime, apiResponseForecast, showMenu, setMenu, citiesList, loadingData }) {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  return (
    <>
    {/* background image */}
      <Image
        source={require("../assets/backgrounds/background2.jpg")}
        blurRadius={9}
        style={styles.background}
      />
      <PagerView
        style={{flex: 1}}
        onPageSelected={e => setSelectedPageIndex(e.nativeEvent.position)}
        initialPage={0}
      >
        { 
          citiesList.map((screen, index) => (
            <HomeScreen 
              key={index}
              apiResponseRealtime={screen.realTime} 
              apiResponseForecast={screen.forecast}
              showMenu={showMenu}
              setMenu={setMenu}
              loadingData={loadingData}
            />
          ))
        }
      </PagerView>
    </>
  );
}

export default function App() {
  const [showMenu, setMenu] = useState(false);

  const [locationCoords, setLocationCoords] = useState(null);
  const [apiResponseRealtime, setApiResponseRealtime] = useState(apiResponseRealtimeJSON);
  const [apiResponseForecast, setApiResponseForecast] = useState(apiResponseForecastJSON);
  const [citiesList, setCitiesList] = useState([{city: apiResponseForecast.location.name, country: apiResponseForecast.location.country, realTime: apiResponseRealtime, forecast: apiResponseForecast}]);
  const [loadingData, setLoadingData] = useState(true);

  const baseUrlRealtime = "https://api.weatherapi.com/v1/current.json?"
  const baseUrlForecast = "https://api.weatherapi.com/v1/forecast.json?";
  const apiKey = "6533b15ba3e54edabfb141617231309";
  const allowApiCalls = false;

  useEffect( () => {
    (async() => {
      setLoadingData(true);

      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let retrievedLocation = await Location.getCurrentPositionAsync({});
      setLocationCoords(retrievedLocation);

      let longitude = retrievedLocation.coords.longitude;
      let latitude = retrievedLocation.coords.latitude;
      
      const key  = `key=${apiKey}`;
      const fieldsRealtime  = `&q=${latitude},${longitude}`;
      const apiUrlRealtime = baseUrlRealtime + key + fieldsRealtime;

      const fieldsForecast = `&q=${latitude},${longitude}&days=7`;
      const apiUrlForecast = baseUrlForecast + key + fieldsForecast;
      
      if(allowApiCalls)
      {
        const dataRealtime = await apiCall(apiUrlRealtime);
        setApiResponseRealtime(dataRealtime);

        const dataForecast = await apiCall(apiUrlForecast);
        setApiResponseForecast(dataForecast);

        setCitiesList([{city: apiResponseForecast.location.name, country: apiResponseForecast.location.country, realTime: apiResponseRealtime, forecast: apiResponseForecast}]);
        setLoadingData(false);
      }
      else{
        setLoadingData(false);
      }
    }
   )();
  }, []);
  
  // setApiResponseRealtime(apiResponseRealtimeJSON);
  // setApiResponseForecast(apiResponseForecastJSON);
  // setCitiesList([{city: apiResponseForecast.location.name, country: apiResponseForecast.location.country, realTime: apiResponseRealtime, forecast: apiResponseForecast}]);
  // setLoadingData(false);

  return (
    <View style={{flex:1}}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen 
              name="HomeScreen" 
              options={{
                headerShown:false
              }}
              children={(props) => <HomePager {...props} 
                                    apiResponseRealtime={apiResponseRealtime} 
                                    apiResponseForecast={apiResponseForecast}
                                    showMenu={showMenu}
                                    setMenu={setMenu}
                                    citiesList={citiesList}
                                    loadingData={loadingData}
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
                                    apiCall={apiCall}
                                    setLoadingData={setLoadingData}
                                  />}
            />
            <Stack.Screen name="Settings" component={SettingsPage}/>
          </Stack.Navigator>
        </NavigationContainer>
    </View>
  );
}
