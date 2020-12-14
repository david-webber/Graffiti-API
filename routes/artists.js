const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')


async function artistBySlug(req, res, next) {
  try {
    // result = await Artist.findByslug(req.params.slug)
    result = await Artist.findOne({
      slug: req.params.slug
    })
    if (result == null) {
      return res.status(404).json({ message: 'No results found'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  res.artist = result
  next()
}


function generateSlug(req,res,next){

}

// all artists
router.get('/', async (req, res) => {
	try {
		const artists = await Artist.find()
		res.json(artists)
  } catch (err) {
		res.status(500).json({ message: err.message })
  }
})


// Get artist by slug
router.get('/:slug', artistBySlug, (req, res) => {
  res.json(res.artist)
})



// create
router.post('/', async (req, res) => {
	const slug = req.body.name.split(" ").join("-");
		//todo make this properly url friendly, not just replacing spaces..
		//todo make sure there are no others with the same slug ...
  const artist = new Artist({
		name: req.body.name,
		slug,
		crews: req.body.crews,
		location: req.body.location,
		active_since: req.body.active_since,
		external_sources: req.body.external_sources
  })
  try {
    const newArtist = await artist.save()
    res.status(201).json(newArtist)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})



// delete
router.delete('/:slug', artistBySlug, async (req, res) => {
  try {
    await res.artist.remove()
    res.json({ message: `Deleted ${res.artist}` })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})







module.exports = router

