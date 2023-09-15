import { Fragment, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { PaperProvider, Surface, Text, Searchbar, Appbar, Divider } from 'react-native-paper';
import {styles, theme } from './Stylesheet.js'

function searchTextChanged(apiQueryInterval, text){
    clearInterval(apiQueryInterval.current);
    apiQueryInterval.current = undefined

    apiQueryInterval.current = setInterval( () => {
        queryApi(apiQueryInterval, text)
    }, 2000)
}

function queryApi(apiQueryInterval, text){
    console.log(text);
    clearInterval(apiQueryInterval.current);
    apiQueryInterval.current = undefined;
}

function CitiesPageCity({cityName}){
    return(
      <Surface style={{display:"flex",width:"100%", height:100, justifyContent:"center"}}>
        <View style={{marginLeft:"7%"}}>
          <Text variant='headlineLarge'>{cityName}</Text>
        </View>
      </Surface>
    )
  }
  
function CitySuggestion({ cityName }){
    return(
    <Surface style={{display:"flex",width:"100%", height:100, justifyContent:"center"}}>
        <View style={{marginLeft:"7%"}}>
            <Text variant='headlineLarge'>{cityName}</Text>
        </View>
    </Surface>
    )
}

export function CitiesScreen({ navigation, citiesList, setCitiesList }) {

    const tempLocations = ["abcde", "12345"];
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
            onChangeText={(userText) => {searchTextChanged(apiQueryInterval, userText)}}
            style={{marginBottom:7}}
          />
          {
            tempLocations.map((cityName, index) => (
                <CitySuggestion key={index} cityName={cityName}/>
            ))
          }
          <ScrollView style={{marginTop:25}}>
            {
              citiesList.map((city, index) => (
                <Fragment key={index} >
                  <CitiesPageCity cityName={city}/>
                  <Divider></Divider>
                </Fragment>
              ))
            }
          </ScrollView>
        </PaperProvider>
      </>
    )
  }