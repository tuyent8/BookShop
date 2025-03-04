import React, { useEffect, useState } from "react";
import {
    Wrapper,
    FormContainer,
    InputField,
    Button,
    CheckboxContainer,
    RegisterText,
} from "../../pages/SignInPage/Style";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hook/useMutationHooks";
import Loading from "../../components/isLoading";
import { Spin } from "antd";
import * as message from "../../components/MessageComponent/Message";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const mutation = useMutationHooks(
        data => UserService.loginUser(data),
    );

    const { data, isLoading, isSuccess } = mutation;
    useEffect(() => {
        if (isSuccess) {
            message.success("Sign in successfully")
            setTimeout(() => {
                navigate("/"); // Chuyển về trang đăng nhập sau 1s
            }, 1000);
            localStorage.setItem('access_token', data?.access_token)
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                console.log('decoded', decoded)
                if (decoded?.id) {
                    handleGetDetailUser(decoded?.id, data?.access_token)
                }
            }
        }
    }, [isSuccess])
    const handleGetDetailUser = async (id, token) => {
        const res = await UserService.getDetailUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value || "",
        }));
    };

    const handleSignin = (e) => {
        e.preventDefault();
        mutation.mutate({
            email: formData.email,
            password: formData.password,
        });
    };

    return (
        <Wrapper>
            <FormContainer>
                <h2>Đăng nhập</h2>

                <InputField
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleOnChange}
                />

                <div style={{ position: "relative", width: "100%" }}>
                    <InputField
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Mật khẩu"
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

                {/* Hiển thị lỗi API */}
                {data?.status !== 'ERR' && data?.message && (
                    <p style={{ color: "red", fontSize: "16px", float: "left", margin: "4px", fontWeight: "bold" }}>{data.message}</p>
                )}
                <form onSubmit={handleSignin}>
                    <Button
                        type="submit"
                        disabled={
                            isLoading ||
                            !formData.email?.trim() ||
                            !formData.password?.trim() ||
                            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                        }
                    >
                        {isLoading ? <Spin size="small" /> : "Đăng nhập"}
                    </Button>
                </form>

                <CheckboxContainer>
                    <div>
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Ghi nhớ</label>
                    </div>
                    <div style={{ cursor: "pointer" }}>Quên mật khẩu</div>
                </CheckboxContainer>

                <p style={{ fontSize: "16px" }}>
                    Bạn chưa có tài khoản?
                    <RegisterText onClick={() => navigate("/sign-up")}>
                        Đăng ký tài khoản
                    </RegisterText>
                </p>
            </FormContainer>
        </Wrapper>
    );
};

export default SignInPage;
