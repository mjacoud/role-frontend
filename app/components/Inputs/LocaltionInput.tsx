'use client'

import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from '@geoapify/react-geocoder-autocomplete'

export type locationObject = {
  type: string
  properties: {
    address_line1: string
    address_line2: string
    categories: string[]
    city: string
    country: string
    country_code: string
    county: string
    datasource: {
      attribution: string
      license: string
      raw: {
        highway: string
        lanes: number
        lanes_backward: number
        lanes_forward: number
        lit: string
        name: string
        oneway: string
        osm_id: number
        osm_type: string
        surface: string
        z_order: number
      }
      sourcename: string
      url: string
    }
    feature_type: string
    formatted: string
    lat: number
    lon: number
    name: string
    place_id: string
    postcode: string
    state: string
    street: string
    timezone: {
      name: string
      offset_DST: string
      offset_DST_seconds: number
      offset_STD: string
      offset_STD_seconds: number
    }
  }
  geometry: {
    type: string
    coordinates: [number, number][]
  }
}

export type coodernateObject = [lat: number, lon: number]

interface LocationProps {
  value?: any
  radius?: number
  handleRadius?: (value: number) => void
  onChange: (value: locationObject) => void
}

export const LocationInput: React.FC<LocationProps> = ({
  value,
  onChange,
  radius,
  handleRadius
}) => {
  return (
    <>
      <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_AUTOCOMPLETE_API_KEY}>
        <div className="grid grid-flow-row-dense grid-cols-7">
          <div className="col-span-6">
            <GeoapifyGeocoderAutocomplete
              placeholder="Adicione o endereço do seu evento aqui"
              type="street"
              lang="br"
              limit={5}
              debounceDelay={200}
              placeSelect={value => onChange(value)}
              biasByProximity={{ lat: -23.545271, lon: -46.6337751 }}
              value={value}
            />
          </div>
          <input
            type="number"
            className="border border-slate-500"
            placeholder="Raio"
            value={radius}
            onChange={e => handleRadius!(Number(e.target.value))}
            max="10000"
          />
        </div>
      </GeoapifyContext>
    </>
  )
}
