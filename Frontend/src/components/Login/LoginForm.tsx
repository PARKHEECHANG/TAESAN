import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserStore } from 'store/UserStore';
import { postLogin } from 'api/member';
import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import axios from 'axios';

interface FormProps {
  loginId: string;
  password: string;
}

const schema = yup.object().shape({
  loginId: yup.string().required('아이디를 입력하세요.'),
  password: yup.string().required('비밀번호를 입력하세요.'),
});

const LoginForm = () => {
  const { setAccessToken, setRefreshToken,setConnectedAsset } = useUserStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormProps) => {
    // postLogin을 불러와서 id랑 password를 넘겨주고,
    // postLogin(data.loginId, data.password)
    //   //받아온 accessToken과 refreshToken을 store에 저장해줍니다.
    //   .then((res) => {
    //     setAccessToken(res.data.response.accessToken);
    //     setRefreshToken(res.data.response.refreshToken);
    //     console.log(res.data);
    //     console.log(res.data.response.accessToken);
    //     navigate('/main');  
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log(data.loginId, data.password)
    //   });
    // console.log('폼데이터', data);
    axios.post("https://j9c211.p.ssafy.io/api/member-management/members/login",
    {
      "loginId": data.loginId,
      "password": data.password
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.response.accessToken);
        console.log(res.data.response.refreshToken);
        setAccessToken(res.data.response.accessToken);
        setRefreshToken(res.data.response.refreshToken);
        // 지워야할 부분 ( 테스트를 위한 코드 )
        setConnectedAsset(false);
        navigate('/main');
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <div>
      <Card color="transparent" shadow={false} className="h-screen flex justify-center items-center">
        <div>
          <img src="/Main/logo.png" className="h-36" alt="" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="flex flex-col mb-4 gap-6">
            <div>
              <Input size="lg" label="아이디" crossOrigin="anonymous" {...register('loginId')} />
              {errors.loginId && <p className="font-thin text-sm">{errors.loginId.message}</p>}
            </div>
            <div>
              <Input size="lg" label="비밀번호" crossOrigin="anonymous" {...register('password')} type="password" />
              {errors.password && <p className="font-thin text-sm">{errors.password.message}</p>}
            </div>
          </div>
          <Checkbox
            crossOrigin="anonymous"
            label={
              <Typography variant="small" color="gray" className="flex items-center font-normal">
                자동으로 로그인하기
                <a href="#" className="font-medium transition-colors hover:text-gray-900"></a>
              </Typography>
            }
            containerProps={{ className: '-ml-2.5' }}
          />
          <Button className="mt-6 bg-sub text-lg" type="submit" fullWidth>
            로그인
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal" onClick={() => navigate('/signup')}>
            태산 회원이 아니신가요?{' '}
            <a href="#" className="font-bold text-sub">
              회원가입
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
