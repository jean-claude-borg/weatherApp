import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useState, useEffect} from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3LightTheme,
         MD3DarkTheme,
         PaperProvider, 
         Card, 
         Surface,
         Button,
         Text, 
         IconButton
        } from 'react-native-paper';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import weatherCodes from './weatherCodes.json'
import apiResponseJSON from './apiResponseJson.json'

const colorScheme = "dark";

const theme = 
  colorScheme == 'dark'
  ? { ...MD3DarkTheme}
  : { ...MD3LightTheme};

function HeaderSection({cityName, countryName}){
  return(
    <View style={styles.headerSection}>
      <View style={{backgroundColor:"transparent", flex:1}}>
        <Text variant='displaySmall' style={styles.cityName}>{cityName}</Text>
        <Text variant='titleMedium' style={styles.countryName}>{countryName}</Text>
      </View>
      <Button icon='settings-helper' style={{width:40, height:40}}/>
    </View>
  )
}

function WeatherIconSection(){
  return(
    <View style={styles.weatherIconSection}>
      <Image
        source={require("./assets/sunny.png")}
        style={{width:"95%", height: "90%"}}
      />
    </View>
  )
}

function WeatherOverviewSection({apiResponse}){

  if (!apiResponse) {
    return null; // Or some loading state or error message
  }

  const weatherCodeToday = apiResponse.timelines.daily[0].values.weatherCodeMax;
  const weatherCodeTodayString = weatherCodes[weatherCodeToday];
  const temperatureToday = Math.floor(apiResponse.timelines.daily[0].values.temperatureAvg);
  console.log(weatherCodeTodayString);

  return(
    <View style={styles.weatherOverviewSection}>
      <WeatherIconSection/>
      <View style={{display:"flex", flexDirection:"column", backgroundColor:"transparent"}}>
        <Text variant="displayLarge" style={{alignSelf:"center"}}>{temperatureToday}{'\u00B0'}</Text>
        <Text variant="titleMedium" style={styles.countryName}>{weatherCodeTodayString}</Text>
      </View>
    </View>
  )
}

function DetailsSection(){
  return(
    <View style={styles.detailsSection}>

      <View style={{backgroundColor:"transparent", flex:1, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <Button
          icon='water-outline'
          style={styles.detailIconStyle}
        />
        <Text style={{fontWeight:"bold"}}>25%</Text>
      </View>

      <View style={{backgroundColor:"transparent", flex:1, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <Button
          icon='water-outline'
          style={styles.detailIconStyle}
        />
        <Text style={{fontWeight:"bold"}}>25%</Text>
      </View>

      <View style={{backgroundColor:"transparent", flex:1, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <Button
          icon='water-outline'
          style={styles.detailIconStyle}
        />
        <Text style={{fontWeight:"bold"}}>25%</Text>
      </View>
    </View>  
  )
}

function DailyForecastSection(){
  return(
    <Surface style={{width:"90%", height:155, borderRadius:20, marginLeft:0, alignSelf:"center",}}>
      <Text variant="titleSmall" style={{marginBottom:5, marginTop:15, marginLeft:25}}>Daily Forecast</Text>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor:"transparent", width:"100%", maxHeight:"100%"}}
      >  
        <View style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"transparent", height:"100%", width:70, paddingTop:10}}>
          <View style={{}}>
            <Text variant='titleMedium'>Mon</Text>
          </View>
          <View>
            <Text variant='titleSmall'>{`${27}\u00B0`}</Text>
          </View>
          <View>
            <IconButton icon="weather-sunny" size={30} style={{backgroundColor:"transparent"}}/>
          </View>
        </View>

        <View style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"transparent", height:"100%", width:70, paddingTop:10}}>
          <View style={{}}>
            <Text variant='titleMedium'>Tue</Text>
          </View>
          <View>
            <Text variant='titleSmall'>{`${27}\u00B0`}</Text>
          </View>
          <View>
            <IconButton icon="weather-sunny" size={30} style={{backgroundColor:"transparent"}}/>
          </View>
        </View>

        <View style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"transparent", height:"100%", width:70, paddingTop:10}}>
          <View style={{}}>
            <Text variant='titleMedium'>Wed</Text>
          </View>
          <View>
            <Text variant='titleSmall'>{`${27}\u00B0`}</Text>
          </View>
          <View>
            <IconButton icon="weather-sunny" size={30} style={{backgroundColor:"transparent"}}/>
          </View>
        </View>

        <View style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"transparent", height:"100%", width:70, paddingTop:10}}>
          <View style={{}}>
            <Text variant='titleMedium'>Thu</Text>
          </View>
          <View>
            <Text variant='titleSmall'>{`${27}\u00B0`}</Text>
          </View>
          <View>
            <IconButton icon="weather-sunny" size={30} style={{backgroundColor:"transparent"}}/>
          </View>
        </View>

        <View style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"transparent", height:"100%", width:70, paddingTop:10}}>
          <View style={{}}>
            <Text variant='titleMedium'>Fri</Text>
          </View>
          <View>
            <Text variant='titleSmall'>{`${27}\u00B0`}</Text>
          </View>
          <View>
            <IconButton icon="weather-sunny" size={30} style={{backgroundColor:"transparent"}}/>
          </View>
        </View>

        <View style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"transparent", height:"100%", width:70, paddingTop:10}}>
          <View style={{}}>
            <Text variant='titleMedium'>Sat</Text>
          </View>
          <View>
            <Text variant='titleSmall'>{`${27}\u00B0`}</Text>
          </View>
          <View>
            <IconButton icon="weather-sunny" size={30} style={{backgroundColor:"transparent"}}/>
          </View>
        </View>

        <View style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"transparent", height:"100%", width:70, paddingTop:10}}>
          <View style={{}}>
            <Text variant='titleMedium'>Sun</Text>
          </View>
          <View>
            <Text variant='titleSmall'>{`${27}\u00B0`}</Text>
          </View>
          <View>
            <IconButton icon="weather-sunny" size={30} style={{backgroundColor:"transparent"}}/>
          </View>
        </View>

      </ScrollView>
    </Surface>
  )
}

