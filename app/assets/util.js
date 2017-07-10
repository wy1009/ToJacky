export default {
  copyObj (obj) {
    let newObj
    if (obj.constructor == Array) {
      newObj = []
      for (let item of obj) {
        if (item.constructor == Object || item.constructor == Array) {
          let tmp = this.copyObj(item)
          newObj.push(tmp)
        } else {
          newObj.push(item)
        }
      }
    } else {
      newObj = {}
      for (let key in obj) {
        if (obj[key].constructor == Object || obj[key].constructor == Array) {
          newObj[key] = this.copyObj(obj[key])
        } else {
          newObj[key] = obj[key]
        }
      }
    }

    return newObj
  }
}