#!/bin/bash

#This script stops tshark capturing i.e; kills the background capturing process.

tsharkPID=$(cat pid.txt)
kill -9 $tsharkPID
