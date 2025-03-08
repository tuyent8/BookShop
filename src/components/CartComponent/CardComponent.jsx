import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { StarFilled } from "@ant-design/icons";
import { StyleNameProduct, WrapperPrice, WrapperReporttext } from "./style";
import image4 from '../../assets/images/image4.png';

const CardComponent = (props) => {
    const { name, description, image, price, rating, type, author } = props
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
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReporttext>
                <span>{author}</span>
                <span style={{ marginLeft: "8px", display: "flex", alignItems: "center" }}>
                    <span> | {rating}</span> <StarFilled style={{ fontSize: '12px', color: 'gold', marginLeft: '4px' }} />
                </span>
            </WrapperReporttext>
            <WrapperPrice>{price}</WrapperPrice>
        </Card>
    );
};

export default CardComponent;
