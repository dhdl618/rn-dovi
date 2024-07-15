import React, { useRef, useState, useEffect } from 'react'
import {View, Text, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import WebView from 'react-native-webview'
import Geolocation, { getCurrentPosition } from 'react-native-geolocation-service'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const Webview = () => {

  const [currentLocation, setCurrentLocation] = useState(null)
  const [time, setTime] = useState(0)

  const webviewRef = useRef(null)

  // 위치 불러오기
    useEffect(() => {
      const watchId = Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const lat_time = latitude+time
          setCurrentLocation({ lat_time, longitude });

          const sendCurrentLocation = JSON.stringify({
            // lat: currentLocation?.latitude,
            // lng: currentLocation?.longitude
            lat: currentLocation?.lat_time,
            lng: 127.0846731
          })
          webviewRef.current.postMessage(sendCurrentLocation)
        
          console.log("내 좌표", lat_time, longitude);
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, 
          timeout: 20000, 
          maximumAge: 10000,
        },
      );

      const interval = setInterval(() => {
        setTime(time + 0.0001)
        console.log("시간",time)
      }, 1000)
  
      return () => {
        Geolocation.clearWatch(watchId);
        clearInterval(interval)
      };
    }, [time]);

  const handleOnMessage = (e) => {
    console.log("location message", e.nativeEvent.data)
    Alert.alert(e.nativeEvent.data)
    }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        style={styles.webview}
        // 로컬 호스트에서 react 파일을 띄어 실행
        // source={{uri: 'http://192.168.1.101:3000'}}

        // netlify로 배포한 사이트에서 실행
        source={{uri: 'https://react-tmap.netlify.app/'}}
        onMessage={handleOnMessage}></WebView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
})

export default Webview