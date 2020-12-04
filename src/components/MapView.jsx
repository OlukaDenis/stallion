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
import Head from 'next/head';
import { debounce } from '../utilities/common';

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
  origin,
  destination,
  destinationLon,
  destinationLat,
  originLon,
  originLat,
}) => {
  
  const [originMarker, setOriginMarker] = useState();
  const [destinationMarker, setDestinationMarker] = useState();

  const getMapBounds = (padding=8) => {
    let originLongitude = originLon || -65,
      originLatitude = originLat || 50,
      destinationLongitude = destinationLon || -130,
      destinationLatitude = destinationLat || 25;

    const [leftBound, rightBound] =
      originLongitude > destinationLongitude
        ? [destinationLongitude - padding, originLongitude + padding]
        : [originLongitude - padding, destinationLongitude + padding];

    const [downsideBound, upsideBound] =
      originLatitude > destinationLatitude
        ? [destinationLatitude - padding, originLatitude + padding]
        : [originLatitude - padding, destinationLatitude + padding];

    return [
      [leftBound, downsideBound],
      [rightBound, upsideBound],
    ];
  };

  const adjustMapBounds = () => {
    if (!map) return;

    var bounds = getMapBounds();
    map.fitBounds(bounds);
  };

  const setMarkers = () => {
    if (!map) return;

    if (originMarker) {
      originMarker.remove();
    }
    let oMarker = new mapboxgl.Marker({ color: '#f63e0c' }).setLngLat([originLon, originLat]);
    oMarker.addTo(map);
    var popup = new mapboxgl.Popup().setText('Pickup Location');
    oMarker.setPopup(popup);
    setOriginMarker(oMarker);

    if (destinationMarker) {
      destinationMarker.remove();
    }

    let dMarker = new mapboxgl.Marker().setLngLat([destinationLon, destinationLat]);
    dMarker.addTo(map);
    var popup = new mapboxgl.Popup().setText('Drop-off Location');
    dMarker.setPopup(popup);
    setDestinationMarker(dMarker);
  };

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
        originLat: originLat,
        originLon: originLon,
        destinationLat: destinationLat,
        destinationLon: destinationLon,
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

  const fetchRouteDebounced = debounce(fetchRoute, 400);

  const convertMetersToMiles = (meters) => Number(Number(meters / 1000 / 1.609344).toFixed(2));

  useEffect(() => {
    setOriginLat(null);
    setOriginLon(null);
    (async () => {
      const [lon, lat, encodedName] = await geoEncodeLocation(quote.origin);
      setOriginName(encodedName);
      setOriginLat(lat);
      setOriginLon(lon);
    })();
  }, [origin]);

  useEffect(() => {
    setDestinationLat(null);
    setDestinationLon(null);
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

      const bounds = [
        [-132, 23],
        [-63, 52],
      ];

      mapboxgl.accessToken =
        'pk.eyJ1IjoicHJlbWFyc3lzdGVtcyIsImEiOiJja2VtdmZ6aXAxcnAyMzBwYzZnaTFjaWJzIn0.BQJ4ok3AEE5_2cSq0KlIJg';
      map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
        maxBounds: bounds,
      });
    }
    if (map.getLayer('route')) map.removeLayer('route');
    if (map.getSource('route')) map.removeSource('route');
    if (originMarker) {
      originMarker.remove();
    }
    if (destinationMarker) {
      destinationMarker.remove();
    }
  }, [origin, destination]);

  useEffect(() => {
    if (!originLat || !originLon || !destinationLat || !destinationLon) {
      return;
    }

    setMarkers();
    adjustMapBounds();
    fetchRouteDebounced();
  }, [originLat, originLon, destinationLat, destinationLon]);

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

  return (
    <div id="map-container" style={{ width: '100%', height: '400px' }}>
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css" rel="stylesheet" />
      </Head>
    </div>
  );
};

const mapStateToProps = (state) => ({
  theme: state.ui.theme,
  quote: state.quote,
  origin: state.quote.origin,
  destination: state.quote.destination,
  destinationLon: state.quote.destinationLon,
  destinationLat: state.quote.destinationLat,
  originLon: state.quote.originLon,
  originLat: state.quote.originLat,
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
