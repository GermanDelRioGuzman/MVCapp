const express = require('express');
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res) => {
    const END_POINT = "https://rickandmortyapi.com/api/character"

    axios.get(END_POINT)
        // success!
        .then(function (response) {
            // console.log(response.data.results)
            res.render('index.hbs', {
                data: response.data.results
            })
        })
        // Failed :(
        .catch(function (error) {
            console.log(error)
            res.render('index.hbs', {
                error,
                data: []
            })
        })
})

module.exports = router
