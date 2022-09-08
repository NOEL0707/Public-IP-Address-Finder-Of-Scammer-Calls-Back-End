const { exec } = require('child_process');

async function killProcess(PID) {

    const executedcmd = exec(`taskkill /PID ${PID} /F`, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
  
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout:\n${stdout}`);
    });
    return executedcmd.pid;
  }
  module.exports={killProcess}