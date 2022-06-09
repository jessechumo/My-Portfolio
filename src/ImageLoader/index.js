import React, { Component, Fragment } from "react";
import CircularSpinner from "./circular";

class ImageLoader extends Component {
  state = {
    src: `https://user-images.githubusercontent.com/40341693/172900232-b0e11ba1-7c97-4145-bbb8-2d13bc0d33c1.jpg${new Date().getMilliseconds()}`,
    loaded: false
  };

  onImageLoaded = () => {
    this.setState({ loaded: true });
  };

  refreshImage = () => {
    this.setState({
      loaded: false,
      src: `https://user-images.githubusercontent.com/40341693/172900232-b0e11ba1-7c97-4145-bbb8-2d13bc0d33c1.jpg${new Date().getMilliseconds()}`
    });
  };

  render() {
    const { src, loaded, error } = this.state;

    return (
      <Fragment>
        <div className="image-container">
          <img
            src={src}
            onLoad={this.onImageLoaded}
            onError={this.onImageError}
          />
          {!loaded && (
            <div className="image-container-overlay">
              <CircularSpinner />
            </div>
          )}
        </div>
        <div>
          <button onClick={this.refreshImage} className="button">
            Refresh Image
          </button>
        </div>
      </Fragment>
    );
  }
}

export default ImageLoader;
