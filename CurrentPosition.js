import React, { useEffect, useState } from 'react'
import {Text, View, Platform, PermissionsAndroid} from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import Webview from './Webview'


const CurrentPosition = ({navigation}) => {

    const [currentLocation, setCurrentLocation] = useState(null)

    useEffect(() => {
        if(Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
        }
    }, [])

    useEffect(() => {
        const watchId = Geolocation.watchPosition(
            (position) => {
                const {latitude, longitude} = position.coords
                setCurrentLocation({latitude, longitude})
            },
            error => {
                console.log(error.code, error.message)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
        )
        return () => {
            Geolocation.clearWatch(watchId)
        }
    }, [])


  return (
    <View>
        {currentLocation ? (
            <View>
                <Text>Latitude : {currentLocation.latitude}</Text>
                <Text>Longitude : {currentLocation.longitude}</Text>
            </View>
        ) : (
            <Text>로딩중</Text>
        )}
    </View>
  )
}

export default CurrentPosition