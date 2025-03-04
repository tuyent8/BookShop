import { Col } from "antd";
import React from "react";
import { WrapperHeader, WrapperTextHeader, WrapperTextHeaderAccout, WrappertextheaderSmall } from "./style";
import { ShoppingCartOutlined, CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import ButtomInputSearch from "../ButtomInputSearch/ButtomInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Headercomponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    console.log('user', user)
    return (
        <div>
            <WrapperHeader gutter={20}>
                <Col span={5}>
                    <a href="/"><WrapperTextHeader>BookStore24/7</WrapperTextHeader></a>
                </Col>
                <Col span={13}>
                    <ButtomInputSearch
                        size='large'
                        bordered={false}
                        placeholder='Nhập từ khóa tìm kiếm'
                        textbotton='Tìm kiếm'
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '50px' }}>
                    <WrapperTextHeaderAccout>
                        <UserOutlined style={{ fontSize: '30px', marginRight: '8px' }} /> {/* Đẩy icon sát chữ hơn */}

                        <WrappertextheaderSmall>
                            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer', marginBottom: "4px" }}>
                                Đăng nhập
                            </div>
                            <div>
                                Tài khoản <CaretDownOutlined />
                            </div>
                        </WrappertextheaderSmall>

                    </WrapperTextHeaderAccout>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <a href="/cart"><ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} /></a>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default Headercomponent;
