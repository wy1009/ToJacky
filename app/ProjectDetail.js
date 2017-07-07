import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
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
          renderItem={ ({ item, index }) => 
            <View>
              <TouchableOpacity
                style={ styles.label }
                onPress={ () => this.toggleContentShow(index) }>
                <Text style={{ lineHeight: 30, }}>{ item.createTime }</Text>
              </TouchableOpacity>
              {
                item.visible ? (
                  <View style={ styles.content }>
                    <Text>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
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