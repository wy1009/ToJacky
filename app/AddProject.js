import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, DeviceEventEmitter } from 'react-native'
import storage from './Storage.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 16,
    color: '#666666',
  },
  input: {
    height: 36,
    borderWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  item: {
    marginTop: 15,
  },
  button: {
    fontSize: 18,
    color: '#007aff',
    textAlign: 'center',
  },
  red: {
    borderColor: '#ed4444',
  },
  tips: {
    color: '#ed4444',
    textAlign: 'right',
    marginTop: 6,
  }
})

export default class AddProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
      projectName: '',
      tipsShow: false,
    }
  }

  submit () {
    if (!this.state.projectName) {
      this.setState({
        tipsShow: true
      })
      return
    }
    
    storage.save({
      key: 'project',
      id: this.state.projectName,
      data: {
        comments: []
      }
    }).then(ret => {
      DeviceEventEmitter.emit('projectListRefresh')
    })

    this.props.navigator.pop()
  }

  render () {
    return (
      <View style={ styles.container }>
        <View>
          <Text style={ styles.label }>项目名称</Text>
        </View>
        <View style={ styles.item }>
          <TextInput
            style={ [styles.input, this.state.tipsShow ? styles.red : null ] }
            onChangeText={ (projectName) => {
              this.state.projectName = projectName
              this.state.tipsShow && this.setState({ tipsShow: false })
            } } />
        { this.state.tipsShow ? <Text style={ styles.tips }>请输入项目名称</Text> : null }
        </View>
        <View style={ styles.item }>
          <TouchableOpacity onPress={ () => this.submit() }><Text style={ styles.button }>确定</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}