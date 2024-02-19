import { useState } from "react";
import {PhotoAlbum} from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";



export function ResponsivePhoto( photo  ) {
  const breakpoints = [
    3840, 2400, 1080, 640, 256, 128,
    96, 64, 48];


    const regex_height = /(?<==w\d{1,5}-h)\d{1,5}/;
    const regex_width = /(?<==w)\d{1,5}(?=-h)/;
    const photoHeight = photo.match(regex_height)[0];
    const photoWidth = photo.match(regex_width)[0];
    const width = breakpoints[0];
    const height = Math.round(
      (photoHeight / photoWidth) * width);

    src = photo.replace(
      regex_height, height).replace(regex_width, width)

    return {
      src: photo,
      width: width,
      height: height,
      srcSet: breakpoints.map( (breakpoint) =>{
        const heightbp = Math.round(
          (photoHeight / photoWidth) * breakpoint);
        return {
          src: photo.replace(
            regex_height, heightbp).replace(
            regex_width, breakpoint),
          width: breakpoint,
          height: height,
        };
      }),
    };
}




export default function Gallery({ photos }) {
  const [index, setIndex] = useState(-1);

  const respPhotos = photos.map( (photo) => {
      return ResponsivePhoto(photo);
    }); 

  return (
    <>
      <PhotoAlbum photos={respPhotos} layout="masonry"
      targetRowHeight={250}
        onClick={ ( {index} ) => setIndex(index) } />

      <Lightbox
        slides={respPhotos}
        open={ index >=0 }
        index={ index }
        close={ () => setIndex(-1) }
        plugins={[Fullscreen, Zoom]} />
    </>
  );
}