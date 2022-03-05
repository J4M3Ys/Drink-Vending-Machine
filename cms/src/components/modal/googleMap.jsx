import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import GoogleMap from "components/googleMap";
import { MapContainer, SelectDetail, SelectTitle } from "./modal.style";
export default function Index({ visible, setVisible, onClickOK, editData }) {
  const [selectPos, setSelectPos] = useState({ lat: "", lng: "" });

  function handleOnCloseModal() {
    setVisible(false);
  }

  useEffect(() => {
    editData && onEditData();
  }, [editData]);

  function onEditData() {
    setSelectPos({
      lat: editData?.machine_location[0],
      lng: editData?.machine_location[1],
    });
  }

  function handleClickOnMap(e) {
    setSelectPos({ lat: e.lat, lng: e.lng });
  }

  function handleClickOk() {
    setVisible(false);
    if (onClickOK) onClickOK(selectPos);
  }

  return (
    <Modal
      onCancel={handleOnCloseModal}
      onOk={handleClickOk}
      visible={visible}
      closable={false}
      style={{ textAlign: "center" }}
      centered
      width={800}
    >
      <SelectTitle style={{ margin: "0 0 10px 0" }}>
        Select Vending Machine Position
      </SelectTitle>
      <MapContainer style={{ height: "600px", width: "100%" }}>
        <GoogleMap handleClickOnMap={handleClickOnMap} editData={editData} />
      </MapContainer>
      <SelectTitle>Position Secleted</SelectTitle>
      <SelectDetail>
        Latitude: <b>{selectPos.lat}</b>
      </SelectDetail>
      <SelectDetail>
        Longitude: <b>{selectPos.lng}</b>
      </SelectDetail>
    </Modal>
  );
}
