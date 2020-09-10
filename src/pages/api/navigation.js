import axios from 'axios';

const TOKEN = 'sk.eyJ1IjoicHJlbWFyc3lzdGVtcyIsImEiOiJja2VvMzFyMzkwNHB4MndvZXB4NXBzZG93In0.QdnqHEWhQRRjFufYTWiQbg';
const URL = 'https://api.mapbox.com/directions/v5/mapbox/driving?access_token=' + TOKEN;

export default async (req, res) => {
  if (req.method === 'POST') {
    
    let postData =
      'coordinates=' +
      req.body.originLon +
      ',' +
      req.body.originLat +
      ';' +
      req.body.destinationLon +
      ',' +
      req.body.destinationLat +
      '';

    // console.log('postData', postData);
    // postData = 'coordinates=2.344003,48.85805;2.34675,44.85727';

    postData += '&steps=true&geometries=geojson';
    
    const params = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    const data = await axios
      .post(URL, postData, params)
      .then((response) => {
        // console.log('response', response);
        res.statusCode = response.status;
        res.end(JSON.stringify(response.data));
      })
      .catch((error) => {
        // console.log('error', error);

        res.statusCode = 200;
        res.end(JSON.stringify({ data: req.body, code: 'Fail', name: error.name, statusMessage: 'Message: ' + error.message }));
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'HTTP method GET is not supported, use POST.' }));
  }
};
