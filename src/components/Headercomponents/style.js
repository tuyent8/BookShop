
import styled from "styled-components";

export const WrapperHeader = styled.div`
    background-color: #02bbff;
    padding: 20px 120px;
    align-items: center;
    display: flex;
    position: fixed; /* Dính lên trên */
    top: 0;
    left: 0;
    width: 100%; /* Tránh mất nội dung */
    box-sizing: border-box; /* Đảm bảo không tràn */
    z-index: 1000;
    height: 100px;
`;



export const WrapperTextHeader = styled.span`
    color: yellow;
    font-size: 30px;
    font-weight: bold;
    text-align: left;
`;

export const WrapperTextHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px; /* Giảm khoảng cách giữa icon và chữ */
    white-space: nowrap;
    margin-left: 40px; /* Đẩy phần tài khoản ra xa thanh tìm kiếm */
`;


export const WrapperIconHeader = styled.span`
    font-size: 20px;
    color: #fff;
    white-space: nowrap;
`;
export const WrappertextheaderSmall = styled.span`
display: flex; 
flex-direction: column;
font-size: 20px; 
color: white;
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover{
        background: read;
        color: #02bbff;
    }
`
