const router = require('express').Router()
const jwt = require('jsonwebtoken')
const env = require('./env')

const userData = {
  id: 1,
  name: 'TEST!',
  email: 'test@test.test',
  password: 'aaa'
}

const dummyData = {
  1: 'Hello user 1',
  2: 'Hello again'
}

router.post('/auth', (req, res, next) => {
  const { email, password } = req.body
  if (email == userData.email && password == userData.password) {
    const user = {
      id: userData.id,
      email: userData.email
    }

    const token = jwt.sign({ user }, env.JWTSECRET)
    return res.send(token)
  }
  return res.sendStatus(403)
})

const checkAuth = (req, res, next) => {
  const token = req.headers['authorization']
  // Bearer qpowijepq980409342i0994
  if (token) {
    const key = token.split(' ')[1]

    jwt.verify(key, env.JWTSECRET, (err, data) => {
      if (err) return res.sendStatus(403)

      req.user = data.user
      next()
    })
  } else {
    res.sendStatus(403)
  }
}

router.get('/data', checkAuth, (req, res, next) => {
  res.send(dummyData[req.user.id])
})

module.exports = router