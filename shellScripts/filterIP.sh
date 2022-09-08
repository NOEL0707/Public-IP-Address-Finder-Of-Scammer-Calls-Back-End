#!/bin/bash

isPrivateIP(){
	ipAddr=$1
	if [[ $ipAddr == 192.168.*  ]] ; then
		return 1
	fi
	if [[ $ipAddr == 10.*  ]] ; then
                return 1
        fi
	if [[ $ipAddr = 172.[16-31].*  ]] ; then
                return 1
        fi
	return 0
}


#Remove Private IPs


while read ip;do
	isPrivateIP $ip
	if [ $? == 0 ]; then
		echo $ip >> ./results/out4.txt
	fi
done < ./results/unfilteredIp.txt

#remove organizational ips
while read ip;do
	isp=$(ip-tracer -t $ip| grep -i "ISP" )
	organization=$(ip-tracer -t $ip | grep -i "Organization")
    if ! [[ $organization == Facebook ]] && ! [[ $organization == facebook  ]] && ! [[ $organization == Google ]] ; then
	   ((cou=cou+1))
	   echo $ip >> ./results/filteredIP.txt
    fi
done < ./results/out4.txt



