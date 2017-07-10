import React, { Component } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {}
})

export default class TipsModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Modal
        animationType={ 'fade' }
        transparent={ true }
        visible={ this.props.visible }>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .6)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: '#fff', flexBasis: 300, borderRadius: 4, overflow: 'hidden' }}>
            <View><Text style={{ textAlign: 'center', padding: 20, fontSize: 16 }}>确定要删除吗？</Text></View>
            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ededed' }}>
              <TouchableOpacity style={{ flexGrow: 1, }}><Text style={{ textAlign: 'center', lineHeight: 48, fontSize: 16 }}>取消</Text></TouchableOpacity>
              <TouchableOpacity style={{ flexGrow: 1, borderLeftWidth:1, borderLeftColor: '#ededed' }}><Text style={{ textAlign: 'center', lineHeight: 48, fontSize: 16 }}>确定</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}