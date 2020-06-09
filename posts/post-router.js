const express = require('express');

// database access using knex
const knex = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    knex.select('*').from('posts')
    .then(post => {
        res.status(200).json({post });
    })
    .catch(error => {
        console.log('GET / error', error);
        res.status(500).json({errorMessage: error.message})
    })
    
});

router.get('/:id', (req, res) => {

    knex.select('*').from('posts').where('id', req.params.id).first()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        console.log('GET /:id error', error);
        res.status(500).json({errorMessage: error.message})
    })
});

router.post('/', (req, res) => {
    knex('posts').insert(req.body, "id")
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        console.log('POST / error', error);
        res.status(500).json({errorMessage: error.message})
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    // console.log(body)

    knex('posts').where({id}).update(body)
    .then(count => {
        if(count > 0){
            res.status(200).json(`Record updated successfully!`)
        } else {
            res.status(404).json(`Record not found with that ID.`)
        }
    })
    .catch(error => {
        console.log('POST / error', error);
        res.status(500).json({errorMessage: error.message})
    })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    knex('posts').where({id}).del()
    .then(count => {
        if(count > 0){
            res.status(200).json(`Record deleted successfully!`)
        } else {
            res.status(404).json(`Record not found with that ID.`)
        }
    })
    .catch(error => {
        console.log('POST / error', error);
        res.status(500).json({errorMessage: error.message})
    })
});

module.exports = router;