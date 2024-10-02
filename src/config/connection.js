import mongoose from 'mongoose' ;
import CONSTANTS from './constants.js';

const Database = mongoose.connect(CONSTANTS.database_url)

export default Database ;