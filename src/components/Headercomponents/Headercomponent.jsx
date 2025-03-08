import { Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import {
    WrapperContentPopup,
    WrapperHeader,
    WrapperTextHeader,
    WrapperTextHeaderAccout,
    WrappertextheaderSmall
} from "./style";
import { ShoppingCartOutlined, CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import ButtomInputSearch from "../ButtomInputSearch/ButtomInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../isLoading";

const Headercomponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [useAvatar, setUseAvatar] = useState("");
    console.log("User data:", user);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedAvatar = localStorage.getItem("avatar");
        if (storedUser) {
            setDisplayName(storedUser.name || storedUser.email || "User");
        }
        if (storedAvatar) {
            setUseAvatar(storedAvatar);
        }
    }, []);

    useEffect(() => {
        if (user?.name) {
            setDisplayName(user.name);
            localStorage.setItem("user", JSON.stringify(user));
        }
        if (user?.avatar) {
            setUseAvatar(user.avatar);
            localStorage.setItem("avatar", user.avatar);
        }
    }, [user, user?.avatar]);

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleNavigateProfile = () => {
        navigate('/profile');
    };

    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        dispatch(resetUser());
        localStorage.removeItem("user");
        localStorage.removeItem("avatar");
        setDisplayName("User");
        setUseAvatar("");
        setLoading(false);
    };

    const content = (
        <div>
            <WrapperContentPopup onClick={handleNavigateProfile}>Thông tin người dùng</WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    );

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
                    <Loading isLoading={loading}>
                        <WrapperTextHeaderAccout>
                            {useAvatar ? (
                                <img
                                    src={useAvatar}
                                    alt="Avatar"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginRight: "8px",
                                        cursor: "pointer"
                                    }}
                                />
                            ) : (
                                <UserOutlined style={{ fontSize: "30px", marginRight: "8px" }} />
                            )}

                            <WrappertextheaderSmall>
                                {user?.access_token || localStorage.getItem("user") ? (
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: "pointer", marginBottom: "4px" }}>
                                            {displayName}
                                        </div>
                                    </Popover>
                                ) : (
                                    <>
                                        <div onClick={handleNavigateLogin} style={{ cursor: "pointer", marginBottom: "4px" }}>
                                            Đăng nhập
                                        </div>
                                        <div>
                                            Tài khoản <CaretDownOutlined />
                                        </div>
                                    </>
                                )}
                            </WrappertextheaderSmall>
                        </WrapperTextHeaderAccout>
                    </Loading>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <a href="/cart"><ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} /></a>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default Headercomponent;
