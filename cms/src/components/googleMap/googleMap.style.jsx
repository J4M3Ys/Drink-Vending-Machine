import styled from "styled-components";
import { Input } from "antd";

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: relative;
`;

export const SearchBox = styled(Input)`
  position: absolute;
  z-index: 1;
  margin: 10px 10px;
  width: 20%;
`;
