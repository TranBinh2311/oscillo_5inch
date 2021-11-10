const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const serialPort = require("serialport");
var http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs');
const path = require('path');
const wifi = require('node-wifi');
const { string } = require('joi');
var childProc = require('child_process'); 
const homeController = require('./controllers/home.controller');

wifi.init({ iface: null });

let serverHTTP;
var objectData;

serverHTTP = server.listen(config.port, async () => {
  await logger.info(`Listening to port ${config.port}`);
  childProc.exec('chromium-browser --start-fullscreen http://localhost:3000/v1');  
});

const exitHandler = () => {
  if (serverHTTP) {
    serverHTTP.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};


//childProc.exec('hromium-browser --start-fullscreen http://localhost:3000/v1', callback);   
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (serverHTTP) {
    serverHTTP.close();
  }
});

//initialize serial connection with a single byte parser
// const serialConnection = new serialPort('COM1', {
//   parser: new serialPort.parsers.Readline({ delimiter: '\r\n' }),
//   baudRate: 115200
// });

//init with RPi
const serialConnection = new serialPort('/dev/ttyAMA0', {
  parser: serialPort.parsers.ByteLength,
  //  baudRate: 57600
  baudRate: 115200
});

function checkPort(path) {
  return new Promise((resolve, reject) => {
    let sock = new serialPort(path, { baudRate: 9600 }, (err, data) => {
      let timer = setTimeout(() => {
        reject(new Error('Timeout'));
      }, 100); // 100ms should be enough. If not increase it
      sock.on('data', (err, data) => {
        clearTimeout(timer); // clear the timer
        if (err) {
          return reject(err);
        }
        else {
          return resolve(path);
        }
      })
      sock.write("AT");
    })
  });
}

async function findConnectedPort() {
  let ports = await serialPort.list();
  for (let i = 0; i < ports.length; i++) {
    let port = ports[i];
    try {
      await checkPort(port.path);
    }
    catch (err) {
    }
  }
  return ports.map(element => element.pnpId);
}




async function main() {
  let connectedPath = await findConnectedPort();
  if (connectedPath === null) {
    console.log('No devices found!');
  }
  else {
    fs.readFile(path.join(__dirname, 'controllers/device/list.device.json'), function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        io.emit("listDevice", obj);
      }
    });
  }
}
var fullData = '';
var stringValidate = false;
//on data callback broadcast to the default socketio connection
serialConnection.on("open", function () {
  serialConnection.on('data', function (data) {
    main();
    for (i = 0; i < data.length; i++) {
      if (data[i] != 35) {
        fullData += String.fromCharCode(data[i]);
        stringValidate = false;
      }
      else if (data[i] == 35) {
        fullData += String.fromCharCode(data[i]);
        stringValidate = true;
        break;
      }
    }
    if (stringValidate === true) {
      io.emit("data", fullData);
      fullData = '';
      stringValidate = false;
    }
  });
});


io.on('connection', (socket) => {
  socket.on('connectWiFi', (msg) => {
    console.log('message: ' + msg);
  });
  
  socket.on('saveData', (msg) => {
    console.log('message: ' + msg);
    objectData = JSON.parse(msg);
    if(msg !== null){
      homeController.addData(objectData);
    }
  });

});






// usb.on('attach', function (device) {
//   //console.log(device)
//   main();
// });
