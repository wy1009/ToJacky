import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import storage from './Storage.js'
import ProjectDetail from './ProjectDetail.js'
import AddComment from './AddComment.js'

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
    storage.getIdsForKey('project').then(projectList => {
      this.setState({
        projectList: projectList
      })
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
          keyExtractor={ (item) => item }
          renderItem={ ({item}) => 
            <TouchableHighlight
              onPress={ () => this.navigateTo({
                component: ProjectDetail,
                title: item,
                rightButtonTitle: '+1',
                passProps: { id: item },
                onRightButtonPress: () => this.navigateTo({
                  component: AddComment,
                  title: `添加${ item }备注`,
                  passProps: { id: item }
                })
              }) }
              underlayColor='#ededed'>
              <View style={ styles.item }>
                <Text style={{ lineHeight: 30, }}>{ item }</Text>
              </View>
            </TouchableHighlight>
          }
        />
      </View>
    )
  }
}