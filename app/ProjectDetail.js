import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import storage from './Storage.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  content: {
    padding: 10,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
  },
})

export default class ProjectDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      commentList: []
    }

    this.getDetail()
  }

  // 钩子函数
  componentDidMount () {
    DeviceEventEmitter.addListener('projectDetailRefresh', () => this.getDetail())
  }

  // 其他函数
  getDetail () {
    storage.load({
      key: 'project',
      id: this.props.id,
    }).then(ret => {
      this.setState({
        commentList: ret.comments
      })
    })
  }

  toggleContentShow (index) {
    this.state.commentList[index].visible = !this.state.commentList[index].visible
    this.setState({
      commentList: this.state.commentList
    })
  }

  render () {
    return (
      <View style={ styles.container }>
        <FlatList
          data={ this.state.commentList }
          extraData={ this.state }
          keyExtractor={ (item) => item.createTime }
          renderItem={ ({ item, index }) => 
            <View>
              <TouchableOpacity
                style={ styles.label }
                onPress={ () => this.toggleContentShow(index) }>
                <Text style={{ lineHeight: 30, }}>{ `${new Date(item.createTime).getFullYear()}年${new Date(item.createTime).getMonth()}月${new Date(item.createTime).getDate()}日` }</Text>
              </TouchableOpacity>
              {
                item.visible ? (
                  <View style={ styles.content }>
                    <Text>{ item.content }</Text>
                  </View>
                ) : null
              }
            </View>
          }
        />
      </View>
    )
  }
}