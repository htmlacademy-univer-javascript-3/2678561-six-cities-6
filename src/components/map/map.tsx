import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { OfferPreview } from '../../types/offer';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: OfferPreview[];
  activeOfferId?: string | null;
};

const AMSTERDAM = {
  lat: 52.38333,
  lng: 4.9,
  zoom: 12
};

const customIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39]
});

const activeIcon = L.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39]
});

function Map({ offers, activeOfferId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersLayer = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstance.current === null) {
      mapInstance.current = L.map(mapRef.current, {
        center: [AMSTERDAM.lat, AMSTERDAM.lng],
        zoom: AMSTERDAM.zoom
      });

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; OpenStreetMap contributors'
        }
      ).addTo(mapInstance.current);

      markersLayer.current = L.layerGroup().addTo(mapInstance.current);
    }
  }, []);

  useEffect(() => {
    if (!mapInstance.current || !markersLayer.current || offers.length === 0) {
      return;
    }

    const { latitude: cityLatitude, longitude: cityLongitude, zoom } = offers[0].city.location;

    mapInstance.current.setView([cityLatitude, cityLongitude], zoom);

    markersLayer.current.clearLayers();

    offers.forEach((offer) => {
      const { latitude, longitude } = offer.location;

      const icon = offer.id === activeOfferId ? activeIcon : customIcon;

      L.marker([latitude, longitude], { icon: icon })
        .addTo(markersLayer.current!);
    });

  }, [offers, activeOfferId]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%' }}
    />
  );
}

export default Map;
