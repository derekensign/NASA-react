import axios from 'axios'
import './App.css';
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Gallery from './pages/Gallery'
import {useEffect, useState} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {Link} from 'react-router-dom'
import "react-awesome-lightbox/build/style.css"


function App() {
  const [user, setUser] = useState('')
  const [favImages, setFavImages] = useState([])
  const [imageTitles, setImageTitles] = useState([])

  const getUser = async () => {
    const userId = localStorage.getItem('userId')
    try {
      let userInfo = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/getInfo` ,{
      headers:{
        authorization: userId
      }
    })
    console.log(userInfo)
    if(userInfo.data.user) {
      setUser(userInfo.data)  
    }
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    getUser()
  },[])

  const getFavorites = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/images`, {
        headers: {
          Authorization: user.id
        }
      })
      console.log(response)
      setFavImages(response.data.favImages)

      let imageArr = []
      
      for(let image of response.data.favImages) {
        imageArr.push(image.title)
      }

      setImageTitles(imageArr)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFavorites()}, [user])

  const favPicture = async (apodTitle, description, url, copyright) => {
    try {
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/images`,
      {
        title: apodTitle,
        description: description,
        imageurl: url,
        copyright: copyright
      },
      {
        headers: {
          Authorization: user.id
        }
      })
      getFavorites()
    } catch (error) {
      console.log(error)
    }
  }

  const isStarred = (currentAPODTitle) => {
  
    if(imageTitles.includes(currentAPODTitle)) {
      return true
    }
    return false
  }

  const deletePicture = async (apodTitle) => {
    try {
      let res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/images/${apodTitle}`, 
        {
          headers: {
            Authorization: user.id
          }
        })
        console.log(res)
        getFavorites()
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Route exact path="/">
        <Homepage favPicture={favPicture} deletePicture={deletePicture}
        isStarred={isStarred}/>
      </Route>
      <Route exact path="/gallery">
        <Gallery favPicture={favPicture} deletePicture={deletePicture}
        isStarred={isStarred} favImages={favImages}/>
      </Route>
      <Route exact path="/profile">
        <Profile favImages={favImages} isStarred={isStarred} deletePicture={deletePicture}
        user={user} setUser={setUser}/>
      </Route>
      <Route exact path="/login">
      {user ? 
        <Redirect to="/profile" />
        :
          <Login user={user} setUser={setUser}/>
        }
      </Route>
      <Route exact path="/signup">
        <Signup user={user} setUser={setUser}/>
      </Route>

    </div>
  )
}

export default App;
