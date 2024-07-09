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
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text>회원가입</Text>
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