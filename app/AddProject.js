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
      projectName: '', // 输入的内容
      tipsShow: false,
      projectDetail: {}, // 项目的全部信息，因为哪怕只更新一项，也要整体更新，因此必须先取出全部信息
    }
  }

  getProjectDetail () {
    storage.load({
      key: 'project',
      id: this.props.id
    }).then(ret => {
      this.state.projectDetail = ret
    })
  }

  submit () {
    if (!this.state.projectName) {
      this.setState({
        tipsShow: true
      })
      return
    }
    
    if (this.props.type == 'update') {
      storage.remove({
        key: 'project',
        id: this.props.id
      })
      storage.save({
        key: 'project',
        id: this.state.projectName,
        data: this.state.projectDetail,
      }).then(ret => {
        DeviceEventEmitter.emit('projectListRefresh')
      })
    } else {
      storage.save({
        key: 'project',
        id: this.state.projectName,
        data: {
          projectName: this.state.projectName,
          comments: [],
        },
      }).then(ret => {
        DeviceEventEmitter.emit('projectListRefresh')
      })
    }

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
            defaultValue={ this.props.id }
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