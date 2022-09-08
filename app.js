const express = require("express");
const app = express();
const cors = require("cors");
const {spawnTshark}=require("./utils/spawnTshark");
const {killProcess}=require("./utils/killProcess");
const {getIps}=require("./utils/getIPresults")
const fs = require('fs');

// for parsing application/json
app.use(express.json());


// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));

//for port to port communication.
// const corsOpts = {
//   origin: '*',

//   methods: [
//     'GET',
//     'POST',
//   ],

//   allowedHeaders: [
//     'Content-Type',
//   ],
//   withCredentials: false
// };
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

// app.use(cors(corsOpts));


app.post("/startCapturing", (req, res) => {
  console.log(req.body)
  let spawnedProcessId=spawnTshark(req.body.networkInterface);
  console.log("process id", spawnedProcessId)
  // const content = str(spawnedProcessId);
  fs.writeFile('./results/PID.txt', spawnedProcessId.toString(), err => {
    if (err) {
      console.error("file Error",err);
    }
    // file written successfully
  });
  res.sendStatus(200);
});


app.get("/stopCapturing", (req, res) => {
  // let spawnedProcessId=spawnTshark(req.body.networkInterface);

  const fs = require('fs');

  let PID;
  fs.readFile('./results/PID.txt', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return;
      }
      console.log("pid is ",data);
      PID=Number(data);
      console.log("pid in num",PID);
      killProcess(PID);
  });

  res.sendStatus(200);
});

app.get("/getIpResults", async (req, res) => {
  const IPData=await getIps();
  if(IPData){
    res.status(200).send({data:IPData});
  }
  else{
    res.status(500);
  }
});
app.timeout = 0;
app.listen(4444, () => {
    console.log("Listening on port 4444");
});

  