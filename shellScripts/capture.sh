#!/bin/bash

#Captures live packets from the ethernet interface and writes into the pcap file "capture_output.pcap" and writes the pid of the process into pid.txt file.

#Usage:
# ./capture.sh <ethernetInterface>


touch ../results/capture_output.pcap
chmod 666 ../results/capture_output.pcap
# sudo tshark -i $1 -w ../results/capture_output.pcap &> /dev/null & disown
tshark -i Wi-Fi 
tsharkPID=$!
echo $! > ../results/pid.txt

