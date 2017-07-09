import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import storage from './Storage.js'
import AddComment from './AddComment.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
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
                <View>
                  <Text style={{ lineHeight: 30, }}>{ `${new Date(item.createTime).getFullYear()}年${new Date(item.createTime).getMonth()}月${new Date(item.createTime).getDate()}日` }</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <TouchableOpacity
                    onPress={ () => this.props.navigator.push({
                      component: AddComment,
                      title: `修改${ this.props.id }备注`,
                      passProps: {
                        id: this.props.id,
                        index: index,
                      }
                    }) }><Text style={{ lineHeight: 30, }}>修改</Text></TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 10, }}><Text style={{ lineHeight: 30, }}>删除</Text></TouchableOpacity>
                </View>
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