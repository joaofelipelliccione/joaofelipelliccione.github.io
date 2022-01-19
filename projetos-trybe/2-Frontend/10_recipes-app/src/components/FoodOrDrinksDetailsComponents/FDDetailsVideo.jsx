import React from 'react';
import PropTypes from 'prop-types';

function FDDetailsVideo({ recipeInfo }) {
  return (
    <div>
      {recipeInfo !== undefined
        && (
          <iframe
            data-testid="video"
            src={ recipeInfo.strYoutube !== undefined
              ? `https://www.youtube.com/embed/${recipeInfo.strYoutube.split('=')[1]}`
              : null } // REF: https://dev.to/bravemaster619/simplest-way-to-embed-a-youtube-video-in-your-react-app-3bk2
            width="560"
            height="315"
            frameBorder="0"
            allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded Youtube Video"
          />)}
    </div>
  );
}

FDDetailsVideo.propTypes = {
  recipeInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FDDetailsVideo;
