const fs = require('fs');
const https = require('http')

const data = JSON.parse(fs.readFileSync(__dirname + '/sampleData.json', 'utf-8'));

data.artists.forEach(x=>{
	const json = JSON.stringify(x)
	add(json,https)
})




function add(artist,https){

const options = {
  hostname: 'localhost',
  port: 3005,
  path: '/artists',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(artist)
req.end()
}