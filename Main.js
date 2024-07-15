import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: "bold" ,fontSize: 20, marginBottom : 50}}>5팀 SRP</Text>
      <Text style={{marginBottom: 20, fontSize: 20}}>에뮬레이터에서 띄우는 모습</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}
          style={{marginBottom: 20}}>
        <Text>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
        style={{marginBottom: 20}}>
        <Text>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FindId')}
        style={{marginBottom: 20}}>
        <Text>아이디 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FindPw')}
        style={{marginBottom: 20}}>
        <Text>비밀번호 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}
        style={{marginBottom: 20}}>
        <Text>비밀번호 재설정</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CurrentPosition')}
        style={{marginBottom: 20}}>
        <Text>현재위치 조회</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}
        style={{marginBottom: 20}}>
        <Text>티맵 조회</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Webview')}
        style={{marginBottom: 20}}>
        <Text>웹 뷰</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  });

export default Main