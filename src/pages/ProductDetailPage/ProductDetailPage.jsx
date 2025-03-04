import React from "react";
import ProducDetailComponent from "../../components/ProductDetailcomponent/ProductDetailComponent";
import FotterComponent from "../../components/FotterComponent/FotterComponent";
import DescribeComponent from "../../components/DescribeComponent/DescribeComponent";

const ProducDetailPage = () => {
    return (
        <>
            <div style={{ marginTop: '100px', padding: '10px 120px', backgroundColor: '#efefef', paddingBottom: '30px' }}>
                <h1><a style={{ textDecoration: "none", color: "black", padding: '20px' }} href="/">Trang Chủ</a></h1>
                <ProducDetailComponent />
                <DescribeComponent />
            </div>
            
            <div>
                <FotterComponent />
            </div>
        </>

    )
}
export default ProducDetailPage;