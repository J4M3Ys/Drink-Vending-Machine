import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import SelectMarker from "./selectMarker";

import { MapContainer, SearchBox } from "./googleMap.style";

export default function Index({
  handleClickOnMap,
  editData,
  machineList,
  selectMachine,
}) {
  const [selectPositon, setSlectePosition] = useState({
    lat: 0,
    lng: 0,
    zoom: 10,
  });
  const googleProps = {
    center: {
      lat: 13.769972473343849,
      lng: 100.55580986730834,
    },
    zoom: 10,
  };

  useEffect(() => {
    editData && onEditData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  function onEditData() {
    googleProps.center = {
      lat: editData?.machine_location[0],
      lng: editData?.machine_location[1],
      zoom: 10,
    };
    setSlectePosition({
      lat: editData?.machine_location[0],
      lng: editData?.machine_location[1],
      zoom: 10,
    });
  }

  async function handleApiLoaded(map, maps) {}

  function handleClickMap(e) {
    setSlectePosition({
      lat: e.lat,
      lng: e.lng,
      zoom: 10,
    });
    if (handleClickOnMap) handleClickOnMap(e);
  }

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_KEY,
          libraries: ["places", "geometry"],
        }}
        center={
          editData
            ? selectPositon
            : selectMachine
            ? selectMachine
            : googleProps.center
        }
        zoom={selectMachine ? selectMachine.zoom : googleProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        onClick={!machineList ? handleClickMap : () => {}}
      >
        {machineList ? (
          machineList.map((value) => {
            return (
              <SelectMarker
                key={value.machine_name}
                lat={value.machine_location[0]}
                lng={value.machine_location[1]}
              />
            );
          })
        ) : (
          <SelectMarker lat={selectPositon.lat} lng={selectPositon.lng} />
        )}
      </GoogleMapReact>
    </MapContainer>
  );
}
