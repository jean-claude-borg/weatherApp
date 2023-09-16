import { StatusBar } from 'expo-status-bar';
import { Image, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Surface, Button, Text, IconButton, Menu } from 'react-native-paper';
import { styles, theme } from './Stylesheet.js'

function HeaderSection({ apiResponseRealtime, showMenu, setMenu, loadingData }) {

    if(loadingData)
        return;

    const cityName = apiResponseRealtime.location.name;
    const countryName = apiResponseRealtime.location.country;
    const navigation = useNavigation();

    return (
        <View style={styles.headerSection}>

            <View style={{ backgroundColor: "transparent", flex: 1 }}>
                <Text variant='displaySmall' style={styles.cityName}>{cityName}</Text>
                <Text variant='titleMedium' style={styles.countryName}>{countryName}</Text>
            </View>

            <Menu
                visible={showMenu}
                onDismiss={() => { setMenu(false) }}
                anchor={
                    <IconButton
                        icon={require('../assets/icons/settings-helper.png')}
                        style={{ transform: [{ rotate: '-90deg' }], justifyContent: "center", alignContent: "center" }}
                        mode='default'
                        size={25}
                        onPress={() => setMenu(true)}
                    />
                }>
                <Menu.Item onPress={() => { navigation.navigate("Cities") }} title="Cities" />
                <Menu.Item onPress={() => { navigation.navigate("Settings") }} title="Settings" />
            </Menu>
        </View>
    )
}

function WeatherIconSection({ iconLink }) {
    return (
        <View style={styles.weatherIconSection}>
            <Image
                // source={{ uri: `https:${iconLink}` }}
                source={require('../assets/icons/sunny2.png')}
                style={{ width: "100%", height: "100%" }}
            />
        </View>
    )
}

function WeatherOverviewSection({ apiResponseRealtime, loadingData }) {

    if(loadingData)
        return;

    const weatherDescriptionToday = apiResponseRealtime.current.condition.text;
    const weatherIconToday = apiResponseRealtime.current.condition.icon;
    const temperatureToday = Math.floor(apiResponseRealtime.current.temp_c);

    return (
        <View style={styles.weatherOverviewSection}>
            <WeatherIconSection iconLink={weatherIconToday} />
            <View style={{ display: "flex", flexDirection: "column", backgroundColor: "transparent" }}>
                <Text variant="displayLarge" style={{ alignSelf: "center" }}>{temperatureToday}{'\u00B0'}</Text>
                <Text variant="titleMedium" style={{ alignSelf: "center" }}>{weatherDescriptionToday}</Text>
            </View>
        </View>
    )
}

function DetailsSection({ apiResponseRealtime, loadingData }) {

    if(loadingData)
        return;

    const windSpeed = apiResponseRealtime.current.wind_kph;
    const precipitation = apiResponseRealtime.current.precip_mm;
    const uv = apiResponseRealtime.current.uv;

    return (
        <View style={styles.detailsSection}>
            <View style={{ backgroundColor: "transparent", flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                <Button
                    icon='weather-windy'
                    style={styles.detailIconStyle}
                />
                <Text style={{ fontWeight: "bold", marginLeft: -10 }}>{windSpeed}k/h</Text>
            </View>

            <View style={{ backgroundColor: "transparent", flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                <Button
                    icon='water-outline'
                    style={styles.detailIconStyle}
                />
                <Text style={{ fontWeight: "bold", marginLeft: -10 }}>{precipitation}mm</Text>
            </View>

            <View style={{ backgroundColor: "transparent", flex: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                <Button
                    icon='weather-sunny'
                    style={styles.detailIconStyle}
                />
                <Text style={{ fontWeight: "bold", marginLeft: -10 }}>{uv}</Text>
            </View>
        </View>
    )
}

function DayCard({ day, temperature, icon }) {
    return (
        <View style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "transparent", height: "100%", width: 70, paddingTop: 10 }}>
            <View style={{ alignItems: "center", width: "100%" }}>
                <Text variant='titleMedium'>{day}</Text>
            </View>

            <View style={{ paddingTop: 7, alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                <Image
                    source={{ uri: `https:${icon}` }}
                    style={{ width: 38, height: 38 }}
                />
            </View>

            <View style={{ alignItems: "center", width: "100%", paddingLeft: 5 }}>
                <Text variant='titleSmall'>{`${temperature}\u00B0`}</Text>
            </View>
        </View>
    )
}

function DailyForecastSection({ apiResponseRealtime, apiResponseForecast, loadingData }) {

    if(loadingData)
        return;

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

    return (
        <View style={{ width: "90%", height: 175, alignSelf: "center", justifyContent: "center" }}>
            <DetailsSection apiResponseRealtime={apiResponseRealtime}></DetailsSection>
            <Surface style={{ width: "100%", height: 155, borderRadius: 20, marginLeft: 0, alignSelf: "center" }}>
                <Text variant="titleSmall" style={{ marginBottom: 3, marginTop: 15, marginLeft: 25 }}>Daily Forecast</Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ backgroundColor: "transparent", width: "100%", maxHeight: "100%" }}
                >

                    <DayCard day={dayOfWeek1.substring(0, 3)} temperature={day1Temp} icon={day1Icon}></DayCard>
                    <DayCard day={dayOfWeek2.substring(0, 3)} temperature={day2Temp} icon={day2Icon}></DayCard>
                    <DayCard day={dayOfWeek3.substring(0, 3)} temperature={day3Temp} icon={day3Icon}></DayCard>
                    <DayCard day={dayOfWeek4.substring(0, 3)} temperature={day4Temp} icon={day4Icon}></DayCard>
                    <DayCard day={dayOfWeek5.substring(0, 3)} temperature={day5Temp} icon={day5Icon}></DayCard>
                    <DayCard day={dayOfWeek6.substring(0, 3)} temperature={day6Temp} icon={day6Icon}></DayCard>
                    <DayCard day={dayOfWeek7.substring(0, 3)} temperature={day7Temp} icon={day7Icon}></DayCard>

                </ScrollView>
            </Surface>
        </View>
    )
}

export function HomeScreen({ apiResponseRealtime, apiResponseForecast, showMenu, setMenu, loadingData }) {
    return (
        <>
            <StatusBar style='auto' />
            <PaperProvider theme={theme}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'top', alignItems: 'flex-start', backgroundColor: "transparent" }}>
                        { !loadingData &&
                        <>
                            <HeaderSection apiResponseRealtime={apiResponseRealtime} showMenu={showMenu} setMenu={setMenu} loadingData={loadingData} />
                            <WeatherOverviewSection apiResponseRealtime={apiResponseRealtime} loadingData={loadingData}/>
                            <DailyForecastSection apiResponseRealtime={apiResponseRealtime} apiResponseForecast={apiResponseForecast} loadingData={loadingData}/>
                        </>
                        }
                    </View>
                </SafeAreaView>
            </PaperProvider>
        </>
    )
}