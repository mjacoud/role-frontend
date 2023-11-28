'use client'

import L from 'leaflet'
import {
  Circle,
  LayerGroup,
  MapContainer,
  Marker,
  TileLayer
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src
})

interface MapProps {
  center?: number[]
  overlay?: boolean
  radius?: number
}

export default function LocalMap({ center, radius, overlay }: MapProps) {
  return (
    <MapContainer
      center={center as L.LatLngExpression}
      zoom={14}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}"
        subdomains="abcd"
        accessToken="rKzQmvZlUZclVbGCxBlXe4Y8o1mJRor4hFYFZINFMiHzO5xaPZRGW9xqQYPSGvHy"
      />
      {overlay && (
        <LayerGroup>
          <Circle
            center={(center as L.LatLngExpression) || [-23.545271, -46.6337751]}
            radius={radius! * 1000}
          />
        </LayerGroup>
      )}
      <Marker position={center as L.LatLngExpression} />
    </MapContainer>
  )
}
