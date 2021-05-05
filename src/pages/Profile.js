

const Profile = (props) => {


    return (
        <div className="favorites-container">
            {props.favImages.map((tile, i) => (

            <div key={i} className="gallery-tile">
            <h5>{tile.title}</h5>
                <div className="image-container">
                    <img className="tile-image zoom" src={tile.imageurl}/>
                    {props.isStarred(tile.title) ?
                        <h5 className="starOutline" onClick={() => props.deletePicture(tile.title)}>⭑</h5>
                        :
                        <h5 className="starOutline" onClick={() => props.favPicture(tile.title, tile.description, tile.imageurl, tile.copyright)}>✩</h5>
                    }
                </div>
            </div>

))}
        </div>
    )
}

export default Profile
