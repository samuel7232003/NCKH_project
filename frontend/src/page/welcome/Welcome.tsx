import { useEffect } from "react";
import down_icon from "./images/down-icon.png"
import './welcome.css'
import { Outlet, useNavigate } from "react-router-dom";
import infor1_img from "./images/image 5.png"
import infor2_img from './images/roi_loan_tam_ly_la_benh_gi_1_028b954845.jpg'

export default function Welcome(){
    const navigate = useNavigate()

    useEffect(()=>{
        const saveLogin = localStorage.getItem("saveLogin");
        if(saveLogin) navigate("/home");
        // eslint-disable-next-line
    }, [])

    return (
    <>
        <div className="bg-welcome-bg w-[100vw] h-[100vh] bg-cover fixed z-[-1]"></div>
        <main className="h-[100vh] flex justify-center items-center px-3 main-wc">
            <div className="min-h-h-[380px] w-[1200px] flex top-wc ">
                <div className="w-[45%] text-[#fff] pr-[32px] text-wc">
                    <h1 className="text-[42px] font-bold">Chào mừng bạn đến với Hiểu Để Yêu Thương</h1>
                    <p>Một website quan tâm đến sức khỏe tâm thần của bạn ...</p>
                </div>
                <Outlet/>
            </div>
            <div className="scroll-down w-[125px] absolute bottom-2 text-center">
                <a href="#infor">
                    <p className="text-[#fff] text-[14px]">Lướt xuống để khám phá</p>
                    <figure><img className="mx-auto" src={down_icon} alt="" /></figure>
                </a>
            </div>
        </main>
        <div id="infor" className="h-[100vh] bg-cover flex px-[86px] py-[52px] flex-col">
            <div className="text-white mb-5 mt-[40px]">
                <h1 className="font-bold text-[42px]">Chào mừng bạn đến với Hiểu Để Yêu Thương</h1>
                <p className="text-[18px]">Một website quan tâm đến sức khỏe tâm thần của bạn ...</p>
            </div>
            <div className="bg-[rgba(0,0,0,0.66)] rounded-[10px] h-[540px] px-[38px] py-[32px] overflow-scroll overflow-x-hidden">
                <div className="flex gap-[30px] mb-[50px]">
                    <div>
                        <h2 className="text-white font-bold mb-[20px] text-[18px]">Sức khỏe tâm thần là gì?</h2>
                        <p className="text-white text-justify text-[18px]"> Tổ chức Y tế Thế giới (WHO, 2001) định nghĩa sức khỏe tâm thần là trạng thái hạnh phúc mà ở đó mỗi cá nhân nhận ra được tiềm năng của chính mình, có thể ứng phó được với những căng thẳng bình thường của đời sống, có thể làm việc một cách hiệu quả và có năng suất, có thể đóng góp vào sự phát triển cộng đồng mà họ đang sống. <br/> <br/>
 	                    Sức khỏe tâm thần không chỉ là trạng thái không có rối loạn tâm thần hay bất kỳ vấn đề gì về tinh thần, mà ở đó chức năng nhận thức, cảm xúc, hành vi của con người hoạt động bình thường nhờ sự vận hành bình ổn của não bộ và đời sống xã hội.<br/><br/>
                        Sức khỏe tâm thần của một người - bất kể tuổi tác, giới tính - cũng quan trọng như sức khỏe thể chất của họ. Sức khỏe tâm thần là một phần trong sức khỏe tổng thể của con người và có mối liên hệ mật thiết với sức khỏe thể chất.
                        </p>
                    </div>
                    <figure className="w-[100%] flex items-center"><img src={infor1_img} alt="" /></figure>
                </div>
                <div className="flex gap-[30px] flex-row-reverse">
                    <div>
                        <h2 className="text-white font-bold mb-[20px] text-[18px]">Một số rối loạn sức khỏe tâm thần thường gặp</h2>
                        <p className="text-white text-justify text-[18px]"> 
                            1. Rối loạn trầm cảm: Tình trạng cảm thấy buồn bã, trống rỗng hoặc cáu gắt kéo dài, đi kèm với những thay đổi về thể chất và nhận thức, ảnh hưởng đáng kể đến khả năng hoạt động của cá nhân.
                            <br/><br/>2. Rối loạn lo âu: Cảm giác lo lắng, sợ hãi hoặc căng thẳng quá mức cùng với những xáo trộn về hành vi liên quan. Một số dạng phổ biến thuộc nhóm rối loạn lo âu bao gồm: rối loạn lo âu tổng quát, rối loạn hoảng sợ, rối loạn ám ảnh cưỡng chế (OCD) và rối loạn lo âu xã hội.
                            <br/><br/>3. Rối loạn lưỡng cực: Bao gồm sự thay đổi mạnh mẽ có tính chu kỳ, xen kẽ giữa các giai đoạn trầm cảm và hưng cảm.
                            <br/><br/>4. Rối loạn stress sau chấn thương (PTSD): Phát triển sau khi trải qua hoặc chứng kiến một sự kiện mạnh gây chấn thương, bao gồm các loại triệu chứng trải nghiệm lại (hồi tưởng hoặc gặp ác mộng), né tránh và tê liệt, kích động thể chất (như dễ nổi nóng, cảnh giác cao độ, mất ngủ).
                            <br/><br/>5. Rối loạn phát triển: Bao gồm các dạng rối loạn phổ tự kỷ, rối loạn tăng động giảm chú ý, rối loạn học tập,… gây ảnh hưởng đến khả năng tự lập, giao tiếp, tương tác xã hội và học tập.
                            <br/><br/>6. Rối loạn ăn uống: Bao gồm các tình trạng như chán ăn tâm thầm, háu ăn tầm thần, ăn uống vô độ.
                            7. Tâm thần phân liệt: Tình trạng loạn thần nặng, gồm các triệu chứng liên quan đến hoang tưởng, ảo giác, suy nghĩ rời rạc, hành vi bất thường và các triệu chứng âm tính (như cùn mòn cảm xúc, mất ý chí, ngôn ngữ nghèo nàn).
                        </p>
                    </div>
                    <figure className="w-[100%] flex items-center"><img src={infor2_img} alt="" /></figure>
                </div>
            </div>
        </div>
    </>
    )
}