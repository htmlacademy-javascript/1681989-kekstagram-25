import { generateArr } from './data.js';
import { renderImages, imgContainer} from './render-img.js';


const generatedImgData = generateArr(25);

renderImages(generatedImgData);
