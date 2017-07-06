import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import storage from './Storage.js'
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
      projectList: [],
    }
    storage.getAllDataForKey('project').then(projectList => {
      this.state.projectList = projectList
    })
  }

  navigateTo (route) {
    this.props.navigator.push(route)
  }

  render () {
    return (
      <View style={ styles.container }>
        <FlatList
          data={ this.state.projectList }
          renderItem={ ({item}) => 
            <TouchableHighlight
              onPress={ () => this.navigateTo({ component: ProjectDetail, title: item.key }) }
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