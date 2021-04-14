import React, { Component } from 'react';
import { message, Button, Input, Modal, Tree } from 'antd';
import './App.css';

class App extends Component{
  // 数据
  state = {
    // treeData
    data: [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              { title: '0-0-0-0', key: '0-0-0-0' },
              { title: '0-0-0-1', key: '0-0-0-1' },
              { title: '0-0-0-2', key: '0-0-0-2' },
            ],
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              { title: '0-0-1-0', key: '0-0-1-0' },
              { title: '0-0-1-1', key: '0-0-1-1' },
              { title: '0-0-1-2', key: '0-0-1-2' },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          { title: '0-1-0-0', key: '0-1-0-0' },
          { title: '0-1-0-1', key: '0-1-0-1' },
          { title: '0-1-0-2', key: '0-1-0-2' },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      }
    ],
    // 编辑key
    editKey: '',
    // 编辑指
    editValue: '',
    // 编辑弹窗
    modalVisible: false
  }

  // 查找编辑Item
  findEditItem = (key, arrData) => {
    const queue = [...arrData]
    while (queue.length) {
      const o = queue.shift()
      if (o.key === key) return o
      queue.push(...(o.children || []))
    }
  }

  // 编辑
  handleEdit = (info) => {
    this.setState({
      editKey: info.key,
      editValue: '',
      modalVisible: true
    })
  }

  // 编辑-确定
  handleOk = () => {
    let { editKey, editValue } = this.state
    if(!editKey) {
      message.warn('请选择要编辑的节点！')
      this.setState({
        modalVisible: false
      })
      return
    }
    if(!editValue || !editValue.trim()) {
      message.warn('编辑值不能为空！')
      return
    }
    let data = [...this.state.data]
    let editItem = this.findEditItem(editKey, data)
    editItem.title = editValue.trim()
    this.setState({
      data,
      modalVisible: false
    }, () => {
      message.success('编辑成功')
    })
  }

  // 编辑-取消
  handleCancel = () => {
    this.setState({
      modalVisible: false
    })
  }

  // 编辑-输入
  handleChange = event => {
    this.setState({
      editValue: event.target.value
    })
  }

  // 节点渲染
  titleRender = info => {
    return (
      <div>
        <div>
          {info.title} <Button type="primary" size="small" onClick={() => this.handleEdit(info)}>编辑</Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="main">
        {/*树形控件*/}
        <Tree
          className="draggable-tree"
          blockNode
          treeData={this.state.data}
          titleRender={this.titleRender}
        />
        {/*编辑弹窗*/}
        <Modal title="编辑"
               visible={this.state.modalVisible}
               onOk={this.handleOk}
               onCancel={this.handleCancel}
        >
          <Input placeholder="请输入标题" value={this.state.editValue} onChange={this.handleChange}/>
        </Modal>
      </div>
    )
  }
}

export default App
