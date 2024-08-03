import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import React from 'react';
import {useState} from 'react';

const Login = ({navigation}) => {

  // 아이디, 비밀번호 값 저장
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 성공 여부
  const [loginMismatch, setLoginMismatch] = useState('');

  // 예시 아이디, 비밀번호
  const id = 'abc111';
  const pw = 'a12345678';

  // 아이디, 비밀번호가 일치하면 로그인 성공, 메인화면 이동
  const login = () => {
    if (id === userId && pw === password) {
      console.log('로그인 성공');
      setLoginMismatch('');
      navigation.navigate('Main');
    } else {
      console.log('비밀번호가 올바르지 않습니다');
      setLoginMismatch('아이디 또는 비밀번호가 올바르지 않습니다');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>ScrollView
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('./assets/png/goback.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={styles.header_title}>로그인</Text>
          </View>

          <View style={styles.body}>
            <View>
              <Text style={styles.element}>아이디</Text>
              <View>
                <TextInput
                  placeholder="아이디를 입력해 주세요"
                  onChangeText={input => setUserId(input)}
                  value={userId}
                  style={styles.text_input}
                  placeholderTextColor="rgb(180,180,180)"></TextInput>
              </View>
            </View>

            <View>
              <Text style={styles.element}>비밀번호</Text>
              <View>
                <TextInput
                  placeholder="비밀번호를 입력해 주세요"
                  onChangeText={input => setPassword(input)}
                  value={password}
                  style={styles.text_input}
                  secureTextEntry={true}
                  placeholderTextColor="rgb(180,180,180)"></TextInput>
              </View>
              {loginMismatch.length < 1 ? (
                <Text></Text>
              ) : (
                <Text style={styles.elementInfo}>
                  {loginMismatch}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.goSignUpContainer}>
          <Text style={styles.goSignUpText}>회원이 아니신가요?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.goSignUpBtn}>회원가입</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.goOthersContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('FindId')}>
            <Text style={styles.goOthersBtn}>아이디 찾기</Text>
          </TouchableOpacity>
          <View style={styles.divideLineSector}>
            <Text style={styles.divideLine}>|</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('FindPw')}>
            <Text style={styles.goOthersBtn}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.loginBtn}>
            <TouchableOpacity onPress={login}>
              <Text style={styles.loginText}>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backImg: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  header_title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  body: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  element: {
    marginTop: 15,
    marginBottom: 7,
    fontSize: 14,
    fontWeight: 'bold',
  },
  text_input: {
    backgroundColor: 'rgb(245,245,245)',
    height: 37,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 12,
    marginBottom: 7,
  },
  elementInfo: {
    fontSize: 12,
    color: 'red',
  },

  loginContainer: {
    height: 60,
    marginBottom: 20,
  },

  loginBtn: {
    height: 60,
    backgroundColor: '#FFE600',
    borderRadius: 35,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(80,80,80)',
  },

  goSignUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  goSignUpText: {
    fontSize: 12,
    color: 'rgb(110,110,110)',
    marginRight: 10,
  },
  goSignUpBtn: {
    fontSize: 11,
    color: 'rgb(160,160,160)',
  },
  goOthersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  goOthersBtn: {
    fontSize: 11,
    color: 'rgb(120,150,50)',
    fontWeight: 'bold',
  },
  divideLineSector: {
    marginRight: 10,
    marginLeft: 10,
  },
  divideLine: {
    color: 'rgba(120,150,50,0.7)',
  },
});

export default Login;
