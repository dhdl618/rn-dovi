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
  
  const FindPw = ({navigation}) => {
  
    // 이름, 전화번호, 아이디 값 저장
    const [username, setUsername] = useState('');
    const [phoneNum, setPhoneNum] = useState(0);
    const [userId, setUserId] = useState('');
  
    // 모달 열고 닫기 위한 boolean 값
    const [isModalVisible, setIsModalVisible] = useState(false)
  
    // 예시 이름, 전화번호, 아이디
    const name = 'abc'
    const phnum = '01012345678'
    const id = 'abc111'
  
    // 입력한 값과 기존에 존재하는 값이 일치하면 비밀번호 재설정 화면으로 이동
    const findUserId = () => {
        if(name == username && phnum === String(phoneNum) && id === userId) {
            console.log("비밀번호 찾기 성공")
            navigation.navigate('PasswordReset')
        } else {
            console.log("일치하는 정보가 없습니다.")
            setIsModalVisible(true)
        }
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
                <Text style={styles.header_title}>비밀번호 찾기</Text>
              </View>

              <View style={styles.body}>
                <View>
                  <Text style={styles.element}>이름</Text>
                  <View>
                    <TextInput
                      placeholder="이름을 입력해 주세요"
                      onChangeText={input => setUsername(input)}
                      value={username}
                      style={styles.text_input}
                      placeholderTextColor="rgb(180,180,180)"></TextInput>
                  </View>
                </View>

                <View>
                  <Text style={styles.element}>전화번호</Text>
                  <View>
                    <TextInput
                      placeholder="전화번호를 입력해 주세요"
                      onChangeText={input => setPhoneNum(input)}
                      keyboardType="number-pad"
                      style={styles.text_input}
                      placeholderTextColor="rgb(180,180,180)"></TextInput>
                  </View>
                </View>

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
              </View>
            </View>

            <View style={styles.foot}>
              <View style={styles.loginContainer}>
                <View style={styles.loginBtn}>
                  <TouchableOpacity onPress={findUserId}>
                    <Text style={styles.loginText}>비밀번호 찾기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          <View>
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
                      일치하는 정보가 없습니다
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
      justifyContent: 'space-between',
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
    foot: {
      marginTop: 200
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
  
  export default FindPw;
  