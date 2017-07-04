import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class AddProject extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View>
        <View><Text>项目名称</Text></View>
        <View><TextInput /></View>
        <Button>确定</Button>
      </View>
    )
  }
}