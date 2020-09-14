import React, { useState } from 'react'
import { GoogleMap, useLoadScript, Marker, Polyline, InfoWindow, Circle } from '@react-google-maps/api';

import { config } from '../config';
import { getAllCoordinates, displayDate, displayTime } from '../utils';
import { ICoordinates, IData } from './dbData.slice';

// import { sampleData } from '../sampleData';

import homeImage from '../assets/images/home.svg';

export interface IDisplayData {
  dateTime: string;
  coords: ICoordinates;
}

const GMap = ({ dbData }: { dbData: IData[] }) => {
  // const dbData: IData[] = sampleData;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: config.apiKey
  });

  const [data, setData] = useState<IData>(dbData[0])
  const allDates = dbData.map(({ date }) => date);
  const [dateInput, setDateInput] = useState(allDates[0]);
  const [selectedCoordinates, setSelectedCoordinates] = useState<ICoordinates[]>(getAllCoordinates(dbData[0]));
  const [showLabel, setShowLabel] = useState(false);

  const setSelect = (date: string) => {
    const selectedDateData = dbData.filter(d => d.date === date)[0];

    setDateInput(date);
    setData(selectedDateData);
    setSelectedCoordinates(getAllCoordinates(selectedDateData));
  }

  const render = () =>
    <GoogleMap
      id='map'
      center={selectedCoordinates[0]}
      zoom={15}
      onClick={() => showLabel ? setShowLabel(false) : undefined}
      options={{
        styles: config.mapStyle as google.maps.MapTypeStyle[],
      }}
    >
      <>
        <Marker
          position={{ ...config.homeLatLng }}
          icon={homeImage}
        />

        <InfoWindow
          position={selectedCoordinates[0]}
          // onCloseClick={() => setShowLabel(false)}
          options={{
            pixelOffset: new google.maps.Size(0, -40),
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

        {Object.entries(data.times).map(([time, { lat, lng }], i) =>
          <div key={i}>
            <Circle
              center={{ lat, lng }}
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
                position={{ lat, lng }}
                onCloseClick={() => setShowLabel(false)}
              >
                <div className='infoWindow-dateTime'>
                  <p>{displayDate(data.date)} - {displayTime(time)}</p>
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
    </GoogleMap>;

  if (loadError) {
    return <p>Map cannot be loaded right now...</p>
  }

  return isLoaded ? render() : <p className='loading'>Loading</p>
};

export default GMap;