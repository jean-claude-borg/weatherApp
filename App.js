import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useState, useEffect} from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3LightTheme,
         MD3DarkTheme,
         PaperProvider, 
         Surface,
         Button,
         Text,
         IconButton, 
         Menu,
        } from 'react-native-paper';
import * as Location from 'expo-location';
import apiResponseRealtimeJSON from './apiResponseJson.json'
import apiResponseForecastJSON from './apiResponseForecastJson.json'


const colorScheme = "dark";

const theme = 
  colorScheme == 'dark'
  ? { ...MD3DarkTheme}
  : { ...MD3LightTheme};

function HeaderSection({apiResponseRealtime, showMenu, setMenu}){
  
  const cityName = apiResponseRealtime.location.name;
  const countryName = apiResponseRealtime.location.country;
  const icon1 = require('./assets/icons/settingsIcon.png');


  return(
    <View style={styles.headerSection}>
      <View style={{backgroundColor:"transparent", flex:1}}>
        <Text variant='displaySmall' style={styles.cityName}>{cityName}</Text>
        <Text variant='titleMedium' style={styles.countryName}>{countryName}</Text>
      </View>
      {/* <Button icon={icon1} 
              contentStyle={{flexDirection:"row-reverse", width:40, height:40}}
              style={{flex:0.02, width:40, height:40, flexDirection:"row-reverse"}}/> */}
      <Menu
        visible={showMenu}
        onDismiss={() => {setMenu(false)}}
        anchor={
            <IconButton icon="settings-helper" 
                      size={50} 
                      style={{backgroundColor:"transparent", transform: [{ rotate: '-90deg' }], alignSelf:"flex-start"}}
                      onPress={() => setMenu(true)}
          />
        }>
        <Menu.Item onPress={() => {}} title="Cities" />
        <Menu.Item onPress={() => {}} title="Settings" />
      </Menu>
    </View>
  )
}

function WeatherIconSection({iconLink}){
  return(
    <View style={styles.weatherIconSection}>
      <Image
        source={{ uri: `https:${iconLink}` }}
        style={{width:"95%", height: "90%"}}
      />
    </View>
  )
}

function WeatherOverviewSection({apiResponseRealtime}){

  if (!apiResponseRealtime) {
    return null;
  }

  const weatherCodeToday = apiResponseRealtime.current.condition.code;
  const weatherDescriptionToday = apiResponseRealtime.current.condition.text;
  const weatherIconToday = apiResponseRealtime.current.condition.icon;
  const temperatureToday = Math.floor(apiResponseRealtime.current.temp_c);

  return(
    <View style={styles.weatherOverviewSection}>
      <WeatherIconSection iconLink={weatherIconToday}/>
      <View style={{display:"flex", flexDirection:"column", backgroundColor:"transparent"}}>
        <Text variant="displayLarge" style={{alignSelf:"center"}}>{temperatureToday}{'\u00B0'}</Text>
        <Text variant="titleMedium" style={styles.countryName}>{weatherDescriptionToday}</Text>
      </View>
    </View>
  )
}

