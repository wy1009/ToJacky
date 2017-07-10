import React, { Component } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  font: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: '#fff',
    flexBasis: 300,
    borderRadius: 4,
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    padding: 20,
  },
  btnWrap: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ededed',
  },
  btn: {
    flexGrow: 1,
  },
  btnBorder: {
    borderLeftWidth:1,
    borderLeftColor: '#ededed',
  },
  btnText: {
    textAlign: 'center',
    lineHeight: 48,
  }
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
        <View style={ styles.container }>
          <View style={ styles.innerContainer }>
            <View><Text style={ [styles.title, styles.font] }>确定要删除吗？</Text></View>
            <View style={ styles.btnWrap }>
              <TouchableOpacity style={ styles.btn }
                onPress={ () => this.props.handleVisible(false) }>
                <Text style={ [styles.btnText, styles.font] }>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ [styles.btn, styles.btnBorder] }
                onPress={ () => this.props.pressOk() }>
                <Text style={ [styles.btnText, styles.font] }>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}