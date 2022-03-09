import { generateArr } from './data.js';
import {renderImages} from './render-img-1.js';

const generatedImgData = generateArr(25);

renderImages(generatedImgData);
