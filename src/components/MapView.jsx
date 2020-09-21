import { connect } from 'react-redux';
import { withTranslation } from '../utilities/i18n';

import { useEffect, useState } from 'react';
import Axios from 'axios';
import { bindActionCreators } from 'redux';
import {
  setOriginName,
  setOriginLat,
  setOriginLon,
  setDestinationName,
  setDestinationLat,
  setDestinationLon,
  setDistance,
  setDuration,
} from '../state/quote/action';

var map;
var mapboxgl;

const MapView = ({
  theme,
  quote,
  setOriginName,
  setOriginLat,
  setOriginLon,
  setDestinationName,
  setDestinationLat,
  setDestinationLon,
  setDistance,
  setDuration,
}) => {

  const isLightMode = theme === 'light';

  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  useEffect(() => {
    if (quote.originLat && quote.originLon) {
      setOrigin(quote.origin);
    }

    if (quote.destinationLat && quote.destinationLon) {
      setDestination(quote.destination);
    }
    
  }, [quote]);

  const getMapBounds = () => {
    let originLon = quote.originLon || -65,
      originLat = quote.originLat || 50,
      destinationLon = quote.destinationLon || -130,
      destinationLat = quote.destinationLat || 25;
    const padding = 3;

    const [leftBound, rightBound] =
      originLon > destinationLon
        ? [destinationLon - padding, originLon + padding]
        : [originLon - padding, destinationLon + padding];

    const [downsideBound, upsideBound] =
      originLat > destinationLat
        ? [destinationLat - padding, originLat + padding]
        : [originLat - padding, destinationLat + padding];

    return [
      [leftBound, downsideBound],
      [rightBound, upsideBound],
    ];
  };

  const adjustMapBounds = () => {
    if (!map) return;

    var bounds = getMapBounds();

    map.fitBounds(bounds);
  }

  const setMarkers = () => {
    if (!map) return;
    var originMarker = new mapboxgl.Marker({ color: '#f63e0c' })
      .setLngLat([quote.originLon, quote.originLat])
      .addTo(map);
    var destinationMarker = new mapboxgl.Marker().setLngLat([quote.destinationLon, quote.destinationLat]).addTo(map);
    originMarker.addTo(map);
    destinationMarker.addTo(map);
  }

  const drawRoute = (route) => {
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route,
      },
    };

    if (!map) return;
    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    } else {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#f63e0c',
          'line-width': 5,
          'line-opacity': 0.75,
        },
      });
    }
  };

  const fetchRoute = () => {
    Axios.post(
      '/api/navigation',
      {
        originLat: quote.originLat,
        originLon: quote.originLon,
        destinationLat: quote.destinationLat,
        destinationLon: quote.destinationLon,
      },
      { headers: { 'Content-Type': 'application/json' } }
    ).then((response) => {
      if (!response || !response.data || response.data.code != 'Ok') return;
      const data = response.data;

      setDistance(convertMetersToMiles(data.routes[0].distance));
      setDuration(data.routes[0].duration);
      drawRoute(data.routes[0].geometry.coordinates);
    });
  };

  const convertMetersToMiles = (meters) => Number(Number((meters / 1000) / 1.609344).toFixed(2))

  useEffect(() => {
    (async () => {
      const [lon, lat, encodedName] = await geoEncodeLocation(quote.origin);
      setOriginName(encodedName);
      setOriginLat(lat);
      setOriginLon(lon);
    })();
  }, [origin]);

  useEffect(() => {
    (async () => {
      const [lon, lat, encodedName] = await geoEncodeLocation(quote.destination);
      setDestinationName(encodedName);
      setDestinationLat(lat);
      setDestinationLon(lon);
    })();
  }, [destination]);

  useEffect(() => {
    if (typeof window !== 'undefined' && document.getElementById('map-container')) {
      mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

      const bounds = getMapBounds();

      mapboxgl.accessToken =
        'pk.eyJ1IjoicHJlbWFyc3lzdGVtcyIsImEiOiJja2VtdmZ6aXAxcnAyMzBwYzZnaTFjaWJzIn0.BQJ4ok3AEE5_2cSq0KlIJg';
      map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
        maxBounds: bounds,
      });
    }
  }, [origin, destination]);


  useEffect(() => {
    if (!quote.originLat || !quote.originLon || !quote.destinationLat || !quote.destinationLon) {
      return;
    }

    setMarkers();
    adjustMapBounds();
    fetchRoute();
  }, [origin, destination]);

  const geoEncodeLocation = async (location) => {
    let result = [0, 0];
    if (typeof window !== 'undefined') {
      const OpenStreetMapProvider = require('leaflet-geosearch').OpenStreetMapProvider;
      const provider = new OpenStreetMapProvider();

      result = await provider.search({ query: location });
    }

    // place = [lon, lat, name]
    return [result[0].x, result[0].y, result[0].label];
  };

  return <div id="map-container" style={{ width: '100%', height: '400px' }}></div>;
};

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  quote: state.quote,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setOriginName: bindActionCreators(setOriginName, dispatch),
    setOriginLat: bindActionCreators(setOriginLat, dispatch),
    setOriginLon: bindActionCreators(setOriginLon, dispatch),
    setDestinationName: bindActionCreators(setDestinationName, dispatch),
    setDestinationLat: bindActionCreators(setDestinationLat, dispatch),
    setDestinationLon: bindActionCreators(setDestinationLon, dispatch),
    setDistance: bindActionCreators(setDistance, dispatch),
    setDuration: bindActionCreators(setDuration, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(MapView));
