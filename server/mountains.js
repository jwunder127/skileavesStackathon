'use strict'; //eslint-disable-line

const db = require('APP/db')
const router = require('express').Router()
const rp = require('request-promise-any')

const mountainDbURL = 'https://skimap.org/SkiAreas/view/'
const Mountains = db.models.mountains

module.exports = router

router.get('/allMountains', (req, res, next) => {
  Mountains.findAll()
    .then(allMountains => {
      res.json(allMountains)
    })
})

router.get('/operatingMountains', (req, res, next) => {
  Mountains.findAll()
    .then(allMountains => {
      res.json(allMountains.filter(mountain => mountain.operating_status === 'Operating' && mountain.latitude))
    })
})

//create all mountains from skimap.org db
router.post('/createAllMountains', (req, res, next) => {
  for (let i = 0; i < 577; i++) {
    rp({
      uri: `${mountainDbURL}${i}.json`,
      json: true
    })
    .then(mountainRes => {
      console.log(`mountain ${i} created`)
      return Mountains.create(mountainRes)

    })
    .catch(next)

  }
  res.sendStatus(204)


})

//create a single mountain from skimap.org (in case create all not working properly)
router.post('/createOneMountain/:id', (req, res, next) => {

    rp({
      uri: `${mountainDbURL}${req.params.id}.json`,
      json: true
    })
    .then(res => {
      Mountains.create(res)

    })
    .then(mountain => {
      console.log('mountain created')
      res.sendStatus(204)
    })
    .catch(next)

  })

router.get('/getWeatherData/:lat/:long', (req, res, next) => {
  rp({
    url: `https://api.darksky.net/forecast/{{INSERT API KEY}}/${req.params.lat},${req.params.long}`,
    json: true
  })
    .then(weather => {
      res.json(weather)
    })
    .catch(next)
})

//update db with weather data (currently disabled)
router.post('/addWeatherDataToDb', (req, res, next) => {
  Mountains.findAll({
    where: {
      id: {$between: []},
      latitude: {$not: null},
      operating_status: 'Operating'
    }
  })
  .then(mountains => {

    mountains.forEach(mountain => {
      rp({
      url: `https://api.darksky.net/forecast/6c3771ead6495db195fa2be830fc2b2f/${mountain.latitude},${mountain.longitude}`,
      json: true
      })
      .then(forecast => {
        mountain.update({forecast: forecast})
        return mountain.save()
      })
    })
    })
    .then(() => {
      res.sendStatus(204)
  })
  .catch(next)
})


  //     Promise.all(mountainArr)
  //     .then(mountainArr => {
  //       console.log(mountainArr)
  //       res.json(mountainArr)
  //       })
  //     })
  //   })
  // })
