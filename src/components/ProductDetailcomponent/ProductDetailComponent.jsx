import { Col, Row } from "antd";
import {
    WrapperContainer,
    WrapperStyleBoldText,
    WrapperStyleImage,
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
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import Loading from '../LoadingComponent/Loading';
import * as message from '../MessageComponent/Message';

const ProductDetailComponent = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) fetchProductDetail();
    }, [id]);

    const fetchProductDetail = async () => {
        setLoading(true);
        try {
            const response = await ProductService.getDetailsProduct(id);

            if (response?.status === 'OK' && response?.data) {
                setProduct(response.data);
            } else {
                message.error('Không thể tải thông tin sản phẩm.');
            }
        } catch (error) {
            message.error('Lỗi khi tải sản phẩm: ' + (error.message || 'Lỗi không xác định'));
        } finally {
            setLoading(false);
        }
    };

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : prev));

    const handleAddToCart = () => {
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(item => item.id === product._id);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    };

    if (loading) return <Loading isLoading={loading} />;

    if (!product) {
        return (
            <div style={{
                padding: '20px',
                textAlign: 'center',
                fontSize: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                margin: '20px'
            }}>
                Không tìm thấy sản phẩm
            </div>
        );
    }

    return (
        <Row style={{ padding: '16px', background: 'white', borderBottom: '2px solid black' }}>
            <Col span={10}>
                <WrapperStyleImage src={product.image} alt="image product" preview={false} />
            </Col>
            <Col span={14}>
                <WrapperContainer>
                    <WrapperStyleNameProduct>{product.name}</WrapperStyleNameProduct>
                    <div>
                        <WrapperStyleNamePublic>Tác giả:</WrapperStyleNamePublic>
                        <WrapperStyleNameAuthor>{product.author}</WrapperStyleNameAuthor>
                    </div>
                    <div>
                        <WrapperStyleNamePublic>Loại sách:</WrapperStyleNamePublic>
                        <WrapperStyleNameAuthor>{product.type}</WrapperStyleNameAuthor>
                    </div>
                    <div style={{ color: 'yellow', fontSize: '20px' }}>
                        {[...Array(Math.floor(product.rating || 0))].map((_, index) => (
                            <StarFilled key={index} />
                        ))}
                        <WrapperStyleNamePublic> ({product.rating} sao)</WrapperStyleNamePublic>
                    </div>
                    <div>
                        <WrapperStylePrice>{product.price?.toLocaleString()} đ</WrapperStylePrice>
                    </div>
                    <div><WrapperStyleNamePublic>Vận chuyển: Miễn phí vận chuyển</WrapperStyleNamePublic></div>
                    <div>
                        <WrapperStyleBoldText>Tình trạng:</WrapperStyleBoldText>
                        <WrapperStyleNameAuthor>
                            {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                        </WrapperStyleNameAuthor>
                    </div>
                    <div><WrapperStyleBoldText>Mô tả:</WrapperStyleBoldText></div>
                    <div style={{ marginTop: '10px' }}>{product.description}</div>
                    <div><WrapperStyleBoldText>Số lượng:</WrapperStyleBoldText></div>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px" }}>
                        <button onClick={handleDecrease} style={buttonStyle} disabled={quantity <= 1}>-</button>
                        <span style={quantityStyle}>{quantity}</span>
                        <button onClick={handleIncrease} style={buttonStyle} disabled={quantity >= product.countInStock}>+</button>
                    </div>
                    <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                        <button style={buyNowStyle}>Mua ngay</button>
                        <button
                            onClick={handleAddToCart}
                            style={addToCartStyle}
                            disabled={product.countInStock === 0}
                        >
                            🛒 Thêm vào giỏ hàng
                        </button>
                    </div>
                </WrapperContainer>
            </Col>
        </Row>
    );
};

export default ProductDetailComponent;
