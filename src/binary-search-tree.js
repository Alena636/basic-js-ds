const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null
  }

  root() {
    return this.tree //возвраащем корневой узел дерева
  }

  add(data ) { //добавляем узел с дата в дерево
    const node = new Node(data)
    if(this.tree === null) {
      this.tree = node
    } else {
      let cur = this.tree
      while(true) {
      if(data < cur.data) {//узнаем слева или справа его добавить
        if(cur.left === null) {
          cur.left = node
          break
        } else {
          cur = cur.left
        }
      } else if (data > cur.data) {
        if(cur.right === null) {
          cur.right = node
          break
        } else {
          cur = cur.right
        }
      }else {
        break
      }
      }
    }
  }

  has(data ) {//проверяем существует ли узел с дата
    return this.find(data) !== null
  }

  find( data ) {//находим узел в дереве
    if(this.tree === null) {
      return null
    }
    let list = this.tree
    if(list.data === data) {//если дата есть, то возвращаем узел
      return list
    } else {
      while(list) {
        if(list.data === data) {
          return list
        }else {
          if(data < list.data) {//проверяем справа и слева
            list = list.left
          }else {
            list = list.right
          }
        }
      }
    }
    return null
  }

  remove(data) {//удаляем узел с дата из дерева
    this.tree = removeList(this.tree, data)

    function removeList(list, data) { //составляем функцию
      if(!list) {
        return null
      }

      if(data < list.data) { //необходимо узнать слева или справа узел
        list.left = removeList(list.left, data)
        return list
      } else if(data > list.data) {
        list.right = removeList(list.right, data)
        return list
      } else {
        if(!list.left && !list.right) {
          return null
        }

        if(!list.left) {//если только справа узел
          list = list.right
          return list
        }

        if(!list.right) {//если только слева узел
          list = list.left
          return list
        }

        let rightMin = list.right
        while(rightMin.left) {
          rightMin = rightMin.left
        }

        list.data = rightMin.data
        list.right = removeList(list.right, rightMin.data)
        return list
      }
    }
  }

  min() { //возвращаем минимальное 
    let list = this.tree
    while(list.left !== null) {
      list = list.left
    }
    return list.data
  }

  max() {//возвраащем максимальное
    let list = this.tree
    while(list.right !== null) {
      list = list.right
    }
    return list.data
  }
}

module.exports = {
  BinarySearchTree
};