'use strict'
const minimist = require('minimist')
const hap = require('hap-nodejs')
const CameraAccessory = require('./CameraAccessory')(hap, hap.Accessory, console.log)
const _ = require('lodash');

let conf = {}
const argv = minimist(process.argv.slice(2))
const configFile = argv['c'] || argv['config']
if (configFile) {
  try {
    conf = require(configFile)
  } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') { throw e } }
}

_.defaults(conf, {
    id: process.env.HOMEBRIDGE_CAMERA_RPI_ID,
    name: process.env.HOMEBRIDGE_CAMERA_RPI_NAME,
    pincode: process.env.HOMEBRIDGE_CAMERA_RPI_PINCODE,
    username: process.env.HOMEBRIDGE_CAMERA_RPI_USERNAME,
}, {
    pincode: '031-45-154',
    username: 'EC:23:3D:D3:CE:CE',
});
console.log(JSON.stringify(conf));

console.log('HAP-NodeJS starting...')

hap.init()

const cameraAccessory = new CameraAccessory(conf)

const pincode = conf.pincode;

cameraAccessory.publish({
  username: conf.username,
  pincode: pincode,
  category: hap.Accessory.Categories.CAMERA
}, true)

console.log('Scan this code with your HomeKit App on your iOS device to pair with Camera:')
console.log('                       ')
console.log('    ┌────────────┐     ')
console.log(`    │ ${pincode} │     `)
console.log('    └────────────┘     ')
console.log('                       ')
