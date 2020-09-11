/* global google */

import React, { useState } from 'react'
import { GoogleMap, useLoadScript, Marker, Polyline, InfoWindow, Circle } from '@react-google-maps/api';

import { config } from './config';
import { flattenData, getAllCoordinates, displayDate } from './utils';

import { sampleData } from './sampleData';

import homeImage from './assets/images/home.svg';

export interface IData {
  [date: string]: {
    [time: string]: ICoordinates
  }
};

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IDisplayData {
  dateTime: string;
  coords: ICoordinates;
}

const home = {
  lat: config.homeLat,
  lng: config.homeLng
};

const dbData = sampleData;
const allDates = Object.keys(dbData);

const GMapLoading = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.apiKey
  });

  const [showLabel, setShowLabel] = useState(false);
  const [dateInput, setDateInput] = useState(allDates[0]);
  const [data, setData] = useState({ [dateInput]: dbData[dateInput] })
  const [selectedCoordinates, setSelectedCoordinates] = useState(getAllCoordinates({ [allDates[0]]: dbData[allDates[0]] }));

  const setSelect = (date: string) => {
    const dateAndDataObj = { [date]: dbData[date] };

    setDateInput(date);
    setData(dateAndDataObj);
    setSelectedCoordinates(getAllCoordinates(dateAndDataObj));
  }

  const render = () =>
    <GoogleMap
      id='map'
      center={selectedCoordinates[Math.floor(selectedCoordinates.length / 2)]}
      zoom={15}
      onClick={() => showLabel ? setShowLabel(false) : undefined}
      options={{
        styles: config.mapStyle as google.maps.MapTypeStyle[]
      }}
    >
      <>
        <Marker
          position={{ ...home }}
          icon={homeImage}
        />

        <InfoWindow
          position={{ ...home }}
          // onCloseClick={() => setShowLabel(false)}
          options={{
            // pixelOffset: new google.maps.Size(0, -40),
            pixelOffset: new google.maps.Size(300, -140),
          }}
        >
          <div className='infoWindow-input'>
            <p>Displaying track for {displayDate(dateInput)}</p>

            <select
              value={dateInput}
              onChange={(e) => setSelect(e.target.value)}
            >
              {allDates.map((d, i) =>
                <option key={i} value={d}>
                  {displayDate(d)}
                </option>
              )}
            </select>
          </div>
        </InfoWindow>

        {flattenData(data).map(({ dateTime, coords }: IDisplayData, i) =>
          <div key={i}>
            <Circle
              center={{ ...coords }}
              options={{
                strokeColor: '#059',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#059',
                fillOpacity: 0.35,
              }}
              radius={25}
              onClick={() => setShowLabel(true)}
            />

            {showLabel &&
              <InfoWindow
                position={{ ...coords }}
                onCloseClick={() => setShowLabel(false)}
              >
                <div className='infoWindow-dateTime'>
                  <p>{dateTime}</p>
                </div>
              </InfoWindow>
            }
          </div>
        )}

        <Polyline
          path={selectedCoordinates}
          options={{
            strokeWeight: 8,
            strokeColor: '#fb9622',
            strokeOpacity: 0.6,
            icons: [{
              icon: {
                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                strokeColor: '#059',
                fillOpacity: 0.7,
                scale: 1,
              },
              repeat: '15px',
            }],
          }}
        />
      </>
    </GoogleMap>

  if (loadError) {
    return <p>Map cannot be loaded right now...</p>
  }

  return isLoaded ? render() : <p>Loading... </p>
};

export default GMapLoading;
