const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
app.use(require('morgan')('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(path.join(__dirname, '..', 'public')))
app.use('/api', require('./api'))

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(err.status || 500).send(err)
})

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`listening on port ${port}`))