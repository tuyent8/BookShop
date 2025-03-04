import React, { useEffect, useState } from "react";
import {
    Wrapper,
    FormContainer,
    InputField,
    Button,
    Label,
    Required,
    RegisterText,
} from "./style";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hook/useMutationHooks";
import * as message from "../../components/MessageComponent/Message"

const SignUpPage = () => {
    const navigate = useNavigate();
    const mutation = useMutationHooks(
        data => UserService.signupUser(data),
    );

    const { data, isLoading, isSuccess, isError } = mutation
    useEffect(() => {
        if (isSuccess) {
            message.success("Sign up successfully")
            setTimeout(() => {
                navigate("/sign-in");
            }, 1000);
        } else if (isError) {
            message.error("Sign up failed")
        }
    }, [isSuccess, isError])
    // State lưu thông tin đăng ký
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Xử lý nhập liệu
    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value || "", // Đảm bảo giá trị luôn là chuỗi
        }));
    };

    // Xử lý chuyển trang
    const handleNavigateSignin = () => {
        navigate("/sign-in");
    };

    // Xử lý đăng ký
    const handleSignup = (e) => {
        e.preventDefault();
        mutation.mutate({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        }
        );
    };
    return (
        <Wrapper>
            <FormContainer>
                <h2>Đăng ký tài khoản</h2>

                <Label>Họ và tên <Required>(*)</Required></Label>
                <InputField
                    type="text"
                    name="name"
                    placeholder="Nhập họ và tên"
                    value={formData.name}
                    onChange={handleOnChange}
                />

                <Label>Email (Tên đăng nhập) <Required>(*)</Required></Label>
                <InputField
                    type="text"
                    name="email"
                    placeholder="Nhập Email"
                    value={formData.email}
                    onChange={handleOnChange}
                />

                {/* Mật khẩu */}
                <Label>Mật khẩu <Required>(*)</Required></Label>
                <div style={{ position: "relative", width: "100%" }}>
                    <InputField
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        onChange={handleOnChange}
                        style={{ width: "100%" }}
                    />
                    <span
                        onClick={() => setPasswordVisible(!isPasswordVisible)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#888",
                        }}
                    >
                        {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </span>
                </div>

                {/* Nhập lại mật khẩu */}
                <Label>Nhập lại mật khẩu <Required>(*)</Required></Label>
                <div style={{ position: "relative", width: "100%" }}>
                    <InputField
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleOnChange}
                        style={{ width: "100%" }}
                    />
                    <span
                        onClick={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#888",
                        }}
                    >
                        {isConfirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </span>
                </div>
                {data?.status === 'ERR' && data?.message && (
                    <p style={{ color: "red", fontSize: "16px", fontWeight: "bold", margin: "4px" }}>
                        {data.message}
                    </p>
                )}
                <form onSubmit={handleSignup}>
                    <Button
                        type="submit"
                        disabled={
                            !formData.name?.trim() ||
                            !formData.email?.trim() ||
                            !formData.password?.trim() ||
                            !formData.confirmPassword?.trim() ||
                            formData.password !== formData.confirmPassword
                        }

                    >
                        Đăng ký tài khoản
                    </Button>
                </form>

                <p style={{ fontSize: "16px" }}>
                    Bạn đã có tài khoản?
                    <RegisterText onClick={handleNavigateSignin}>
                        Đăng nhập
                    </RegisterText>
                </p>
            </FormContainer>
        </Wrapper>
    );
};

export default SignUpPage;
