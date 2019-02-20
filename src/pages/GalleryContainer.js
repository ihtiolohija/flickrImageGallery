import React, {Component} from 'react';
import Image from '../components/Image';
import SearchBar from '../components/SearchBar';

import RestAPI from '../api';

class GalleryContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
        this.getGalleryImages = this.getGalleryImages.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.getGalleryImages();
    }

    getGalleryImages(text) {
        let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1`;
        if (text){
            url=`${url}&text=${text}`;
        }
        const galleryPromise = RestAPI().get(url);
        const cachedResult = localStorage.getItem(text);
        if (cachedResult) {
            this.setState({ photos: JSON.parse(cachedResult) });
            return;
        }
        galleryPromise.then(result => {
            let imagesData = result.data.photos.photo;
            if (imagesData) {
                if (text){
                    try {
                        localStorage.setItem(text, JSON.stringify(imagesData));
                    }
                    catch(e){

                    }
                }
                this.setState({ photos: imagesData});
            }
        }).catch(() => {
            this.setState({photos: []});
        });
    }


    handleSearch(searchText){
        this.getGalleryImages(searchText);
    }

    render() {
        let photos = this.state.photos;
        let galleryTitle = 'Image Gallery';
        let noImagesText = 'No images to display';
        return (
            <div>
                <h3>{galleryTitle}</h3>
                <SearchBar handleSearch={this.handleSearch} />
                <div className='Gallery'>
                    {photos.length === 0 ? <div>{noImagesText}</div> :
                        photos.map((img, index) => {
                            return <Image key={index} imageData={img}/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default GalleryContainer;
