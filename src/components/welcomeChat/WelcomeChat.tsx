import { Link } from "react-router-dom"
import ava_doctor from "./images/ava-doctor.png"
import seen_icon from "./images/seen-icon.png"

export default function WelcomeChat(){
    return (
        <div className="w-[55%] flex items-end text-[#fff]">
            <ul className=" w-[100%] bg-[rgba(217,217,217,0.29)] rounded-[10px] p-[26px]">
                <li className="flex justify-end mb-5"><p className="pt-2 pb-1 px-4 bg-[rgba(22,192,232,0.79)] rounded-lg">Sức khỏe Tâm thần là gì?</p></li>
                <li className="flex gap-3 items-end mb-5">
                    <figure className="size-[48px]"><img className="h-fill" src={ava_doctor} alt="" /></figure>
                    <p className="max-w-[75%] pt-2 pb-1 px-4 bg-[rgba(82,82,82,0.79)] rounded-lg">Theo Tổ chức Y tế Thế giới (WHO) định nghĩa sức khỏe tâm thần là trạng thái hạnh phúc trong đó một cá nhân nhận ra khả năng của chính mình, có thể đối phó với những căng thẳng bình thường của cuộc sống, có thể làm việc hiệu quả và có thể đóng góp cho cộng đồng...</p>
                </li>
                <li className="flex justify-end"><p className="pt-2 pb-1 px-4 bg-[rgba(22,192,232,0.79)] rounded-lg underline"><Link to="/">Xem thêm</Link></p></li>
                <li className="flex justify-end"><figure><img src={seen_icon} alt="" /></figure></li>
            </ul>
        </div>
    )
    
}