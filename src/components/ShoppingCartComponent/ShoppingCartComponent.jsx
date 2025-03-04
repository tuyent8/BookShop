import React, { useState } from "react";
import {
    ShoppingCartWrapper,
    ProductTable,
    ProductRow,
    ProductImage,
    QuantityInput,
    CheckoutButton,
    ContinueShoppingButton,
    NoteTextarea,
    TotalPrice
} from "./style";
import image5 from "../../assets/images/image5.jpg"

const ShoppingCart = () => {
    const [cart, setCart] = useState([
        {
            id: 1,
            title: "Sách: Kể Chuyện Cụm Tình Báo H.63 Anh Hùng",
            price: 252000,
            quantity: 1,
            image: image5, // Thay ảnh thật vào đây
        },
    ]);

    const handleQuantityChange = (id, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <ShoppingCartWrapper>
            <h2>Giỏ Hàng</h2>
            <ProductTable>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số Lượng</th>
                        <th>Tổng</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <ProductRow key={item.id}>
                            <td>
                                <ProductImage src={item.image} alt={item.title} />
                                {item.title}
                            </td>
                            <td>{item.price.toLocaleString()}đ</td>
                            <td>
                                <QuantityInput
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                />
                            </td>
                            <td>{(item.price * item.quantity).toLocaleString()}đ</td>
                            <td>
                                <button onClick={() => handleRemoveItem(item.id)}>Xóa</button>
                            </td>
                        </ProductRow>
                    ))}
                </tbody>
            </ProductTable>

            <div>
                <label>Chú Thích</label>
                <NoteTextarea placeholder="Nhập ghi chú của bạn..." />
            </div>

            <TotalPrice>Tổng: {total.toLocaleString()}đ</TotalPrice>

            <div>
                <ContinueShoppingButton>TIẾP TỤC MUA SẮM</ContinueShoppingButton>
                <CheckoutButton>THANH TOÁN</CheckoutButton>
            </div>
        </ShoppingCartWrapper>
    );
};

export default ShoppingCart;
