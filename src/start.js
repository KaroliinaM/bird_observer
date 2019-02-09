const electron=require('electron')
const app=electron.app
const BrowserWindow=electron.BrowserWindow
const Datastore = require('nedb')
const express = require('express')
const expr = express()
const cors = require('cors')
const path=require('path')
const url=require('url')
const bodyParser=require('body-parser')
expr.use(bodyParser.json())


expr.use(cors())
const db = new Datastore({ filename: './observations.db', autoload: true })
let appWindow

let obs=[]

db.find({}, function (err, docs) {
  obs=docs
})


function createWindow() {
  appWindow=new BrowserWindow({ width: 800, height: 600 })
  appWindow.loadURL(process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/..build/index.html'),
    protocol: 'file',
    slashes: true
  }))
  appWindow.webContents.openDevTools()
  expr.get('/observation', (req, res) => {
  res.json(obs)
  })
  expr.post('/observation', (req, res) => {
    const obs=req.body
    db.insert(obs, function (err, newObs) {
      res.json(newObs)
    })
  })
  const PORT = 3001
expr.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


  appWindow.on('closed', ()=>{
    appWindow=null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', ()=>{
  if(process.platform!=='darwin') {
    app.quit()
  }
})
app.on('activate', ()=>{
  if(appWindow===null) {
    createWindow
  }
})
