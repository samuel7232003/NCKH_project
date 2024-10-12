import { Link } from "react-router-dom";
import ava_doctor from "./ava-doctor.png"

export default function Welcome(){
    return (
        <main className="bg-welcome-bg h-[100vh] bg-cover flex justify-center items-center">
            <div className="h-[380px] w-[1200px] flex">
                <div className="w-[45%] text-[#fff] pr-[32px]">
                    <h1 className="text-[42px] font-bold">Chào mừng bạn đến <br/> với...</h1>
                    <p>Một website quan tâm đến sức khỏe tâm thần của bạn ...</p>
                </div>
                <div className="w-[55%] flex items-end">
                    <ul className="h-[300px] w-[100%] bg-[rgba(217,217,217,0.29)] rounded-[10px] p-[26px]">
                        <li><p>Sức khỏe Tâm thần là gì?</p></li>
                        <li>
                            <figure className="size-[48px]"><img className="h-fill" src={ava_doctor} alt="" /></figure>
                            <p>Theo Tổ chức Y tế Thế giới (WHO) định nghĩa sức khỏe tâm thần là trạng thái hạnh phúc trong đó một cá nhân nhận ra khả năng của chính mình, có thể đối phó với những căng thẳng bình thường của cuộc sống, có thể làm việc hiệu quả và có thể đóng góp cho cộng đồng...</p>
                        </li>
                        <li><Link to="/">Xem thêm</Link></li>
                    </ul>
                </div>
            </div>
        </main>
    )
}