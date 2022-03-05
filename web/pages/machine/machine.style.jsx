import styled from "styled-components";

export const Title = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 32px;
  height: 100%;
`;

export const Time = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: 250px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const TimeContainer = styled.div`
  color: white;
  font-weight: bold;
  font-size: 24px;
`;

export const Detail = styled.div`
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.45);
`;
