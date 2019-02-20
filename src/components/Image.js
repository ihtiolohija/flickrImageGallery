import React, { Component } from 'react';

class Image extends Component {

    createImageUrl(imageData){
        let {farm, server, id, secret} = imageData;
        return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    }
    render() {
        let {imageData} = this.props;
        let url = this.createImageUrl(imageData);
        return (
            <div className="Img-Gallery">
                <img key={this.props.index} alt='image' width='100' height='100' src={url} />
            </div>
        );
    }
}

export default Image;
