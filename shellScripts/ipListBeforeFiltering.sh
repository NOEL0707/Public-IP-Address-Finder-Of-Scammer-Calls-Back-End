#!/bin/bash
echo "puku"
touch ./results/out.txt
touch ./results/out2.txt
touch ./results/out4.txt
touch ./results/unfilteredIp.txt
touch ./results/filteredIP.txt

echo -n "" >./results/unfilteredIp.txt
echo -n "" >./results/filteredIP.txt
echo -n ""> ./results/out.txt
echo -n ""> ./results/out2.txt
echo -n ""> ./results/out4.txt
tshark -r $1 -T fields -e ip.src -e ipv6.src -e ip.dst -e ipv6.dst -e _ws.col.Protocol -e udp| grep "STUN" > ./results/out.txt

while read ip dum; do
    echo "$ip" >> ./results/out2.txt
done < ./results/out.txt

sort ./results/out2.txt | uniq > ./results/unfilteredIp.txt
