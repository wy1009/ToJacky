import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight, DeviceEventEmitter, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import storage from './Storage.js'
import ProjectDetail from './ProjectDetail.js'
import AddComment from './AddComment.js'
import TipsModal from './components/TipsModal.js'
import AddProject from './AddProject.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
      modalVisible: false,
      selectedProject: '',
      eventEmitter: null,
    }
    this.getList()
  }

  // 钩子函数
  componentDidMount () {
    this.state.eventEmitter = DeviceEventEmitter.addListener('projectListRefresh', () => this.getList())
  }

  componentWillUnmount () {
    this.state.eventEmitter.remove()
  }

  // 其他函数
  navigateTo (route) {
    this.props.navigator.push(route)
  }

  getList () {
    storage.getIdsForKey('project').then(projectList => {
      this.setState({
        projectList: projectList.slice().reverse(),
      })
    })
  }

  beforeDelProject (projectName) {
    this.state.selectedProject = projectName
    this.setState({ modalVisible: true })
  }

  delProject () {
    storage.remove({
      key: 'project',
      id: this.state.selectedProject,
    }).then(() => {
      this.getList()
      this.setState({ modalVisible: false })
    })
  }

  render () {
    return (
      <View style={ styles.container }>
        <TipsModal
          visible={ this.state.modalVisible }
          pressCancel={ () => this.setState({ modalVisible: false }) }
          pressOk={ () => this.delProject() }></TipsModal>
        <FlatList
          data={ this.state.projectList }
          extraData={ this.state }
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
                  passProps: { id: item },
                }),
              }) }
              underlayColor='#ededed'>
              <View style={ styles.item }>
                <Text style={{ lineHeight: 30, }}>{ item }</Text>
                <View style={{ flexDirection: 'row', }}>
                  <TouchableOpacity
                    onPress={ () => this.navigateTo({
                      component: AddProject,
                      title: `修改${ item }信息`,
                      passProps: {
                        id: item,
                        type: 'update',
                      },
                    }) }><Text style={{ lineHeight: 30 }}>修改</Text></TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 10 }}
                    onPress={ () => this.beforeDelProject(item) }><Text style={{ lineHeight: 30 }}>删除</Text></TouchableOpacity>
                </View>
              </View>
            </TouchableHighlight>
          }
        />
      </View>
    )
  }
}