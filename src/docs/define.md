
## 回调
根据业务场景不同, 客户端方法的回调分为传入回调函数以及返回Promise两种方式

### fn 回调函数
此种方式的回调, 在单次客户端方法调用场景中, 可能被调用多次, 接收参数为 `fn(data, err)`

#### fn回调参数
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | 成功时回调的数据     | object   | `{location: {name: 'xx', address: 'xx', distance: 10, lng: 116.32, lat: 40.033}}` |
| err       | 失败时回调的错误, 当为用户取消操作情况时, 存在 `cancelled` 属性     | object   | `{message: "错误消息"}` or `{cancelled: true}`   |

示例:
```javascript
client.openLocation(options, function(data, err) {
  if (data) {
    // success
  } else {
    // handle err
  }
})
```

### Promise 方式
此种回调方式的业务方法, 返回值为Promise, 在单次客户端方法调用场景中, 只会回调一次

#### 返回 Promise
| 参数      | 说明     | 类型      |  示例   |
|---------- |--------- |---------- |-------- |
| data      | resolve 时的数据    | object   | `{members: [{user_id: 11001, name: 'test1'}, ...]}` |
| err       | reject 时的错误     | object   | `{message: "错误消息"}` or `{cancelled: true}`   |

示例:
```javascript
client.getMembers(options).then(data => {
  // success
}).catch(err => {
  // handle err
})
```