function DetailsSection({apiResponseRealtime}){

  const windSpeed = apiResponseRealtime.current.wind_kph;
  const precipitation = apiResponseRealtime.current.precip_mm;
  const uv = apiResponseRealtime.current.uv;

  return(
    <View style={styles.detailsSection}>
      <View style={{backgroundColor:"transparent", flex:1, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
        <Button
          icon='weather-windy'
          style={styles.detailIconStyle}
        />
        <Text style={{fontWeight:"bold", marginLeft:-10}}>{windSpeed}k/h</Text>
      </View>

      <View style={{backgroundColor:"transparent", flex:1, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
        <Button
          icon='water-outline'
          style={styles.detailIconStyle}
        />
        <Text style={{fontWeight:"bold", marginLeft:-10}}>{precipitation}mm</Text>
      </View>

      <View style={{backgroundColor:"transparent", flex:1, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"flex-start"}}>
        <Button
          icon='weather-sunny'
          style={styles.detailIconStyle}
        />
        <Text style={{fontWeight:"bold", marginLeft:-10}}>{uv}</Text>
      </View>
    </View>  
  )
}

function DayCard({day, temperature, icon}){
  return(
    <View style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"transparent", height:"100%", width:70, paddingTop:10}}>
      <View style={{alignItems:"center", width:"100%"}}>
        <Text variant='titleMedium'>{day}</Text>
      </View>

      <View style={{paddingTop:7, alignSelf:"center", alignItems:"center", justifyContent:"center"}}>
        <Image
          source={{ uri: `https:${icon}` }}
          style={{width:38, height: 38}}
        />
      </View>

      <View style={{alignItems:"center", width:"100%", paddingLeft:5}}>
        <Text variant='titleSmall'>{`${temperature}\u00B0`}</Text>
      </View>
    </View>
  )
}

function DailyForecastSection({apiResponseRealtime, apiResponseForecast}){

  const day1Temp = Math.floor(apiResponseForecast.forecast.forecastday[0].day.maxtemp_c);
  const day2Temp = Math.floor(apiResponseForecast.forecast.forecastday[1].day.maxtemp_c);
  const day3Temp = Math.floor(apiResponseForecast.forecast.forecastday[2].day.maxtemp_c);
  const day4Temp = Math.floor(apiResponseForecast.forecast.forecastday[3].day.maxtemp_c);
  const day5Temp = Math.floor(apiResponseForecast.forecast.forecastday[4].day.maxtemp_c);
  const day6Temp = Math.floor(apiResponseForecast.forecast.forecastday[5].day.maxtemp_c);
  const day7Temp = Math.floor(apiResponseForecast.forecast.forecastday[6].day.maxtemp_c);

  const day1Icon = apiResponseForecast.forecast.forecastday[0].day.condition.icon;
  const day2Icon = apiResponseForecast.forecast.forecastday[1].day.condition.icon;
  const day3Icon = apiResponseForecast.forecast.forecastday[2].day.condition.icon;
  const day4Icon = apiResponseForecast.forecast.forecastday[3].day.condition.icon;
  const day5Icon = apiResponseForecast.forecast.forecastday[4].day.condition.icon;
  const day6Icon = apiResponseForecast.forecast.forecastday[5].day.condition.icon;
  const day7Icon = apiResponseForecast.forecast.forecastday[6].day.condition.icon;

  //gets the weekday from the date for each date
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayOfWeek1 = days[new Date(apiResponseForecast.forecast.forecastday[0].date).getDay()];
  let dayOfWeek2 = days[new Date(apiResponseForecast.forecast.forecastday[1].date).getDay()];
  let dayOfWeek3 = days[new Date(apiResponseForecast.forecast.forecastday[2].date).getDay()];
  let dayOfWeek4 = days[new Date(apiResponseForecast.forecast.forecastday[3].date).getDay()];
  let dayOfWeek5 = days[new Date(apiResponseForecast.forecast.forecastday[4].date).getDay()];
  let dayOfWeek6 = days[new Date(apiResponseForecast.forecast.forecastday[5].date).getDay()];
  let dayOfWeek7 = days[new Date(apiResponseForecast.forecast.forecastday[6].date).getDay()];

  return(
    <View style={{width:"90%", height:175, alignSelf:"center", justifyContent:"center"}}>
      <DetailsSection apiResponseRealtime={apiResponseRealtime}></DetailsSection>
      <Surface style={{width:"100%", height:155, borderRadius:20, marginLeft:0, alignSelf:"center"}}>
        <Text variant="titleSmall" style={{marginBottom:3, marginTop:15, marginLeft:25}}>Daily Forecast</Text>
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          style={{backgroundColor:"transparent", width:"100%", maxHeight:"100%"}}
        >  

          <DayCard day={dayOfWeek1.substring(0,3)} temperature={day1Temp} icon={day1Icon}></DayCard>
          <DayCard day={dayOfWeek2.substring(0,3)} temperature={day2Temp} icon={day2Icon}></DayCard>
          <DayCard day={dayOfWeek3.substring(0,3)} temperature={day3Temp} icon={day3Icon}></DayCard>
          <DayCard day={dayOfWeek4.substring(0,3)} temperature={day4Temp} icon={day4Icon}></DayCard>
          <DayCard day={dayOfWeek5.substring(0,3)} temperature={day5Temp} icon={day5Icon}></DayCard>
          <DayCard day={dayOfWeek6.substring(0,3)} temperature={day6Temp} icon={day6Icon}></DayCard>
          <DayCard day={dayOfWeek7.substring(0,3)} temperature={day7Temp} icon={day7Icon}></DayCard>

        </ScrollView>
      </Surface>
    </View>
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

  const [showMenu, setMenu] = useState(false);

  const [locationCoords, setLocationCoords] = useState(null);
  const [apiResponseRealtime, setApiResponseRealtime] = useState(null);
  const [apiResponseForecast, setApiResponseForecast] = useState(null);

  const apiKey = "6533b15ba3e54edabfb141617231309";
  const allowApiRealtime = false;
  const allowApiForecast = false;

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

      if(allowApiRealtime)
      {
        const options = {method: 'GET', headers: {accept: 'application/json'}};
        try {
          fetch(apiUrlRealtime, options)
          .then(response => response.json())
          .then(data => {
            setApiResponseRealtime(data);
            console.log(JSON.stringify(data, null, 2));
        })
          .catch(err => console.error(err));
        } catch (err) {
            console.error(err);
        }
      }
      else{
        setApiResponseRealtime(apiResponseRealtimeJSON);
      }

      if(allowApiForecast)
      {
        const options = {method: 'GET', headers: {accept: 'application/json'}};
        try {
          fetch(apiUrlForecast, options)
          .then(response => response.json())
          .then(data => {
            setApiResponseForecast(data);
            console.log(JSON.stringify(data, null, 2));
        })
          .catch(err => console.error(err));
        } catch (err) {
            console.error(err);
        }
      }
      else{
        setApiResponseForecast(apiResponseForecastJSON);
      }

    }
   )();
  }, []);
  
  if(apiResponseRealtime === null)
    setApiResponseRealtime(apiResponseRealtimeJSON);

  if(apiResponseForecast === null)
    setApiResponseForecast(apiResponseForecastJSON);

  return (
    <View style={{flex:1, position:"relative"}}>
      <Image 
          source={require("./assets/backgrounds/background2.jpg")}
          blurRadius={9}
          style={styles.background}
        />
      <StatusBar style='auto' />
      <SafeAreaView style={{flex:1}}>
          <PaperProvider theme={theme}>
            <View style={{flex: 1, justifyContent: 'top', alignItems: 'flex-start', backgroundColor:"transparent"}}>
              <HeaderSection apiResponseRealtime={apiResponseRealtime} showMenu={showMenu} setMenu={setMenu}/>
              <WeatherOverviewSection apiResponseRealtime={apiResponseRealtime}/>
              {/* <DetailsSection apiResponse={apiResponse}/> */}
              <DailyForecastSection apiResponseRealtime={apiResponseRealtime} apiResponseForecast={apiResponseForecast}/>
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
    marginTop:"5%",
    alignContent:"center",
    justifyContent:"center"
  },
  cityName:{
    // marginTop:"12.5%",
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
    paddingLeft:15
  },
  detailIconStyle:{ 
    width: 38,
    height: 38,
  }
});
