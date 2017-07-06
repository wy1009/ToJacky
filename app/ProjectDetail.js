import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'

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
      detailList: [
        { key: 1, createTime: '2015-06-08', visible: false },
        { key: 2, createTime: '2015-06-08', visible: false },
        { key: 3, createTime: '2015-06-08', visible: false },
        { key: 4, createTime: '2015-06-08', visible: false },
        { key: 5, createTime: '2015-06-08', visible: false },
        { key: 6, createTime: '2015-06-08', visible: false },
        { key: 7, createTime: '2015-06-08', visible: false },
        { key: 8, createTime: '2015-06-08', visible: false },
        { key: 9, createTime: '2015-06-08', visible: false },
        { key: 10, createTime: '2015-06-08', visible: false },
      ],
      showText: false
    }
  }

  toggleContentShow (index) {
    this.state.detailList[index].visible = !this.state.detailList[index].visible
    this.setState({
      detailList: this.state.detailList
    })
  }

  render () {
    return (
      <View style={ styles.container }>
        <FlatList
          data={ this.state.detailList }
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