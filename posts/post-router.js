const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get("/", (req, res) => {
  db.select('*')
    .from('posts') //key line here is 'select *'
    //GET from
		.then(posts => {
			res.status(200).json({ data: posts });
		})
		.catch(error => {
			res.status(500).json({ error: error.message });
});

router.get('/:id', (req, res) => {
  // req.params.id = 
  db('posts')
    .where('id', '=', req.params.id) //key line is 'where'
    //GET where?
    .then(posts => {
      res.status(200).json({ data: posts });
    })
    .catch(error => {
      res.status(500).json({ error: error.message})
    });
});

router.post('/', (req, res) => {
  const postData = req.body;
  //validate data before calling and if valid go to db
  db('posts')
    .insert(postData, 'id') //key line is '.insert'
    //POST insert
    .then(ids => {
      res.status(201).json({ data: ids });
    })
    .catch(error => {
      res.status(500).json({ error: error.message})
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  //please validate the data before calling db
  db('posts')
    .where({ id: req.params.id }) // key word is 'where'
    .update(changes)
    //PUT update
    .then(count => {
      // returns an array with the id of the last record inserted
      res.status(200).json({ data: count });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

router.delete('/:id', (req, res) => {
  db('posts')
    .where({ id: req.params.id }) // key wor is where
    .del()
    //DELETE where
    .then(count => {
      res.status(200).json({ data: count });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;