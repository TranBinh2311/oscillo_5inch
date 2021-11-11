const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs').promises;
const fsystem = require('fs');
const path = require('path');
const childProc = require('child_process'); 

const mainMenu = catchAsync(async (req, res) => {
  const rawdata = await fs.readFile(path.join(__dirname, '/device/list.device.json'));
  let listDeivce = JSON.parse(rawdata);
  console.log(listDeivce);
  res.render('index', {
    listDeivce: listDeivce
  });
})

const addDevice = catchAsync(async (req, res) => {
  let device = req.body;
  console.log("device: ",device);
  await fsystem.readFile(path.join(__dirname, '/device/list.device.json'), function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      if (device.deviceName === obj.deviceName && device.deviceType === obj.deviceType) res.status(204).send({ Mes: "Thiết bị đã tồn tại" });
      else {
        device.deviceId = obj.length // auto identify
        obj.push(device); //add data
        json = JSON.stringify(obj, null, 2); //convert it back to json
        fsystem.writeFileSync(path.join(__dirname, '/device/list.device.json'), json);
        res.status(200).send();
      }
    }
  })
})

const updateDeviceValue = catchAsync(async (req, res) => {
  let device = req.body;
  await fsystem.readFile(path.join(__dirname, '/device/list.device.json'), function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      if (device.deviceId === obj.deviceId) {
        let index = device.deviceId;
        obj[index].lastUpdate = device.lastUpdate;
        obj[index].lastValue = device.lastValue;
        json = JSON.stringify(obj, null, 2); //convert it back to json
        fsystem.writeFileSync(path.join(__dirname, '/device/list.device.json'), json);
        res.status(200).send();
      }
    }
  })
})

const removeDevice = catchAsync(async (req, res) => {
  let device = req.body;
  await fsystem.readFile(path.join(__dirname, '/device/list.device.json'), function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      let index = obj.map(element => element.deviceId).indexOf(device.deviceId);// hao map
      console.log(index);
      if (index > -1) {
        obj.splice(index, 1);
      }
      json = JSON.stringify(obj, null, 2); //convert it back to json
      fsystem.writeFileSync(path.join(__dirname, '/device/list.device.json'), json);
    }
  })
  res.status(200).send();
})

const realTimeData = catchAsync(async (req, res) => {
  res.render('realTimeData');
})

const test = catchAsync(async (req, res) => {
  res.render('test');
})

const addData = async (req) => {
  let dataRealtime = req.body;
  await fsystem.readFile(path.join(__dirname, '/data/data.json'), function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      if (dataRealtime.deviceName === obj.deviceName && dataRealtime.deviceType === obj.deviceType) {
        obj.Lan1 = dataRealtime.Lan1;
        obj.Lan1 = dataRealtime.Lan2;
        obj.Lan1 = dataRealtime.Lan3;
        json = JSON.stringify(obj, null, 2); //convert it back to json
        fsystem.writeFileSync(path.join(__dirname, '/data/data.json'), json);
      }
      else {
        dataRealtime.deviceId = obj.length // auto identify
        obj.push(dataRealtime); //add data
        json = JSON.stringify(obj, null, 2); //convert it back to json
        fsystem.writeFileSync(path.join(__dirname, '/data/data.json'), json);
      }
    }
  })
}

const shutDown = async(req) =>{
  childProc.exec('sudo shutdown -h now');
}

module.exports = {
  mainMenu,
  test,
  realTimeData,
  addDevice,
  removeDevice,
  updateDeviceValue,
  addData,
  shutDown
};
