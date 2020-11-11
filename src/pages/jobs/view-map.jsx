import React, { useEffect, useState } from 'react';
import BaseLayout from '../../components/layout';
import { withTranslation } from '../../utilities/i18n';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';
import { Router } from '../../utilities/i18n';
import { Card, Skeleton } from 'antd';
import { Row, Col, List, Divider, Popconfirm, Button, Spin, Modal } from 'antd';
import { DeleteOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import MapView from '../../components/MapView';
import { useIsLoadingNewPage } from '../../hooks/NewPageLoadingIndicator';
import {
  setOriginName,
  setOriginLat,
  setOriginLon,
  setDestinationName,
  setDestinationLat,
  setDestinationLon,
  setDistance,
  setDuration,
} from '../../state/quote/action';


var map;
var mapboxgl;

export function ViewMap({ 
  setOriginName,
  setOriginLat,
  setOriginLon,
  setDestinationName,
  setDestinationLat,
  setDestinationLon,
  setDistance,
  setDuration,
}) {
  const { Meta } = Card;
  // const quote = useSelector(state => state.quote);
  const ui = useSelector(state => state.ui);
  const quote = ui.selectedOrder;
  const { theme, language } = ui;

  const isLightMode = theme === 'light';

  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [loading, setLoading] = useState(false);

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

  const convertMetersToMiles = (meters) => Number(Number((meters / 1000) / 1.609344).toFixed(2));

  const fetchRoute = () => {
    setLoading(true);
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
      setLoading(false);
      if (!response || !response.data || response.data.code != 'Ok') return;
      const data = response.data;

      setDistance(convertMetersToMiles(data.routes[0].distance));
      setDuration(data.routes[0].duration);
      drawRoute(data.routes[0].geometry.coordinates);
    });
  };

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
    if (loading) return;
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
    // adjustMapBounds();
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

  return (
    <BaseLayout>
      <Row justify="center" style={{ paddingTop: 50 }}>
        <Card style={{ width: '90%' }}>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={22} sm={22} md={22} lg={22} xl={22}>
              <section className="privacy-section">
                <Modal
                  centered={true}
                  visible={loading}
                  closable={false}
                  footer={null}
                  >
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <Spin
                        tip="Calculating map route, please wait ..."
                        size="large" 
                      />
                    </div>
                    

                  </Modal>
                <div>
                  <h1>Map Route for Order ID - #{quote.id}</h1>
                  
                    <div id="map-container" style={{ width: '100%', height: '400px' }}></div>;

                  </div>
              </section>
            </Col>
          </Row>
        </Card>
      </Row>
      <style jsx>
        {`
          .privacy-section div > h1 {
            font-size: 2.2rem;
            font-weight: 900;
          }

          .privacy-section div > h2 {
            font-weight: 900;
          }
        `}
      </style>
    </BaseLayout>
  );
}

ViewMap.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

ViewMap.propTypes = {
  t: PropTypes.func.isRequired,
};

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

export default connect(null, mapDispatchToProps)(withTranslation('common')(ViewMap));
