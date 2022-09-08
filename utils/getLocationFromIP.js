// const { exec } = require('child_process');
var shell = require('shelljs');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(fs.readFile);
async function getLocationFromIP(IPAddress) {
  console.log("in func")

  let file11=`"./shellScripts/getLocfromIP.sh"`;

  try {
    const { stdout, stderr } = await exec(`bash ${file11} ${IPAddress}`,{cwd: 'C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\'});
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    console.log("STUN Packets Filtered and found unique IP adresses\n");
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }  
  try {
    const data = await readFile('./results/filteredIP.txt', 'utf8');
    console.log("data",data);
    return Buffer.from(data);
  } catch (error) {
    console.error(error); // should contain code (exit code) and signal (that caused the termination).
    
  }
}

module.exports={getLocationFromIP}