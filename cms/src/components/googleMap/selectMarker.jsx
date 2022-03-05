import React from "react";
import SelectMarker from "assets/images/png/select-marker.png";
import { Image } from "antd";

export default function selectMarker() {
  return (
    <Image
      style={{ marginTop: "-50px", marginLeft: "-20px" }}
      preview={false}
      width={20}
      src={SelectMarker}
    />
  );
}
