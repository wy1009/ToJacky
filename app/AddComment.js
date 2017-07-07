import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import storage from './Storage.js'

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#888',
    borderBottomWidth: 1,
    borderBottomColor: '#888',
  },
  input: {
    height: 250,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    fontSize: 18,
    color: '#007aff',
    textAlign: 'center',
    marginTop: 15,
  },
})

export default class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
    }
  }

  submit () {
    storage.load({
      key: 'project',
      id: this.props.id,
    }).then(ret => {
      console.log(ret)
      ret.comments.push({
        content: this.state.content,
        createTime: new Date().getTime(),
        updateTime: new Date().getTime(),
      })
      storage.save({
        key: 'project',
        id: this.props.id,
        data: ret,
      })
    })
  }

  render () {
    return (
      <View style={ styles.container }>
        <View style={ styles.inputContainer }>
          <TextInput
            multiline={ true }
            style={ styles.input }
            onChangeText={ (content) => this.setState({ content }) } />
        </View>
        <TouchableOpacity onPress={ () => this.submit() }><Text style={ styles.button }>确定</Text></TouchableOpacity>
      </View>
    )
  }
}