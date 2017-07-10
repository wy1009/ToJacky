import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

let storage = new Storage({
  size: 100000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
})

export default storage


/*

'project': {
  projectName: {
    comments: [{
      content: '',
      updateTime: '',
      createTime: '',
    }],
  }
}

*/