import { StyleSheet } from 'react-native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const colorScheme = "dark";
export const theme = colorScheme == 'dark' ? { ...MD3DarkTheme} : { ...MD3LightTheme};

export const styles = StyleSheet.create({
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
      flex:0.79,
      display:"flex",
      flexDirection:"column",
      backgroundColor:"transparent",
      width:"100%",
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    weatherIconSection:{
      backgroundColor:"transparent",
      width:200,
      height:200,
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
    },
  });