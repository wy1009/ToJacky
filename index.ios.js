import React, { Component } from 'react'
import { AppRegistry, NavigatorIOS } from 'react-native'
import ProjectList from './app/ProjectList.js'

export default class ToJacky extends Component {
  render () {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ProjectList,
          title: '项目列表',
          rightButtonTitle: '+1',
        }}
        style={{ flex: 1 }}
      />
    )
  }
}

AppRegistry.registerComponent('ToJacky', () => ToJacky)