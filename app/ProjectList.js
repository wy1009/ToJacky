import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    lineHeight: 30,
    borderWidth: 0.5,
    borderColor: '#ededed',
    paddingLeft: 10,
    marginHorizontal: 5,
  }
})

export default class ProjectList extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  render () {
    return (
      <View style={ styles.container }>
        <FlatList
          data={[
            { key: '项目一' },
            { key: '项目二' },
            { key: '项目三' },
            { key: '项目四' },
            { key: '项目五' },
            { key: '项目六' },
            { key: '项目七' },
            { key: '项目八' },
            { key: '项目九' },
            { key: '项目十' },
          ]}
          renderItem={ ({item}) => {
            <TouchableHighLight>
              <Text style={ styles.item }>{ item.key }</Text>
            </TouchableHighLight>
          } } 
        />
      </View>
    )
  }
}