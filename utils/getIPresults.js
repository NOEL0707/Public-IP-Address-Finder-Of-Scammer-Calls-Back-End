// const { exec } = require('child_process');
var shell = require('shelljs');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(fs.readFile);
const readline = require('readline');
async function getIps() {
  let IPsData=[];
  let IPs;
  console.log("in func")
  let file1=`"C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\shellScripts\\ipListBeforeFiltering.sh"`;
  let file2=`"C:\\Users\\noel vincent\Desktop\\Goa_Hackathon\\results\\capture_output.pcap"`;
  let file3=`"C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\shellScripts\\filterIP.sh"`;
  let file11=`"./shellScripts/ipListBeforeFiltering.sh"`;
  let file22=`"./results/capture_output.pcap"`;
  let file33=`"./shellScripts/filterIP.sh"`;

  try {
    const { stdout, stderr } = await exec(`bash ${file11} ${file22}`,{cwd: 'C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\'});
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    console.log("STUN Packets Filtered and found unique IP adresses\n");
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
  try {
    const { stdout, stderr } = await exec(`bash ${file33} `,{cwd: 'C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\'});
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    console.log("Filtered whatsapp,private,google IP's\n");

  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
  
  try {
    IPs= await readFile('./results/filteredIP.txt', 'utf8');
    IPs=IPs.split("\n");
    console.log("data",IPs);
  } catch (error) {
    console.error(error); // should contain code (exit code) and signal (that caused the termination).
  }
  try {
    for (const IP of IPs) {
      if(IP=='' || IP==' ') continue;
      const { stdout, stderr,err } = await exec(`bash ${"./shellScripts/getLocfromIP.sh"} "${IP.toString()}"`,{cwd: 'C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\'});
      if(stderr) throw stderr
      const { stdout1, stderr1 } = await exec(`python ${"./utils/createJSON.py"} ${"./results/uncolored.txt"}`,{cwd: 'C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\'});
      console.log('stdout1:', stdout1);
      console.log('stderr1:', stderr1);
      let IPdata= await readFile('./results/sample.json', 'utf8');
      IPsData.push(JSON.parse(IPdata));
    }
    console.log(IPsData,"Finished\n");
    return IPsData;
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

module.exports={getIps}
shell.echo('hello world');
// async function getIps() {
//   console.log("in func")
//   let file1=`"C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\shellScripts\\ipListBeforeFiltering.sh"`;
//   let file2=`"C:\\Users\\noel vincent\Desktop\\Goa_Hackathon\\results\\capture_output.pcap"`;
//   let file3=`"C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\shellScripts\\filterIP.sh"`;
//   let file11=`"./shellScripts/ipListBeforeFiltering.sh"`;
//   let file22=`"./results/capture_output.pcap"`;
//   let file33=`"./shellScripts/filterIP.sh"`;

//   const exec=await shell.execAsync(`bash ${file11} ${file22}`, {cwd: 'C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\'}, {async:true},(error, stdout, stderr) => {
//     if (error) { 
//       console.error(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`stderr: ${stderr}`);
//       return;
//     }
//     console.log(`stdout:\n${stdout}`);
//   });
//   const newIPs =await shell.execAsync(`bash ${file33} `, {cwd: 'C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\'},(error, stdout, stderr) => {
//     if (error) {
//       console.error(`error: ${error.message}`);
//       return;
//     }

//     if (stderr) {
//       console.error(`stderr: ${stderr}`);
//       return;
//     }
//     console.log(`stdout:\n${stdout}`);
//     let returndata;
//   });
//   const x=await fs.readFileAsync('./results/filteredIP.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log("IP DATA ",data);
//     returndata=data
//     console.log(returndata);
//     return returndata;
//   });


    
    
// }
