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
    Modal
  } from 'react-native';
  import React from 'react';
  import {useState} from 'react';
  
  const PasswordReset = ({navigation}) => {
  
    // 입력받은 비밀번호, 비밀번호 확인 값 저장
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
  
    // 모달 열고 닫기 위한 boolean 값
    const [isModalVisible, setIsModalVisible] = useState(false)
  
    // 비밀번호에 영문과 숫자가 있는지 확인
    const pwHasLetter = /[A-Za-z]/.test(password);
    const pwHasNum = /[0-9]/.test(password);

    // 비밀번호가 영문, 숫자의 조합이며 8자리 이상인지 판별
    const correctPassword = password.length > 7 && pwHasLetter && pwHasNum;
    const shortPassword = password.length < 8
    const noNumOrLetter = (password.length > 7 && pwHasLetter && !pwHasNum) || (password.length > 7 && !pwHasLetter && pwHasNum)
    const passwordMismatch = password !== rePassword

    // 모달창 열기
    const changePassword = () => {
      setIsModalVisible(true)
    }
  
    // 모달창 닫고 로그인 화면으로 이동하는 함수
    const goLogin = () => {
      setIsModalVisible(false)
      navigation.navigate('Login')
    }

    // 모달창 닫기
    const closeModal = () => {
        setIsModalVisible(false)
    }
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
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
                <Text style={styles.header_title}>비밀번호 재설정</Text>
              </View>

              <View style={styles.body}>
                <View>
                  <Text style={styles.element}>비밀번호</Text>
                  <View>
                    <TextInput
                      placeholder="비밀번호를 입력해 주세요"
                      onChangeText={input => setPassword(input)}
                      value={password}
                      secureTextEntry={true}
                      style={styles.text_input}
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
                      onChangeText={input => setRePassword(input)}
                      value={rePassword}
                      secureTextEntry={true}
                      style={styles.text_input}
                      placeholderTextColor="rgb(180,180,180)"></TextInput>
                    {rePassword.length > 0 && !passwordMismatch && (
                      <Image
                        style={styles.checkIcon}
                        source={require('./assets/png/checkmark.png')}
                      />
                    )}
                  </View>
                  {rePassword.length == 0 ? (
                    <Text style={{fontSize: 12}}></Text>
                  ) : !passwordMismatch ? (
                    <Text
                      style={[styles.elementInfo, styles.correctElementInfo]}>
                      비밀번호가 일치합니다
                    </Text>
                  ) : (
                    <Text style={[styles.elementInfo, styles.errorElementInfo]}>
                      일치하지 않습니다
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.foot}>
            <View style={styles.loginContainer}>
              <TouchableOpacity
                onPress={changePassword}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>비밀번호 변경</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Modal
              animationType="fade"
              visible={isModalVisible}
              transparent={true}>
              <View style={styles.opacityView}>
                {shortPassword && (
                  <View style={styles.modalContainer}>
                    <View style={{marginBottom: 30}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          letterSpacing: 0.5,
                        }}>
                        8자리 이상 입력하세요
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={closeModal}
                      style={styles.closeModalBtn}>
                      <Text style={styles.closeModalText}>닫기</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {noNumOrLetter && (
                  <View style={styles.modalContainer}>
                    <View style={{marginBottom: 30}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          letterSpacing: 0.5,
                        }}>
                        문자와 숫자를 혼용하여 입력하세요
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={closeModal}
                      style={styles.closeModalBtn}>
                      <Text style={styles.closeModalText}>닫기</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {passwordMismatch && !shortPassword && !noNumOrLetter && (
                  <View style={styles.modalContainer}>
                    <View style={{marginBottom: 30}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          letterSpacing: 0.5,
                        }}>
                        비밀번호가 일치하지 않습니다
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={closeModal}
                      style={styles.closeModalBtn}>
                      <Text style={styles.closeModalText}>닫기</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {correctPassword && !passwordMismatch && (
                  <View style={styles.modalContainer}>
                    <View style={{marginBottom: 30}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          letterSpacing: 0.5,
                        }}>
                        비밀번호 변경이 완료되었습니다
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={goLogin}
                      style={styles.closeModalBtn}>
                      <Text style={styles.closeModalText}>로그인하기</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Modal>
          </View>

          {/* <View>
            <Modal
              animationType="fade"
              visible={isModalVisible}
              transparent={true}>
              <View style={styles.opacityView}>
                <View style={styles.modalContainer}>
                  <View style={{marginBottom: 30}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        letterSpacing: 0.5,
                      }}>
                      비밀번호가 일치하지 않습니다
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeModalBtn}>
                    <Text style={styles.closeModalText}>닫기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View> */}
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
      justifyContent: 'space-between',
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
    checkIcon: {
        position: 'absolute',
        right: 8,
        width: 18,
        height: 18,
        marginTop: 8
    },
    elementInfo: {
      fontSize: 12,
      color: 'rgb(155,155,155)'
    },
    errorElementInfo:{
        color: 'red'
    },
    correctElementInfo: {
        color: 'green'
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
  
    goSignUp: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
  
    goSignUpText: {
      fontSize: 12,
      color: 'rgb(110,110,110)',
      marginRight: 10,
    },
    goSignUpBtnText: {
      fontSize: 11,
      color: 'rgb(160,160,160)',
    },
  
  
    opacityView: {
      flex: 1,
      alignContent: "center",
      textAlignVertical: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)'
    },
    modalContainer : {
      marginTop: 220,
      margin: 30,
      backgroundColor: 'white',
      borderRadius: 30,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    searchedId: {
      marginBottom: 5,
      fontSize: 15, 
      letterSpacing: 0.5
    },
    closeModalBtn: {
      marginTop: 40,
      backgroundColor: '#FFE600',
      width: 150,
      height: 40,
      justifyContent: 'center',
      borderRadius: 30
    },
    closeModalText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgb(120,120,120)',
      textAlign: 'center'
    }
  });
  
  export default PasswordReset;
  