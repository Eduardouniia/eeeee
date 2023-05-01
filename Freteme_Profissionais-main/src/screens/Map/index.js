import React, { useEffect, useMemo, useRef, useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import style from "../../components/globalStyles";
import { useContext } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../../context/auth";
import handleService from "../../libs/services";
import polyline from "polyline";
import { getBounds } from "geolib";
import Loader from "./Loader";
import globalStyles from "../../components/globalStyles";
export default function MapComponent() {
  const { PROVIDER_GOOGLE } = MapView;
  const { coordinates, showMap } = useContext(AuthContext);
  const [routes, setRoutes] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [region, setRegion] = useState(null);
  const mapView = useRef(null);
  const { encodedRoute } = handleService();
  const [decodePolylined, setDecodePolylined] = useState(null);
  const decodePolyline = (data) => {
    const decoded = polyline.decode(data).map(([lat, lng]) => ({
      latitude: lat,
      longitude: lng,
    }));

    const [origin, destination] = [decoded[0], decoded[decoded.length - 1]];
    const middle = decoded[Math.floor(decoded.length / 2)];
    const bounds = getBounds([origin, destination]);
    const { maxLat, minLat, maxLng, minLng } = bounds;
    setDecodePolylined(decoded);
    setRoutes(decoded);
    setOrigin(origin);
    setDestination(destination);
    setRegion({
      latitude: middle.latitude,
      longitude: middle.longitude,
      latitudeDelta: (maxLat - minLat) * 1.5,
      longitudeDelta: (maxLng - minLng) * 1.5,
    });
  };
  useMemo(
    () => (encodedRoute ? decodePolyline(encodedRoute) : null),
    [encodedRoute]
  );
  if (!showMap) {
    return null;
  }
  return (
    <MapView
      showsMyLocationButton={false}
      ref={mapView}
      provider={PROVIDER_GOOGLE}
      region={
        region || {
          latitude: coordinates?.lat,
          longitude: coordinates?.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      }
      showsUserLocation={true}
      style={{ flex: 1, borderRadius: 20, zIndex: 1 }}
    >
      {routes && (
        <Polyline
          geodesic={"visualViewport"}
          zIndex={99999}
          coordinates={routes}
          strokeColor={style.primary}
          strokeWidth={5}
          lineCap="round"
          lineJoin="round"
        />
      )}

      {origin && (
        <Marker
          coordinate={{
            latitude: origin.latitude,
            longitude: origin.longitude,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        >
          <Loader color={globalStyles.red} />
        </Marker>
      )}

      {destination && (
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        >
          <Loader color={"green"} />
        </Marker>
      )}
    </MapView>
  );
}
