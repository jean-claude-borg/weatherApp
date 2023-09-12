import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Input, Layout, Text, Icon, IconRegistry, Card} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

function HeaderSection(){
  return(
    <Layout style={styles.headerSection}>
      <Layout style={{backgroundColor:"transparent", flex:1}}>
        <Text category="h3" style={styles.cityName}>Valletta</Text>
        <Text category="s1" style={styles.countryName}>Malta</Text>
      </Layout>
      <Icon name='settings' style={{width:40, height:40}}/>
    </Layout>
  )
}

function WeatherIconSection(){
  return(
    <Layout style={styles.weatherIconSection}>
      <Image
        source={require("./assets/sunny.png")}
        style={{width:"95%", height: "90%"}}
      />
    </Layout>
  )
}

function WeatherOverviewSection(){
  return(
    <Layout style={styles.weatherOverviewSection}>
      <WeatherIconSection/>
      <Layout style={{display:"flex", flexDirection:"column", backgroundColor:"transparent"}}>
        <Text category="h1" style={styles.cityName}>35{'\u00B0'}</Text>
        <Text category="s1" style={styles.countryName}>Partly Cloudy</Text>
      </Layout>
    </Layout>
  )
}

function DetailsSection(){
  return(
    <Layout style={styles.detailsSection}>

      <Layout style={{backgroundColor:"transparent", flex:1, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <Icon
          name='droplet-outline'
          style={styles.detailIconStyle}
        />
        <Text style={{fontWeight:"bold"}}>25%</Text>
      </Layout>

      <Layout style={{backgroundColor:"transparent", flex:1, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <Icon
          name='droplet-outline'
          style={styles.detailIconStyle}
        />
        <Text style={{fontWeight:"bold"}}>25%</Text>
      </Layout>

      <Layout style={{backgroundColor:"transparent", flex:1, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
        <Icon
          name='droplet-outline'
          style={styles.detailIconStyle}
        />
        <Text style={{fontWeight:"bold"}}>25%</Text>
      </Layout>
    </Layout>  
  )
}

function DailyForecastSection(){
  return(
    <Layout style={{backgroundColor:"rgba(50, 50, 50, 0.35)", width:"90%", height:175, borderRadius:20, marginLeft:0, alignSelf:"center",}}>
      <Text category='h6' style={{marginBottom:5, marginTop:15, marginLeft:25}}>Daily Forecast</Text>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor:"transparent", width:"100%", maxHeight:"100%"}}
      >
        <Card style={{width:90, backgroundColor:"rgba(255, 255, 255, 0)", borderColor:"transparent", borderRadius:25}}>
          <Text category='s1'>Mon</Text> 
          <Icon name='sun'/>
        </Card>
        <Card style={{width:90, backgroundColor:"rgba(255, 255, 255, 0)", borderColor:"transparent", borderRadius:25}}>
          <Text category='s1'>Tue</Text> 
          <Icon name='sun'/>
        </Card>
        <Card style={{width:90, backgroundColor:"rgba(255, 255, 255, 0)", borderColor:"transparent", borderRadius:25}}>
          <Text category='s1'>Wed</Text> 
          <Icon name='sun'/>
        </Card>
        <Card style={{width:90, backgroundColor:"rgba(255, 255, 255, 0)", borderColor:"transparent", borderRadius:25}}>
          <Text category='s1'>Thu</Text> 
          <Icon name='sun'/>
        </Card>
        <Card style={{width:90, backgroundColor:"rgba(255, 255, 255, 0)", borderColor:"transparent", borderRadius:25}}>
          <Text category='s1'>Fri</Text> 
          <Icon name='sun'/>
        </Card>
        <Card style={{width:90, backgroundColor:"rgba(255, 255, 255, 0)", borderColor:"transparent", borderRadius:25}}>
          <Text category='s1'>Sat</Text> 
          <Icon name='sun'/>
        </Card>
        <Card style={{width:90, backgroundColor:"rgba(255, 255, 255, 0)", borderColor:"transparent", borderRadius:25}}>
          <Text category='s1'>Sun</Text> 
          <Icon name='sun'/>
        </Card>
      </ScrollView>
    </Layout>
  )
}

function SearchBar(){
  return(
    <Input
      placeholder='Search Location'
    />
  )
}

export default function App() {
  return (
    <View style={{flex:1, position:"relative"}}>
      <IconRegistry icons={EvaIconsPack}/>
      <Image 
          source={require("./assets/background7.png")}
          blurRadius={55}
          style={styles.background}
        />
      <StatusBar style='auto' />
      <SafeAreaView style={{flex:1}}>
          <ApplicationProvider {...eva} theme={eva.dark}>
            <Layout style={{flex: 1, justifyContent: 'top', alignItems: 'flex-start', backgroundColor:"transparent"}}>
              <HeaderSection/>
              <WeatherOverviewSection/>
              <DailyForecastSection/>
              <DetailsSection/>
            </Layout>
          </ApplicationProvider>
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
    marginTop:"5.5%",
    // marginLeft:"5%",
  },
  countryName:{
    marginTop:"0.5%",
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
    width:250,
    height:250,
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
