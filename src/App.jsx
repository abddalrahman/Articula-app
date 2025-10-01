import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Home';
import Navbar from './sections_components/Navbar';
import CheckPath from './components/CheckPath';
import { createContext, useEffect, useState } from 'react';
import About from './About';
import Footer from './sections_components/Footer'
import ErrorPath from './special_components/ErrorPath';
import ContactUs from './ContactUs';
import Jobs from './Jobs';
import FAQs from './FAQs';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Detail from './Detail';
import Articles from './Articles';
import Profile from './Profile';
import My_Articles from './My_Articles';
import UsersList from './sub_sec_components/UsersList';
import EditArticle from './EditArticle';
import ArticlesList from './sub_sec_components/ArticlesList';
import Category from './Category';
import Tags from './Tags';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const ChangeLangContext = createContext(null)

function App() {

  const L_S = localStorage.getItem('login_obj_info')
  const S_S = sessionStorage.getItem('login_obj_info')
  const loginIs = L_S ? JSON.parse(L_S) : S_S ? JSON.parse(S_S) : false
  
  const[currentPath, setCurrentPath]= useState('');
  const[lang, setLang]= useState('en');
  const[logInStatus, setLogInStatus]= useState(loginIs);
  const[updateProfileData, setUpdateProfileData]= useState(false);
  const[colorMode, setColorMode]= useState('');
 
  useEffect(()=>{
    
    AOS.init({ duration: 1000});

    // check language
    const isThereLang = localStorage.getItem('langIs')
    if(isThereLang){
      const bootStrap_cdn = document.querySelector('.bootStrap-cdn')
      if(isThereLang == 'Arabic'){
        document.querySelector('html') ? document.querySelector('html').classList.add('to-rtl') : ''
        document.querySelector('body') ? document.querySelector('body').classList.add('to-rtl') : ''
        if(bootStrap_cdn){
          createNewLink(bootStrap_cdn, 'ar')
        } 
      }else{setLang('en')}
    }

    // check color mode
		const colorMode = localStorage.getItem('color-mode')
		if(colorMode){
			if(colorMode == 'light'){
				document.documentElement.classList.remove('dark-mode')
        setColorMode('light')
			}else{
        document.documentElement.classList.add('dark-mode')
        setColorMode('dark')
			}
		}
  }, [])
  
  // create new bootstrap cdn Link
  const createNewLink = (btn, language)=>{
    btn.remove()
    const newLink = document.createElement('link')
    newLink.rel = 'stylesheet'
    newLink.className = 'bootStrap-cdn'
    if (language == 'ar') {
      newLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.rtl.min.css'
      newLink.integrity = 'sha384-Xbg45MqvDIk1e563NLpGEulpX6AvL404DP+/iCgW9eFa2BqztiwTexswJo2jLMue'
      setLang('ar')
    } else {
      newLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
      newLink.integrity = 'sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM'
      setLang('en')
    }
    newLink.crossOrigin = 'anonymous'
    document.querySelector('head').prepend(newLink)

  }

  // change language handle
  const handleLangChange = ()=>{
    const storageLang = localStorage.getItem('langIs')
    const langBtn = document.querySelector('footer button.convert-lang-btn')
    const bootStrap_cdn = document.querySelector('.bootStrap-cdn')
    if(storageLang){
      if(storageLang == 'Arabic'){
        localStorage.setItem('langIs', 'English')
        document.querySelector('html') ? document.querySelector('html').classList.remove('to-rtl') : ''
        document.querySelector('body') ? document.querySelector('body').classList.remove('to-rtl') : ''
        langBtn ? langBtn.textContent = 'Arabic' : ''
        createNewLink(bootStrap_cdn, 'en')
      }else{
        localStorage.setItem('langIs', 'Arabic')
        document.querySelector('html') ? document.querySelector('html').classList.add('to-rtl') : ''
        document.querySelector('body') ? document.querySelector('body').classList.add('to-rtl') : ''
        langBtn ? langBtn.textContent = 'English' : ''
        createNewLink(bootStrap_cdn, 'ar')
      }
    }else{
      localStorage.setItem('langIs', 'Arabic')
      document.querySelector('html') ? document.querySelector('html').classList.add('to-rtl') : ''
      document.querySelector('body') ? document.querySelector('body').classList.add('to-rtl') : ''
      langBtn ? langBtn.textContent = 'English' : ''
      createNewLink(bootStrap_cdn, 'ar')
    }
  }
  // const {languageIs} = useContext(ChangeLangContext)
  return (
    <>
      <BrowserRouter>
        <ChangeLangContext.Provider value={{
          changeLang: handleLangChange, languageIs: lang, loginData: logInStatus, changeLogin: setLogInStatus, changeProfile: updateProfileData,
            setChangeProfile: setUpdateProfileData, color: colorMode, changeColor: setColorMode
          }}>
          
          <CheckPath updatePath={setCurrentPath}/>
          <Navbar path={currentPath} />
          <main className='overflow-hidden'>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/SignUp" element={<SignUp/>} />
              <Route path="/SignIn" element={<SignIn/>} />
              <Route path="/About" element={<About/>} />
              <Route path="/Contact" element={<ContactUs/>} />
              <Route path="/Jobs" element={<Jobs/>} />
              <Route path="/FAQs" element={<FAQs/>} />
              <Route path="/Articles" element={<Articles/>} />
              <Route path="/Details/:aId" element={<Detail/>} />
              <Route path="/Profile" element={<Profile/>} />
              <Route path="/Category" element={<Category/>} />
              <Route path="/Tags" element={<Tags/>} />
              <Route path="/My_Articles" element={<My_Articles/>} />
              <Route path="/Edit/:aId" element={<EditArticle/>} />
              <Route path="/Dashboard" element={<Dashboard/>} />
              <Route path="/Dashboard/UsersList" element={<UsersList/>} />
              <Route path="/Dashboard/ArticlesList" element={<ArticlesList/>} />
              <Route path="/*" element={<ErrorPath/>} />
            </Routes>
          </main>
          <Footer path={currentPath}/>
        </ChangeLangContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
