import styled from "styled-components";


export const StyleNameProduct = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;  // Tăng khoảng cách giữa các dòng
  color: #000;
  white-space: normal; // Cho phép xuống dòng tự nhiên
  overflow-wrap: break-word; // Đảm bảo từ dài không bị tràn ra ngoài
  font-weight: bold;
`;

export const WrapperReporttext = styled.div`
    font-size: 12px;
    color: blue;
    display: flex;
    justify-content: center;
    margin-top: 4px
`
export const WrapperPrice = styled.div`
    font-size: 20px;
    color: red;
    display: flex;
    justify-content: center;
    font-weight:500;
    margin-top: 4px
`