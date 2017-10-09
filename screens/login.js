import React from 'react'
import {View, Image, KeyboardAvoidingView, StyleSheet, Text, ActivityIndicator, ToastAndroid} from 'react-native'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Fumi } from 'react-native-textinput-effects'
import Button from 'apsl-react-native-button'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      signingIn: false,
    }
  }

  resetFields() {
    this.refs.usernameInput.clear()
    this.refs.passwordInput.clear()
    this.refs.usernameInput.focus()
  }

  getToken() {
    const {
      username,
      password

    } = this.state

    if (username === '') {
      this.refs.usernameInput.focus()
      ToastAndroid.show('Usuario requerido', ToastAndroid.SHORT)
      return
    } else if (password === '') {
      this.refs.passwordInput.focus()
      ToastAndroid.show('Contraseña requerida', ToastAndroid.SHORT)
      return
    }

    this.setState(() => {
      return { signingIn: true }
    })

    fetch('http://api.macchiato.cl/o/token/', {
      method: 'POST',
      body: `grant_type=password&username=${username}&password=${password}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic TjYxbVZSSnU1UXM0NGJ4VmZ5Tlp1TkZ4TUNXMDI4MDVDVVFzamQ3QjplRzFqSGJIcm56RUxpSjN3R0t0anBFWDcxZkxSTFhTVGxmRXV6OFFXSWxrYW1FY21iTkJnTjNrQ1AxOFlGYzd2OUVnR0s5M3dPMTRiUUVYRDVaZkdTMjVkVlZrMUVvcDV1SGoyblNTQWUza1V4ODRBNjd6N01xOXNTcmdrZGhPMw=='
      }
    })
      .then(
        response => response.json(),
        error => console.log(error)
      )
      .then(data => {
        this.setState(() => {
          return { signingIn: false }
        })

        if (data.hasOwnProperty('error')) {
          ToastAndroid.show("Credenciales inválidas", ToastAndroid.SHORT)
          this.resetFields()
        }

        console.log(data)
      })
  }

  render() {
    let buttonContent
    if (!this.state.signingIn) {
      buttonContent = <Text style={{
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 18
      }}>
        Ingresar
      </Text>
    } else {
      buttonContent = <ActivityIndicator color="white" size="large"/>
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding">

        <View>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Image
              resizeMode="contain"
              style={{
                width: 300,
                height: 150
              }}
              source={require('../img/banner-white.png')}/>
          </View>

          <View
            style={{
              margin: 20
            }}>
            <Fumi
              ref="usernameInput"
              label="Usuario"
              labelStyle={{fontFamily: 'Roboto'}}
              iconClass={FontAwesomeIcon}
              iconName={'user'}
              iconColor="#4CA2E8"
              iconSize={20}
              style={{
                height: 60,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderColor: 'black'
              }}
              keyboardType="email-address"
              returnKeyType="next"
              autoFocus={true}
              onChangeText={username => this.setState(() => { return { username } })}
              onSubmitEditing={() => this.refs.passwordInput.focus() }
            />
            <Fumi
              ref="passwordInput"
              label="Contraseña"
              labelStyle={{fontFamily: 'Roboto'}}
              iconClass={FontAwesomeIcon}
              iconName="key"
              iconColor="#4CA2E8"
              iconSize={20}
              style={{
                height: 60,
                marginTop: -1,
              }}
              secureTextEntry={true}
              onChangeText={(password) => this.setState(() => { return { password }})}
              onSubmitEditing={this.getToken.bind(this)}
            />

            <Button
              style={{
                marginTop: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: '#00a7aa',
                borderWidth: 0,
                height: 60
              }}
              onPress={this.getToken.bind(this)}>
              <View style={{flex: 1}}>
                {buttonContent}
              </View>
            </Button>
          </View>
        </View>

        <View style={{ height: 200 }} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4CA2E8',
    justifyContent: 'center',
    flex: 1
  },
  entry: {
    width: 100,
    borderBottomWidth: 1,
    height: 40,
    color: 'gray'
  }
})