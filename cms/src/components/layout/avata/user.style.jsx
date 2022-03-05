import styled from "styled-components";
import { Menu } from "antd";

export const Container = styled.div``;
export const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;

export const NotifyTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  height: 30px;
  margin-bottom: -10px;
`;

export const NotifyDetail = styled.div`
  font-size: 12px;
  width: 20px;
  height: 20px;
`;

export const NotifyContent = styled.div``;

export const NotifyContainer = styled(Menu)`
  -ms-overflow-style: none;
  scrollbar-width: 10px;
  max-height: 300px;
  min-height: 150px;
  overflow-y: scroll;
  width: 400px;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
