import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { StarFilled } from "@ant-design/icons";
import { StyleNameProduct, WrapperPrice, WrapperReporttext } from "./style";
import image4 from '../../assets/images/image4.png';

const CardComponent = ({ id }) => {
    const navigate = useNavigate(); // Hook để chuyển trang

    const handleClick = () => {
        navigate(`/product-detail`); // Điều hướng đến trang chi tiết sản phẩm
    };

    return (
        <Card
            hoverable
            onClick={handleClick} // Thêm sự kiện click
            style={{ width: 220, cursor: "pointer" }}
            cover={<img alt="example" src={image4} />}
        >
            <StyleNameProduct>Sống để kể lại những anh hùng</StyleNameProduct>
            <WrapperReporttext>
                <span>Nguyễn Quang Chánh</span>
                <span style={{ marginLeft: "8px", display: "flex", alignItems: "center" }}>
                    <span> | 4.96</span> <StarFilled style={{ fontSize: '12px', color: 'gold', marginLeft: '4px' }} />
                </span>
            </WrapperReporttext>
            <WrapperPrice>252,000đ</WrapperPrice>
        </Card>
    );
};

export default CardComponent;
