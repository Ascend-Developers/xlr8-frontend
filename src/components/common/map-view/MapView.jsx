/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import myLocation from 'assets/images/mylocation.svg'
import Input from '../input/Input'

function MapView({ ...rest }) {
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)

  const initMap = () => {
    if (map) {
      const lat = parseFloat(rest.formik.values.location.latitude)
      const lng = parseFloat(rest.formik.values.location.longitude)

      if (!isNaN(lat) && !isNaN(lng)) {
        map.setCenter({ lat, lng })
        const markerInstance = new window.google.maps.Marker({
          map,
          position: { lat, lng },
          visible: true,
        })
        setMarker(markerInstance)
        const locationLink = `https://www.google.com/maps?q=${lat},${lng}`
        rest.formik.setFieldValue(rest.name, locationLink)
      } else {
        // Handle invalid values
        // eslint-disable-next-line no-lonely-if
        if (marker) {
          marker.setVisible(false)
        }
      }
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const currentLocationLink = `https://www.google.com/maps?q=${latitude},${longitude}`
          rest.formik.setFieldValue(rest.name, currentLocationLink)

          if (map) {
            const latLng = new window.google.maps.LatLng(latitude, longitude)
            map.setCenter(latLng)

            if (marker) {
              marker.setPosition(latLng)
              marker.setVisible(true)
            }
          }
        },
        (error) => {
          console.error('Error getting current location:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by your browser.')
    }
  }

  useEffect(() => {
    const mapInstance = new window.google.maps.Map(
      document.getElementById('map'),
      {
        center: {
          lat: rest.formik.values.location.latitude,
          lng: rest.formik.values.location.longitude,
        },
        zoom: 18,
      }
    )
    setMap(mapInstance)

    const markerInstance = new window.google.maps.Marker({
      map: mapInstance,
      visible: false,
    })
    setMarker(markerInstance)

    mapInstance.addListener('click', (event) => {
      const { latLng } = event
      markerInstance.setPosition(latLng)
      mapInstance.panTo(latLng)

      const locationLink = `https://www.google.com/maps?q=${latLng.lat()},${latLng.lng()}`
      rest.formik.setFieldValue(rest.name, locationLink)
    })

    initMap() // Initialize the map with the initial values

    // Cleanup function
    return () => {
      if (map) {
        window.google.maps.event.clearInstanceListeners(map)
      }
    }
  }, [
    rest.formik.values.location.latitude,
    rest.formik.values.location.longitude,
  ]) // Add dependencies for the useEffect hook

  useEffect(() => {
    if (map && rest.formik.values.location.map_url) {
      try {
        const url = new URL(rest.formik.values.location.map_url)
        const params = new URLSearchParams(url.search)
        const lat = parseFloat(params.get('q').split(',')[0])
        const lng = parseFloat(params.get('q').split(',')[1])

        if (!isNaN(lat) && !isNaN(lng)) {
          map.setCenter({ lat, lng })
          if (marker) {
            marker.setPosition({ lat, lng })
            marker.setVisible(true)
          }
        } else if (marker) {
          marker.setVisible(false)
        }
      } catch (error) {
        console.error('Error parsing location link:', error)
        if (marker) {
          marker.setVisible(false)
        }
      }
    }
  }, [map, marker, rest.formik.values.location.map_url])

  return (
    <div>
      <Input
        icon={
          <img
            src={myLocation}
            onClick={(e) => {
              e.preventDefault()
              getCurrentLocation()
            }}
            className='calendar-icon'
            alt='location'
          />
        }
        {...rest}
      />
      <div
        id='map'
        style={{ marginTop: '20px', height: '200px', width: '100%' }}
      />
    </div>
  )
}

function MapViewWrapper({ ...rest }) {
  try {
    return <MapView {...rest} />
  } catch (error) {
    console.error('Error in MapViewWrapper:', error)
    return null
  }
}

export default MapViewWrapper
