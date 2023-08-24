import { createServer } from 'http'
import { exec } from 'child_process'

interface Dependency {
  name: string
  version: string
  // 其他属性...
}


//启动React应用程序
export function startReactApp() {
  const reactCommand = 'npm start'
  exec(reactCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`启动react应用失败：${error.message}`)
    } else {
      console.log('react应用启动成功')
    }
  })
}

export function startServer() {
  // 创建服务器
  const server = createServer(function (req, res) {
    // 处理请求并发送响应
    const responseData = {
      dependenciesData: {
        name: "react",
        version: "10.1",
        children: ["react-scripts"]
      }
    }
    const jsonData = JSON.stringify(responseData)
    res.end(jsonData)

  })
  // 启动服务器监听指定的端口
  const port = 3030 // 可以根据需要修改端口号
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}
