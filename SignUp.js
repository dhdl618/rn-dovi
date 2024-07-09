import {StyleSheet, Dimensions, TouchableOpacity, View, Text, Image, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'

const SignUp = ({navigation}) => {
  // 버튼 인식 확인용 콘솔
  const doCon = () => {
    console.log('눌림');
  };

  // 아이디가 존재한다는 가정 테스트용
  const existID = ['abcd123', 'abc111'];

  // 이름, 전화번호, 아이디, 비밀번호, 비밀번호 확인 값 정의
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState(0);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  // 아이디가 존재하는지 여부 확인
  const [isExistID, setIsExistID] = useState(false);

  // 입력한 아이디 값을 받아 기존 존재하는 아이디가 있는지 판별
  useEffect(() => {
    const exists = existID.some(id => id === userId);
    setIsExistID(exists);
  }, [userId]);

  // 비밀번호에 영문과 숫자가 있는지 확인
  const pwHasLetter = /[A-Za-z]/.test(password);
  const pwHasNum = /[0-9]/.test(password);

  // 아이디에 영문과 숫자가 있는지 확인
  const idHasLetter = /[A-Za-z]/.test(userId);
  const idHasNum = /[0-9]/.test(userId);

  // 아이디가 영문, 숫자의 조합이며 4자리 이상인지 판별
  const correctId = userId.length > 3 && idHasLetter && idHasNum;
  // 비밀번호가 영문, 숫자의 조합이며 8자리 이상인지 판별
  const correctPassword = password.length > 7 && pwHasLetter && pwHasNum;

  // 전화번호가 숫자를 제외한 문자나 기호가 들어있는지 판별
  const checkPhoneNum = /[^0-9]/.test(phoneNum);
  const correctPhoneNum =
    phoneNum.length >= 10 && phoneNum.length < 12 && !checkPhoneNum;

  // 유/무 버튼 클릭 시 clicked에 yes / no 값 전달
  const [clicked, setClicked] = useState(null);
  const handleClick = btnName => {
    setClicked(btnName);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
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
            <Text style={styles.header_title}>회원가입</Text>
          </View>

          <View style={styles.body}>
            <View>
              <Text style={styles.element}>이름</Text>
              <TextInput
                style={styles.text_input}
                placeholderTextColor="rgb(180,180,180)"
                onChangeText={input => {
                  setName(input);
                }}></TextInput>
            </View>
            <View>
              <Text style={styles.element}>전화번호</Text>
              <TextInput
                placeholder="'-' 제외하고 입력하세요"
                style={styles.text_input}
                placeholderTextColor="rgb(180,180,180)"
                keyboardType="number-pad"
                onChangeText={input => {
                  setPhoneNum(input);
                }}></TextInput>
            </View>

            <View>
              <Text style={styles.element}>아이디</Text>
              <View>
                <TextInput
                  placeholder="아이디를 입력해 주세요"
                  style={styles.text_input}
                  placeholderTextColor="rgb(180,180,180)"
                  onChangeText={input => setUserId(input)}
                  value={userId}></TextInput>
                {correctId && !isExistID && (
                  <Image
                    style={styles.checkIcon}
                    source={require('./assets/png/checkmark.png')}
                  />
                )}
              </View>
              {userId.length == 0 ? (
                <Text style={styles.elementInfo}>
                  영문, 숫자를 포함하여 4자리 이상
                </Text>
              ) : !correctId ? (
                <Text style={[styles.elementInfo, styles.errorElementInfo]}>
                  영문, 숫자를 포함하여 4자리 이상
                </Text>
              ) : isExistID ? (
                <Text style={[styles.elementInfo, styles.errorElementInfo]}>
                  이미 사용중인 아이디입니다
                </Text>
              ) : (
                <Text style={[styles.elementInfo, styles.correctElementInfo]}>
                  사용 가능한 아이디입니다
                </Text>
              )}
            </View>

            <View>
              <Text style={styles.element}>비밀번호</Text>
              <View>
                <TextInput
                  placeholder="비밀번호를 입력해 주세요"
                  style={styles.text_input}
                  onChangeText={input => setPassword(input)}
                  value={password}
                  secureTextEntry={true}
                  placeholderTextColor="rgb(180,180,180)"></TextInput>
                {correctPassword && (
                  <Image
                    style={styles.checkIcon}
                    source={require('./assets/png/checkmark.png')}
                  />
                )}
              </View>
              {password.length == 0 ? (
                <Text style={styles.elementInfo}>
                  영문, 숫자를 포함하여 8자리 이상
                </Text>
              ) : !correctPassword ? (
                <Text style={[styles.elementInfo, styles.errorElementInfo]}>
                  영문, 숫자를 포함하여 8자리 이상
                </Text>
              ) : (
                <Text style={{fontSize: 12}}></Text>
              )}
            </View>

            <View>
              <Text style={styles.element}>비밀번호 확인</Text>
              <View>
                <TextInput
                  placeholder="비밀번호를 한 번 더 입력해 주세요"
                  style={styles.text_input}
                  onChangeText={input => setRePassword(input)}
                  value={rePassword}
                  secureTextEntry={true}
                  placeholderTextColor="rgb(180,180,180)"></TextInput>
                {rePassword.length > 0 && rePassword === password && (
                  <Image
                    style={styles.checkIcon}
                    source={require('./assets/png/checkmark.png')}
                  />
                )}
              </View>
              {rePassword.length == 0 ? (
                <Text style={{fontSize: 12}}></Text>
              ) : rePassword === password ? (
                <Text style={[styles.elementInfo, styles.correctElementInfo]}>
                  비밀번호가 일치합니다
                </Text>
              ) : (
                <Text style={[styles.elementInfo, styles.errorElementInfo]}>
                  일치하지 않습니다
                </Text>
              )}
            </View>

            <View>
              <Text style={styles.element}>시각장애 유무</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={[
                    styles.disabilityBtn,
                    clicked === 'yes' ? styles.activeButton : null,
                  ]}
                  onPress={() => handleClick('yes')}>
                  <Text style={styles.btnText}>유</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.disabilityBtn,
                    clicked === 'no' ? styles.activeButton : null,
                  ]}
                  onPress={() => handleClick('no')}>
                  <Text style={styles.btnText}>무</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {name &&
          correctPhoneNum &&
          !isExistID &&
          correctId &&
          correctPassword &&
          password === rePassword &&
          clicked != null ? (
            <View style={styles.signUpContainer}>
              <View style={styles.signBtn}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Main');
                  }}>
                  <Text style={styles.signText}>가입하기</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.signUpContainer}>
              <View style={styles.signUpUnavailable}>
                <View>
                  <Text style={styles.signText}>가입하기</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container : {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff'
    }, 
    scrollContainer : {
        flexGrow: 1
    },
    header : {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    backImg : {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    header_title : {
        fontSize: 18,
        fontWeight: 'bold',
    },
    body : {
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
    },
    element: {
        marginTop: 15,
        marginBottom: 7,
        fontSize: 14,
        fontWeight: 'bold'
    },

    text_input: {
        backgroundColor: 'rgb(245,245,245)',
        height: 37,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 12,
        marginBottom: 7,
    }, 
    checkIcon: {
        position: 'absolute',
        right: 8,
        width: 18,
        height: 18,
        marginTop: 8
    },
    elementInfo : {
        fontSize: 12,
        color: 'rgb(155,155,155)'
    },
    errorElementInfo:{
        color: 'red'
    },
    correctElementInfo: {
        color: 'green'
    },
    disabilityBtn: {
        backgroundColor: 'rgb(240,240,245)',
        width: 44,
        height: 27,
        borderRadius: 13,
        justifyContent: 'center',
        marginRight: 5
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 13,
        fontWeight: 'bold'
    },
    activeButton: {
        backgroundColor: '#FFE600'
    },

    signUpContainer: {
        height: 60,
        marginTop: 25,
    },
    signBtn: {
        height: 60,
        backgroundColor: '#FFE600',
        borderRadius: 35,
        justifyContent: 'center'
    },
    signText: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'rgb(80,80,80)'
    },
    signUpUnavailable : {
        height: 60,
        backgroundColor: 'rgb(240,240,245)',
        borderRadius: 35,
        justifyContent: 'center'
    }
})

export default SignUp