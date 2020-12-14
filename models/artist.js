const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
	name: {
    type: String,
    required: true
	},
	slug: {
		type: String,
		trim: true,
		lowercase: true,
		required: true,
	},
	crews: [String],
	location: {
		country: {
			type: String,
			trim: true,
			uppercase: true,
			required: 'Please provide a 2 digit country code',
			maxLength: 2,
			minLength:2
		},
		city: {
			type: String,
			required: 'You must supply a city!'
		}
	},
  active_since:{
		type: String,
	},
	external_sources: [String],
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now
	},

})




module.exports = mongoose.model('Artist', artistSchema)