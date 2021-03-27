const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const { mongoose } = require('./configs/mongodb')

const app = express()
const server = require('http').createServer(app)

//socket.io
var { socketapi, socketInfo } = require('./socketapi') // <== Add this line  socket.io
socketapi.io.attach(server)

//mongoDb
mongoose

app.use(
    cors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
)
app.use(logger('dev')) //log
app.use(
    express.json({
        limit: '50mb', //สามารถส่งรูปที่มีขนาดใหญ่เกิน 100kb ได้
    })
) / app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


//socket io
//socket.io middleware
app.use((req, res, next) => {
    req.io = socketapi.io
    req.socket_id = socketInfo.socket_id
    return next()
})

//router
const userRouter = require("./routes/users")

app.use('/users', userRouter)
app.get('/', (req, res) => {
    res.status(200).json({
        msg: 'wellcome to socket-io',
    })
})

const port = process.env.PORT || 7831
server.listen(port, () => {
    console.log('app start port port')
})

module.exports = app
