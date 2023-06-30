import Head from 'next/head'
import { useState, useEffect } from 'react'
import Body from '../components/Body'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { BsYoutube } from 'react-icons/bs'
import axios from 'axios'


export default function Home({data}) {
  // Global state for Sidebar
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const [Mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000)
  }, [])

  return (
    <div>
      {/* Header tags goes here */}
      <Head>
        <title>Akatsuki</title>
        <meta name="description" content="No more YouTube, it's time for MeTube!" />
        <meta name="author" content='Sadeed pv' />
        <meta name='keywords' content='Youtube clone, Youtube 2.0' />
      </Head>
    {/* Contents */}
    <main>
      <div className={Mounted?'block':'hidden'}>
        <Header toggleSidebar={toggleSidebar} />
        <div className='grid grid-cols-7 mt-20'>
          <Sidebar isOpen={isOpen}/>
          <Body data={data} /> 
        </div>     
      </div>
      <div className={Mounted? 'hidden': 'grid place-items-center min-h-screen text-red-500'}>
        <BsYoutube size={115} />
      </div>
    </main>
    </div>
  )
}


export async function getServerSideProps(context){
  const query = context.query.query;
  if (query){
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://youtube-search-and-download.p.rapidapi.com/search',
      params: {
        query: 'rick roll',
        next: 'EogDEgVoZWxsbxr-AlNCU0NBUXRaVVVoeldFMW5iRU01UVlJQkMyMUlUMDVPWTFwaWQwUlpnZ0VMWW1VeE1rSkROWEJSVEVXQ0FRdFZNMEZUYWpGTU5sOXpXWUlCQzJaaGVrMVRRMXBuTFcxM2dnRUxaV3hrWldGSlFYWmZkMFdDQVExU1JGbFJTSE5ZVFdkc1F6bEJnZ0VMT0hwRVUybHJRMmc1Tm1PQ0FRc3pOMFU1VjNORWJVUmxaNElCQzJGaFNXcHpPRXN6YjFsdmdnRUxaMmRvUkZKS1ZuaEdlRldDQVF0clN6UXlURnB4VHpCM1FZSUJDME42VHpOaFNXVXdVbkJ6Z2dFTFNVNHdUMk5WZGtkaU5qQ0NBUXRSYTJWbGFGRTRSRjlXVFlJQkMyWk9NVU41Y2pCYVN6bE5nZ0VMZEZac1kwdHdNMkpYU0RpQ0FRdGZSQzFGT1Rsa01XSk1TWUlCQzJoQlUwNVRSSFZOY2pGUmdnRUxkREEzTVZkdE5EVnhWMDAlM0QYgeDoGCILc2VhcmNoLWZlZWQ%3D',
        hl: 'en',
        gl: 'US',
        upload_date: 't',
        type: 'v',
        duration: 's',
        features: 'li;hd',
        sort: 'v'
      },
      headers: {
        'X-RapidAPI-Key': '13ed6c24d1msh3c7404846ec11f3p125e24jsnb1a89ebb7090',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

      return {
        props: {
          data: response.data.contents
        }
      }
  }else{
    const options = {
      method: 'GET',
      url: 'https://youtube-search-and-download.p.rapidapi.com/trending',
      params: { hl: 'en' },
      headers: {
        'X-RapidAPI-Key': '13ed6c24d1msh3c7404846ec11f3p125e24jsnb1a89ebb7090',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
      }
    };
    
    const response = await axios.request(options);

    return {
      props: {
        data: response.data.contents
      }
    }

  }
}


// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://youtube-search-and-download.p.rapidapi.com/trending',
//   params: {
//     type: 'mu',
//     hl: 'en',
//     gl: 'US'
//   },
//   headers: {
//     'X-RapidAPI-Key': '13ed6c24d1msh3c7404846ec11f3p125e24jsnb1a89ebb7090',
//     'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }