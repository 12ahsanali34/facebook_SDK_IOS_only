

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import B from './B'
import { LoginManager , AccessToken , GraphRequestManager , GraphRequest} from "react-native-fbsdk";
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component{
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)
  }
async _fbLogin(){
  console.log('fb login hit')
  await LoginManager.logInWithReadPermissions(["public_profile"]).then(
    function(result) {
      if (result.isCancelled) {
        console.log("Login cancelled");
      } else {
        console.log(
          "Login success with permissions: " +
            result.grantedPermissions.toString()
        );
        console.log(
          result
        );
        AccessToken.getCurrentAccessToken().then(
          (data) => {
            console.log(data)
          }
        )
        const infoRequest = new GraphRequest(
          '/me',
          null,
          this._responseInfoCallback,
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    },
    function(error) {
      console.log("Login fail with error: " + error);
    }
  );
  // .catch(error)=>{
  //   console.log(error)
  // }
}
  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      console.log(error , 'error')
    } else {
      console.log(result , 'date')
    }
  }
  handler(name){
    alert(name)
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'red'}}>
        <B ref={instance => { this.B = instance}} parentText={'Ahsan Ali'} />
          <TouchableOpacity onPress={()=>{this._fbLogin();}}>
              <View style={{backgroundColor:'#000',width:100,height:100}}></View>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
