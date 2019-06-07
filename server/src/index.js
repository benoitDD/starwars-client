import * as log from 'loglevel'
import express from 'express'
import i18n from './i18n'
import i18nextMiddleware from 'i18next-express-middleware'

var logging = log.noConflict()
logging.setLevel('INFO')

const app = express()

app.use(i18nextMiddleware.handle(i18n))

app.use('/i18n', express.static(__dirname + '/../i18n'))

app.use(express.static(__dirname + '/../public'))

app.use((req, res, next) => {
  //If they don't request a specific file (with a dot) we send the application client
  if(req.method === 'GET' && !req.path.includes('.')){
    return res.sendFile('index.html', {root: './server/public'})
  }
  next()
})

const PORT = process.env.PORT || 6000
app.listen(PORT, () =>{
  logging.info(`Server started in mode ${process.env.NODE_ENV} on port ${PORT}`)
})