const { exec } = require('child_process');

function spawnTshark(networkInterface) {

    const executedcmd = exec(`"C:\\Program Files\\Wireshark\\tshark.exe" -i ${networkInterface} -w "C:\\Users\\noel vincent\\Desktop\\Goa_Hackathon\\results\\capture_output.pcap"`, (error, stdout, stderr) => {
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
    console.log(executedcmd.pid)
    return executedcmd.pid;
}
module.exports={spawnTshark}