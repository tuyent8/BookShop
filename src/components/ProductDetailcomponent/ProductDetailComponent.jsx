import { Col, Row } from "antd";
import image4 from "../../assets/images/image4.png";
import image5 from "../../assets/images/image5.jpg";
import { 
    WrapperContainer, 
    WrapperStyleBoldText, 
    WrapperStyleImage, 
    WrapperStyleImageSmall, 
    WrapperStyleNameAuthor, 
    WrapperStyleNameProduct, 
    WrapperStyleNamePublic, 
    WrapperStylePrice, 
    buttonStyle, 
    quantityStyle, 
    buyNowStyle, 
    addToCartStyle 
} from "./style";
import { StarFilled } from "@ant-design/icons";
import React, { useState } from "react";

const ProductDetailComponent = () => {
    const [quantity, setQuantity] = useState(1);

    const product = {
        id: 1,
        title: "Kể Chuyện Cụm Tình Báo H.63 Anh Hùng",
        author: "Nguyễn Quang Chánh",
        category: "Sách chính trị-xã hội",
        price: 252000,
        image: image4,
        quantity: quantity
    };

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng!");
    };

    return (
        <Row style={{ padding: '16px', background: 'white', borderBottom: '2px solid black' }}>
            <Col span={10}>
                <WrapperStyleImage src={product.image} alt="image product" preview={false} style={{ paddingLeft: '60px' }} />
                <Row style={{ padding: '10px' }}>
                    {[...Array(5)].map((_, index) => (
                        <Col key={index} span={4}>
                            <WrapperStyleImageSmall src={image5} alt="image product small" preview={false} />
                        </Col>
                    ))}
                </Row>
            </Col>
            <Col span={14}>
                <WrapperContainer>
                    <WrapperStyleNameProduct>{product.title}</WrapperStyleNameProduct>
                    <div>
                        <WrapperStyleNamePublic>Tác giả: </WrapperStyleNamePublic>
                        <WrapperStyleNameAuthor><a href="#">{product.author}</a></WrapperStyleNameAuthor>
                    </div>
                    <div>
                        <WrapperStyleNamePublic>Lĩnh vực: </WrapperStyleNamePublic>
                        <WrapperStyleNameAuthor><a href="#">{product.category}</a></WrapperStyleNameAuthor>
                    </div>
                    <div style={{ color: 'yellow', fontSize: '20px' }}>
                        {[...Array(5)].map((_, index) => <StarFilled key={index} />)}
                        <WrapperStyleNamePublic> (2 đánh giá)</WrapperStyleNamePublic>
                    </div>
                    <div>
                        <WrapperStylePrice>{product.price.toLocaleString()}</WrapperStylePrice>
                        <WrapperStylePrice> đ</WrapperStylePrice>
                    </div>
                    <div><WrapperStyleNamePublic>Vận chuyển: Miễn phí vận chuyển</WrapperStyleNamePublic></div>
                    <div><WrapperStyleBoldText>Tình trạng:</WrapperStyleBoldText><WrapperStyleNameAuthor>Còn hàng</WrapperStyleNameAuthor></div>
                    <div><WrapperStyleBoldText>Số lượng:</WrapperStyleBoldText></div>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px" }}>
                        <button onClick={handleDecrease} style={buttonStyle}>-</button>
                        <span style={quantityStyle}>{quantity}</span>
                        <button onClick={handleIncrease} style={buttonStyle}>+</button>
                    </div>
                    <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                        <button style={buyNowStyle}>Mua ngay</button>
                        <button onClick={handleAddToCart} style={addToCartStyle}>🛒 Cho vào giỏ sách</button>
                    </div>
                </WrapperContainer>
            </Col>
        </Row>
    );
};

export default ProductDetailComponent;
