const Koa = require('koa'),
      app = new Koa(),
      koaBody = require('koa-body'),
      os = require('os'),
      fs = require('fs'),
      path = require('path'),
      cors = require('koa2-cors')    //koa2-cors解决跨域问题

//跨域 cross domain http head Allow-origin-access


const main = async ctx => { //让异步变同步
  const tmpdir = os.tmpdir()  //创建临时文件夹
  const files = ctx.request.body.files || {}  //koa-body 解析上传的图片
  const filePaths = []
  for (let key in files) {
    //path
    const file = files[key]
    const filePath = path.join(__dirname, file.name)
    console.log(filePath)
    console.log(file.path)
    // 里面有内容 读取流打开
    const reader = fs.createReadStream(file.path)
    //filepath 目的地有了 等内容 写入流（先创建文件）
    const writer = fs.createWriteStream(filePath)
    reader.pipe(writer) //将图片的内容pipe通过管道 放入创建的文件

    filePaths.push(filePath)
  }
  ctx.body = filePaths
}
app.use(cors({  //cors解决跨域
  // localhost:8080/uploader
  origin (ctx) {
    if (ctx.url === '/test') {
      return false
    }
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', "POST", "DELETE"],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

app.use(koaBody({ //使用中间件koaBody
   multipart: true
 }))
app.use(main) //中间件启用

app.listen(4000)
