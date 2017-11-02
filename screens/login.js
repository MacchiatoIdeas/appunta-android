import React from 'react'
import {
  View, Image, KeyboardAvoidingView,
  StyleSheet, Text, ActivityIndicator,
  ToastAndroid

} from 'react-native'
import { connect } from 'react-redux'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Fumi } from 'react-native-textinput-effects'
import Button from 'apsl-react-native-button'
import { getToken, resetState } from "../actions/auth"
import { APPUNTA_COLOR } from '../constants'
import DarkerStatusBar from '../components/DarkerStatusBar'

@connect(
  state => ({
    auth: state.auth,
    authenticated: state.auth.authenticated,
    authenticationFailed: state.auth.authenticationFailed,
    error: state.auth.error,
    fetchingToken: state.auth.fetchingToken

  }), {
    getToken,
    resetState
  }
)
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

  handleLogin() {
    const {
      username,
      password

    } = this.state

    if (username === '') {
      this.refs.usernameInput.focus()
      ToastAndroid.show('Usuario requerido', ToastAndroid.SHORT)
      return
    }

    if (password === '') {
      this.refs.passwordInput.focus()
      ToastAndroid.show('Contraseña requerida', ToastAndroid.SHORT)
      return
    }

    const { getToken } = this.props
    getToken(username, password)
  }

  componentDidUpdate() {
    /*
    First attempt was to use shouldComponentUpdate(), but it didn't
    seem to get called after a change of state in redux (may be it
    uses forceUpdate() under the hood). This method gets called always
    after update/render, and it proves to be useful for our purposes.
     */

    const { authenticationFailed, authenticated, resetState } = this.props
    const { navigate } = this.props.navigation

    if (authenticationFailed) {
      this.resetFields()
      resetState()
    } else if (authenticated) {
      navigate('Courses')
    }
  }

  render() {
    const {
      authenticationFailed,
      fetchingToken,

    } = this.props

    let buttonContent
    if (!fetchingToken) {
      buttonContent =
        <Text style={{
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

    if (authenticationFailed) {
      ToastAndroid.show("Credenciales inválidas", ToastAndroid.SHORT)
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding">
        <DarkerStatusBar/>

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
              autoFocus
              onChangeText={username => this.setState(() => {
                return { username }
              })}
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
              onChangeText={(password) => this.setState(() => {
                return { password }
              })}
              onSubmitEditing={this.handleLogin.bind(this)}
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
              onPress={this.handleLogin.bind(this)}>
              <View style={{flex: 1}}>
                {buttonContent}
              </View>
            </Button>
          </View>
        </View>

        <View/>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: APPUNTA_COLOR,
    justifyContent: 'center',
    flex: 1,
  },
  entry: {
    width: 100,
    borderBottomWidth: 1,
    height: 40,
    color: 'gray'
  }
})