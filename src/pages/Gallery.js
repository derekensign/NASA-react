import axios from 'axios'
import { useState, useEffect } from 'react'
import GalleryTile from '../components/GalleryTile'
import {Link, Route} from 'react-router-dom'
import SingleImage from '../pages/SingleImage'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'

const Gallery = (props) => {
      
    
    const [newGallery, setGallery] = useState([])
    const [chosenImage, setChosenImage] = useState([])

    const goToDetails = (i) => {
        // const image = newGallery.find(element => element.data.title === imageTitle)
        console.log(i)
        console.log(newGallery)
        console.log(newGallery[i])
        setChosenImage(newGallery[i])
        console.log(chosenImage)

    }

    const getGallery = async () => {

        try {
            let response = await axios.get(`${process.env.REACT_APP_NASA_12_APOD_API_URL}`)

            setGallery(response.data)

            
            } catch (error) {
                console.log(error)
            }

    }

    useEffect(() => {
        getGallery()},[])

        console.log(newGallery)

        return (
            <div className="gallery-container">
                {newGallery.map((tile, i) => (

                <div key={i} className="gallery-tile">
                    <h5>{tile.title}</h5>
                    <div className="image-container">
                        <img className="tile-image zoom" src={tile.url}/>
                        {props.isStarred(tile.title) ?
                            <div>
                                <h5 className="starOutline" onClick={() => props.deletePicture(tile.title)}>⭑</h5>

                            </div>
                            :
                            <div>
                                <h5 className="starOutline" onClick={() => props.favPicture(tile.title, tile.description, tile.url, tile.copyright)}>✩</h5>

                            </div>
                        }
                    </div>
                </div>

                ))}

            </div>
        )


}

export default Gallery
