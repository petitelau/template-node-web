const path = require('path'); 
const { env } = require('yargs');
require('dotenv').config({ path: path.join(__dirname, '/../../config/process.env'), debug: false, override: false})

const appProperties = {
    portDefault : 3500,
    maintenanceMode : false,
}

const hbsProperties = { 
    author: 'Laura Gomez', 
    version: '1.0.0' 
}

module.exports = { appProperties, hbsProperties }
