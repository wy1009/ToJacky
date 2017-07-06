import React, { Component } from 'react'
import { AppRegistry, NavigatorIOS } from 'react-native'
import storage from './app/Storage.js'

import ProjectList from './app/ProjectList.js'
import AddProject from './app/AddProject.js'

export default class ToJacky extends Component {

  addProject () {
    this.refs.nav.push({
      component: AddProject,
      title: '添加项目',
    })
  }

  render () {
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute={{
          component: ProjectList,
          title: '项目列表',
          rightButtonTitle: '+1',
          onRightButtonPress: () => this.addProject()
        }}
        style={{ flex: 1 }}
      />
    )
  }
}

AppRegistry.registerComponent('ToJacky', () => ToJacky)