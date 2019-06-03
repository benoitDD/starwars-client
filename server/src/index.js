import * as log from 'loglevel'
import express from 'express'
var logging = log.noConflict()
logging.setLevel('INFO')

const app = express()

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
  logging.info(`Serveur démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`)
})