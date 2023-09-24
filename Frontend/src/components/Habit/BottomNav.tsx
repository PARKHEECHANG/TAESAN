import React from 'react';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { IconButton } from "@material-tailwind/react";
import { HiHome } from "react-icons/hi";
import { BsPerson,BsCreditCard} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
const BottomNav = () => {
    const navigate = useNavigate();
    return (
        <div className="z-10 flex justify-around items-center bg-white h-[8vh] max-w-full fixed bottom-0 left-0 right-0">
          <div className="flex flex-col items-center">
        <div>
        <BsCreditCard className="text-main text-xl" onClick={()=>{navigate('/pay')}}/>
        </div>
        <div className="font-normal text-sm text-main">
        Card
        </div>
          </div>

    {/* <IconButton variant="filled"  className="bg-main rounded-full h-[9vh] w-[9vh] max-w-none max-h-none mb-[5vh] flex justify-center items-center" >
          <HiHome className="text-xl"/>
      </IconButton> */}
      <div className="relative">
                {/* 반지름 20px 짜리 투명색 원 */}
                {/* <div className="w-24 h-24 rounded-full bg-opacity-0 bg-white z-40 absolute bottom-8  left-1/2 transform -translate-x-1/2 "></div> */}
                <IconButton variant="filled" onClick={()=>{navigate('/main')}}className="bg-main  rounded-full z-30 h-[9vh] w-[9vh] max-w-none max-h-none mb-[5vh] flex justify-center items-center">
                    <HiHome className="text-xl" />
                </IconButton>
            </div>
          <div className="flex flex-col items-center">
            <div>
        <BsPerson className="text-main text-2xl" onClick={()=>{navigate('/mypage')}}/>
        </div>
        <div className="font-normal text-sm text-main">
        Profile
        </div>
        
          </div>
        </div>
        
    );
};

export default BottomNav;