import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  min-height: 800px;
  position: flex;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background: #35334d;
`;

export const Sidebar = styled.div`
display: flex;
padding-top: 100px;
  text-align: center;
  justify-content: center;
  height: 500px;
  font-size: 14px;
  top: 0;
  bottom: 0;
  right: 0;
  color: #35334d;
  z-index: 99;
  background: #35334d;
`;
export const Image = styled.img`
  text-align: center;
  margin: 0 auto !important;
`;
export const Mbutton = styled(Link)`
  color: #010606;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
`;
