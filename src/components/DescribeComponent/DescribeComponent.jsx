import React from "react";
import { WrapperContainer, Title, Content } from "./style";
import ReviewComponent from "../ReviewComponent/ReviewComponent";

const DescribeComponent = () => {
    return (
        <div>
            <WrapperContainer>
                <Title>Giới thiệu:</Title>
                <Content>
                    Giới thiệu sách
                    Sách là kho tàng tri thức vô giá, giúp con người mở rộng tầm nhìn, bồi dưỡng tâm hồn, rèn luyện tư duy và hoàn thiện bản thân. Hướng tới Ngày Sách và Văn hóa đọc Việt Nam năm 2024 với thông điệp “Sách hay tìm bạn đọc”, Nhà xuất bản Thông tin và Truyền thông phối hợp cùng các chuyên gia, nhà khoa học, nhà giáo biên soạn và xuất bản cuốn sách “Học, Đọc sách và Sáng tạo” (Hay tư tưởng về phát triển con người) dạng cẩm nang, làm tài liệu tham khảo cho đông đảo bạn đọc trong học tập, nghiên cứu và công việc..

                    "Học, Đọc sách và Sáng tạo" là tập hợp những lời dạy của Tiền nhân từ Cổ đến Kim, từ Đông sang Tây và những lời bàn của các nhà hoạt động văn hóa, giáo dục. Đây là tập sách sưu tầm, tuyển chọn, biên soạn do GS. TS Nguyễn Như Ý, TS Võ Thế Quân, TS Vũ Thùy Dương thực hiện.

                    Với gần 400 trang, cuốn sách là một tác phẩm khá dày dặn, được nhóm tác giả gồm GS Nguyễn Như Ý, TS Trần Chí Đạt, TS Võ Thế Quân và TS Vũ Thùy Dương sưu tầm, tuyển chọn và biên soạn hết sức công phu, tâm huyết. Người đọc được dẫn dắt bởi một mạch cảm xúc xuyên suốt, mạch lạc tương ứng với 3 phần là những câu danh ngôn (hoặc có tính danh ngôn) của các nhà tư tưởng, nhà văn hóa, nhà giáo dục các nước và Việt Nam nói về việc dạy và học, việc đọc sách, việc sáng tạo của con người.

                    Càng đọc sâu, càng suy ngẫm, càng cảm nhận được rõ đây không chỉ là một ấn bản thông thường mà nó có ích cho mọi người đang sống trong Nền Kinh tế/ Giáo dục chia sẻ có các tác động của cuộc cách mạng công nghiệp 4.0.

                    Và, đúng như PGS.TS Đặng Quốc Bảo trong Cảm nghĩ về cuốn sách đã nhận xét: “Sách Học, Đọc sách và Sáng tạo đã cung cấp cho ta những kiến văn để phát triển Năng lực 4C, đồng thời để phát triển Năng lực 4H & 3KH.

                    • “4C”: Năng lực phản biện; Năng lực giao tiếp; Năng lực hợp tác; Năng lực sáng tạo

                    • “4H” là Huấn đức của Bác Hồ cho một Nhà trường trong thời kháng chiến:  "Học - Hỏi - Hiểu - Hành"

                    • “3KH”: Khỏe - Khôn - Khiêm”

                    Cuốn sách này sẽ góp phần truyền cảm hứng và thúc đẩy các Nhà trường, các Gia đình và mọi người ra sức tự học, ra sức giáo dục con em “Lập chí – Lập thân – Lập nghiệp”.
                </Content>
            </WrapperContainer>
            <ReviewComponent />
        </div>

    );
};

export default DescribeComponent;
