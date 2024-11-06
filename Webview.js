// 뒤로가기 및 완전 종료 코드 추가
import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, Dimensions, StyleSheet, Alert, PermissionsAndroid, Platform, BackHandler, ToastAndroid} from 'react-native';
import WebView from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import Loading from './Loading';
import ExitApp from 'react-native-exit-app'; // 앱 종료 모듈

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Access Required",
          message: "This App needs to Access your location"
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const Webview = () => {

  const [currentLocation, setCurrentLocation] = useState(null);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const webviewRef = useRef(null);
  const [navState, setNavState] = useState({ url: '', canGoBack: false }); // 현재 URL과 뒤로 가기 여부 추적
  const [backPressedOnce, setBackPressedOnce] = useState(false); // 뒤로가기 입력 유무

// 위치 불러오기
  useEffect(() => {
    requestLocationPermission();
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // const lat_time = latitude-time
        // const lng_time = longitude+time
        setCurrentLocation({ latitude, longitude });

        const sendCurrentLocation = JSON.stringify({
          lat: latitude,  // 위도는 + 위쪽 - 아래쪽
          lng: longitude  // 경도는 + 오른쪽 - 왼쪽

          // lat: 37.0116265,  // 테스트용 위치 (한경대학교 기준)
          // lng: 127.2642483

          // lat: 36.9858271,
          // lng: 127.2675972 // 사용자간 경로 테스트 시작점

          // lat: 36.992790,
          // lng: 127.269574  // 사용자간 경로 테스트 중간지점

        });
        webviewRef.current?.postMessage(sendCurrentLocation);

        // console.log("내 좌표", latitude, longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );

    if (currentLocation) {
      setIsLoading(false);
    }

    const interval = setInterval(() => {
      setTime(time + 0.000000000001)
      // console.log("시간",time)
    }, 1500)

    return () => {
      Geolocation.clearWatch(watchId);
      clearInterval(interval);
    };
  }, [time]);

  // 뒤로가기 기능
  useEffect(() => {
    const backAction = () => {
      const isMainScreen = navState.url === 'https://react-tmap.netlify.app/';

      if ((isMainScreen || isLoading) && backPressedOnce) {
        ExitApp.exitApp(); // 메인 화면에서 뒤로 가기 두 번 시 앱 종료
      } else if (isMainScreen || isLoading) {
        ToastAndroid.show("버튼을 한 번 더 누르면 종료됩니다.", ToastAndroid.SHORT);
        setBackPressedOnce(true);
        setTimeout(() => setBackPressedOnce(false), 2000); // 2초 후 초기화
      } else if (navState.canGoBack) {
        webviewRef.current.goBack(); // 다른 화면에서 뒤로 가기
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [navState, backPressedOnce, isLoading]);

  // 뒤로가기 용 핸들러
  const handleNavigationStateChange = (navState) => {
    setNavState({ url: navState.url, canGoBack: navState.canGoBack });
  };

  const handleOnMessage = (e) => {
    console.log("location message", e.nativeEvent.data);
    Alert.alert(e.nativeEvent.data);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
        <WebView
          ref={webviewRef}
          style={styles.webview}
          // 로컬 호스트에서 react 파일을 띄어 실행
          // source={{uri: 'http://10.0.2.2:3000'}}
          // netlify로 배포한 사이트에서 실행
          source={{uri: 'https://react-tmap.netlify.app/'}}
          onNavigationStateChange={handleNavigationStateChange} // 뒤로가기 용 추가
          onMessage={handleOnMessage}></WebView>
    </SafeAreaView>
  );
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
});

export default Webview;
