var Mock = require('mockjs')
var data = Mock.mock([1, 23, 4])
    // 输出结果

//三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
Mock.mock(/goods\/goodAll/, 'post', (req) => {
    const { id } = JSON.parse(req.body)
    data.push(id)
    return {
        message: "请求成功",
        data: data
    }
})

Mock.mock(/goods\/goodAll/, 'get', (req) => {
    return {
        message: "请求成功",
        data: data
    }
})