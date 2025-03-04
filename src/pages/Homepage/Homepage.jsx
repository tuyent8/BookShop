import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperTypeProduct } from "./style";
import Slidercomponent from "../../components/Slidercomponent/Slidercomponent";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.png";
import CardComponent from "../../components/CartComponent/CardComponent";
import FooterComponent from "../../components/FotterComponent/FotterComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Link } from "react-router-dom";

// import NavbarComponent from "../../components/NavbarComponent/NavbarComponent"; // Import Navbar

const Homepage = () => {
    const arr = ['Sách thiếu nhi', 'Sách gia đình', 'Sách chính trị-xã hội', 'Sách khoa học', 'Truyện'];

    return (
        <>
            <div style={{ padding: '0px 120px', background: '#02bbff' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => (
                        <Link
                            to={`/typeproduct/${item}`}
                            key={item}
                            style={{
                                textDecoration: "none",
                                color: "white",
                            }}
                        >
                            <TypeProduct name={item} />
                        </Link>
                    ))}
                </WrapperTypeProduct>
            </div>

            {/* Slider đặt riêng phía trên */}
            <div style={{ backgroundColor: "#efefef", padding: "0 120px" }}>
                <Slidercomponent arrImage={[image1, image2, image3]} />
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#efefef",
                padding: "20px 120px",
                position: "relative" // Để vẽ đường thẳng phía sau
            }}>
                <span style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#02bbff",
                    paddingRight: "20px", // Tạo khoảng cách giữa chữ và đường kẻ
                    backgroundColor: "#efefef", // Đảm bảo chữ không bị che
                    zIndex: "1" // Đặt chữ lên trên đường kẻ
                }}>
                    Tất cả sách:
                </span>
                <div style={{
                    flex: "1",
                    height: "4px",
                    backgroundColor: "#02bbff",
                    position: "relative",
                    top: "4px" // Điều chỉnh để ngang với chữ
                }}></div>
            </div>


            <div id="container"
                style={{
                    backgroundColor: "#efefef",
                    padding: "0px 120px",
                    display: "flex",
                    gap: "20px"
                }}>

                {/* Cột bên trái - Navbar */}
                <div style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    position: "sticky",
                    top: "120px",
                    height: "fit-content",
                }}>
                    <NavbarComponent />
                </div>

                {/* Cột bên phải - Nội dung chính */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "20px",

                    }}>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: "20px", backgroundColor: "#efefef" }}>
                <WrapperButtonMore
                    textButton="Xem thêm"
                    type="outline"
                    styleButton={{ border: "1px solid #02bbff", color: "Blue", width: "240px", height: "38px", borderRadius: "4px" }}
                    styleTextButton={{ fontWeight: "500" }}
                />
            </div>
            <div>
                <FooterComponent />
            </div>
        </>
    );
};

export default Homepage;