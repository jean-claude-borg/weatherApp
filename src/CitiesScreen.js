import { Fragment, useRef, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { PaperProvider, Surface, Text, Searchbar, Appbar, Divider, Button, IconButton } from 'react-native-paper';
import {styles, theme } from './Stylesheet.js'

function searchTextChanged(apiQueryInterval, text, setSuggestedLocations, apiCall){
    clearInterval(apiQueryInterval.current);
    apiQueryInterval.current = undefined

    //queries the api for locations 1 second after the user stops typing in the search bar
    apiQueryInterval.current = setInterval( () => {
        updateSuggestedLocations(apiQueryInterval, text, setSuggestedLocations, apiCall)
    }, 1000)
}

function updateSuggestedLocations(apiQueryInterval, text, setSuggestedLocations, apiCall){
    const baseUrlLocations = "https://api.weatherapi.com/v1/search.json?"
    const key  = "key=6533b15ba3e54edabfb141617231309";
    const fields  = `&q=${text}`;
    const apiUrlLocations = baseUrlLocations + key + fields;

    (async() => {
    //api only returns suggestions when more than 2 characters are supplied
    if(text.length > 2)
    {
      const retrievedLocations = await apiCall(apiUrlLocations);
      let tempArray = [];
      for(let i = 0; i < retrievedLocations.length; i++)
      {
        tempArray.push({city: retrievedLocations[i].name, country: retrievedLocations[i].country});
      }
      setSuggestedLocations(tempArray);
    }
    clearInterval(apiQueryInterval.current);
    apiQueryInterval.current = undefined;
  })();
}

function City({cityName, countryName, citiesList, setCitiesList}){
    return(
      <Surface style={{display:"flex", flexDirection:"row",width:"100%", height:100, alignItems:"center", justifyContent:"center", marginBottom:"1%"}}>
        <View style={{flex:1, marginLeft:"7%"}}>
          <Text variant='headlineSmall'>{cityName},</Text>
          <Text variant='titleMedium'>{countryName}</Text>
        </View>
        <IconButton 
          icon="trash-can-outline"
          onPress={() => {
            removeCityFromList(cityName, countryName, citiesList, setCitiesList);
          }}
        />
      </Surface>
    )
  }
  
function CitySuggestion({ suggestion, citiesList, setCitiesList, setShowSuggestions, apiCall, setLoadingData }){
    return(
    <Button 
      icon="map-marker"
      mode="contained-tonal"
      onPress={() => {
        addCityToCityList(suggestion.city, suggestion.country, citiesList, setCitiesList, apiCall, setLoadingData)
        setShowSuggestions(false);
      }}
      style={{display:"flex",width:"95%", height:75, alignItems:"center", justifyContent:"center", marginBottom:"1%", alignSelf:"center"}}>
        <Text variant='titleMedium'>{suggestion.city}, {suggestion.country}</Text>
    </Button>
    )
}

async function getCityInformation(city, apiCall)
{
  const apiKey = "6533b15ba3e54edabfb141617231309";
  const key  = `key=${apiKey}`;
  const baseUrlRealtime = "https://api.weatherapi.com/v1/current.json?"
  const baseUrlForecast = "https://api.weatherapi.com/v1/forecast.json?";
  const locationField = `&q=${city}`
  const locationFieldForecast = `&q=${city}&days=7`

  const apiUrlRealtime = baseUrlRealtime + key + locationField;
  const apiUrlForecast = baseUrlForecast + key + locationFieldForecast;

  const dataRealtime = await apiCall(apiUrlRealtime);
  const dataForecast = await apiCall(apiUrlForecast);

  return [dataRealtime, dataForecast];
}

async function addCityToCityList(city, country, citiesList, setCitiesList, apiCall, setLoadingData)
{
  setLoadingData(true);
  const [dataRealtime, dataForecast] = await getCityInformation(city, apiCall);
  const newArray = [...citiesList, {city: city, country: country, realTime: dataRealtime, forecast: dataForecast}];
  setCitiesList(newArray);
  setLoadingData(false);
}

function removeCityFromList(city, country, citiesList, setCitiesList)
{
  const newArray = citiesList.filter(location => !(location.city === city && location.country === country));
  setCitiesList(newArray);
}

export function CitiesScreen({ navigation, citiesList, setCitiesList, apiCall, setLoadingData }) {

    const [suggestedLocations, setSuggestedLocations] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const apiQueryInterval = useRef(undefined);

    return(
      <>
        <PaperProvider theme={theme}>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.navigate("HomeScreen")}} />
            <Appbar.Content title="Your Saved Cities" />
          </Appbar.Header>
          <Searchbar
            placeholder="Search For New City"
            mode="view"
            onChangeText={(userText) => {
              searchTextChanged(apiQueryInterval, userText, setSuggestedLocations, apiCall)
              setShowSuggestions(true);
            }}
            style={{marginBottom:7}}
          />
          { showSuggestions &&
            suggestedLocations.map((suggestion, index) => (
                <CitySuggestion key={index} 
                                suggestion={suggestion} 
                                citiesList={citiesList} 
                                setCitiesList={setCitiesList} 
                                setShowSuggestions={setShowSuggestions}
                                apiCall={apiCall}
                                setLoadingData={setLoadingData}
                  />
            ))
          }
          <ScrollView style={{marginTop:25}}>
            {
              citiesList.map((location, index) => (
                <Fragment key={index} >
                  <City cityName={location.city} countryName={location.country} citiesList={citiesList} setCitiesList={setCitiesList}/>
                  <Divider></Divider>
                </Fragment>
              ))
            }
          </ScrollView>
        </PaperProvider>
      </>
    )
  }