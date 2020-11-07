import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/header/Header';
// import { Body } from '../components/body/Body';
import { Footer } from '../components/footer/Footer';
import { Feature } from '../components/feature/Feature';

export const Home = () => {
    const history = useHistory();
    const userInfo = localStorage.getItem('userInfo');
    console.log(userInfo);


    return (

        <div>
            { userInfo === null || userInfo === {} ?
                <>
                    {console.log('userInfo', userInfo)}
                    <Header>
                        {/* Header.jsx 컴포넌트를 보면 children을 props로 줘서 아래에 랜더링 해줬다. */}
                        <Feature />
                    </Header>
                    {/* <Body /> */}
                    <Footer />
                </>
                :
                <>
                    {history.push('/browse')}
                </>

            }
        </div>
    )
}