// function SearchBar(){
  //   return(
  //     <Input
//       placeholder='Search Location'
//     />
//   )
// }

export default function App() {

  const [locationCoords, setLocationCoords] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [countryName, setCountryName] = useState(null);

  const apiKey = "HtC2ft2sKgS1E6LTvWJT6aWsSVFbAl03";

  const allowApi = false;

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

      let locationData = await Location.reverseGeocodeAsync({ latitude, longitude });
      setCityName(locationData[0].city);
      setCountryName(locationData[0].country);
      
      if(allowApi)
      {
        const options = {method: 'GET', headers: {accept: 'application/json'}};
        try {
          fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&timesteps=1d&fields=weatherCode,temperature&units=metric&apikey=HtC2ft2sKgS1E6LTvWJT6aWsSVFbAl03`, options)
          .then(response => response.json())
          .then(response => setApiResponse(response))
          .catch(err => console.error(err));
          
          console.log(apiResponse);

        } catch (err) {
            console.error(err);
        }
      }
      else{
        setApiResponse(apiResponseJSON);
      }
    }
   )();
  }, []);

  return (
    <View style={{flex:1, position:"relative"}}>
      <Image 
          source={require("./assets/background2.jpg")}
          blurRadius={9}
          style={styles.background}
        />
      <StatusBar style='auto' />
      <SafeAreaView style={{flex:1}}>
          <PaperProvider theme={theme}>
            <View style={{flex: 1, justifyContent: 'top', alignItems: 'flex-start', backgroundColor:"transparent"}}>
              <HeaderSection cityName={cityName} countryName={countryName}/>
              <WeatherOverviewSection apiResponse={apiResponse}/>
              <DetailsSection/>
              <DailyForecastSection/>
            </View>
          </PaperProvider>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background:{
    position:"absolute",
    width:"100%",
    height:"100%",
    left:0,
    top:0
  },
  headerSection:{
    backgroundColor:"transparent",
    alignSelf:"center",
    display:"flex",
    flexDirection:"row",
    width:"90%",
    height:"9%",
    alignItems:"center"
  },
  cityName:{
    marginTop:"12.5%",
    // marginLeft:"5%",
  },
  countryName:{
    marginTop:"2%",
    marginLeft:"7%",
  },
  weatherOverviewSection:{
    flex:0.75,
    display:"flex",
    flexDirection:"row",
    backgroundColor:"transparent",
    width:"100%",
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  weatherIconSection:{
    backgroundColor:"transparent",
    width:220,
    height:220,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:"0%",
  },
  detailsSection:{
    display:"flex",
    flexDirection:"row",
    backgroundColor:"transparent",
    width:"100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailIconStyle:{ 
    width: 38,
    height: 38,
  }
});
