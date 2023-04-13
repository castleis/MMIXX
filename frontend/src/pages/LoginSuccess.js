import { useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';
import axios from "axios";


const LoginSuccess = () => {
    
    // 현재 url 의 쿼리스트링을 변경
    const [searchParams] = useSearchParams();

    // 특정한 key의 value를 가져오는 메서드, 해당 key 의 value 가 두개라면 제일 먼저 나온 value 만 리턴
    const token = searchParams.get("token");
    const seq = searchParams.get("no");   
    // console.log(token);

    const instance =  axios.create({
        baseURL: process.env.REACT_APP_BASE_URL, // 서버용
        // baseURL: 'http://localhost:5555/api', // 로컬 테스트용
        // baseURL: 'https://j8a403.p.ssafy.io/api',
        headers: {
          'Authorization': `Bearer ${token}`
        }
    })

    const getUser = async ( userSeq ) => {
        return await instance({
          url: `/user/${userSeq}`
        })
    }

    // const [ userInfo, setUserInfo ] = useSetRecoilState(userInfo);
    // const [ isLogin, setIsLogin ] = useSetRecoilState(isLogIn);
    useEffect(() => {
        // console.log("dddddddddd");
         getUser(seq).then(res => {
            // console.log(res.data);
            // setUser(res.data);
            return res.data
         }).then(res => {
             localStorage.setItem('user', JSON.stringify(res));
             localStorage.setItem('auth', token);
             localStorage.setItem('isLogin', 'true');
            //  setUserInfo(res);
            //  setIsLogin(true);
         }).then(res => {
             window.location.href = "/"
         })

    });
    

};

export default LoginSuccess;