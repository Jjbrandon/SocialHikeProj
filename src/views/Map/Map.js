import React, { useState, useRef } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSupercluster from "use-supercluster";
import data from './data.json'
import Navbar from '../../components/Navbar'
import './map.css'

console.log(data)


export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 42.3314,
    longitude: -83.045753,
    width: "100vw",
    height: "90vh",
    zoom: 3
  });
  const mapRef = useRef();


  const hikes = data
  const points = hikes.elements.map(hike => ({
    type: "Feature",
    properties: { cluster: false, hikeId: hike.id},
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(hike.center.lon),
        parseFloat(hike.center.lat)
      ]
    }
  }));

console.log(points)

  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  const { clusters, supercluster } = new useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <div>
      <Navbar />
      <ReactMapGL
        {...viewport}
        maxZoom={20}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={newViewport => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`hike-${cluster.properties.hikeId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button className="hike-marker">
                <img src="https://cdn2.iconfinder.com/data/icons/vacation-landmarks/512/12-512.png" alt="trail" />
              </button>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}