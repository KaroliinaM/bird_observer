const electron=require('electron')
const app=electron.app
const BrowserWindow=electron.BrowserWindow

const express = require('express')
const expr = express()
const cors = require('cors')
const path=require('path')
const url=require('url')
expr.use(cors())

let appWindow

let obs=[{
  id:1,
  species: "Varpunen",
  notes: "Lintulaudalla",
  rarity: "common",
  timestamp: 1234567
},
{
id:2,
species: "Harakka",
notes: "lähimetsässä",
rarity: "common",
timestamp: 1234567
}]


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
