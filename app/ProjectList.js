import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

import ProjectDetail from './ProjectDetail.js'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    paddingLeft: 10,
    marginHorizontal: 5,
  },
})

export default class ProjectList extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      projectList: [
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
      ],
    }
  }

  _navigateTo (route) {
    this.props.navigator.push(route)
  }

  render () {
    return (
      <View style={ styles.container }>
        <FlatList
          data={ this.state.projectList }
          renderItem={ ({item}) => 
            <TouchableHighlight
              onPress={ () => this._navigateTo({ component: ProjectDetail, title: item.key }) }
              underlayColor='#ededed'>
              <View style={ styles.item }>
                <Text style={{ lineHeight: 30, }}>{ item.key }</Text>
              </View>
            </TouchableHighlight>
          }
        />
      </View>
    )
  }
}