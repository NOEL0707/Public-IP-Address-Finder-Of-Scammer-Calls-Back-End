#!/bin/bash

ip=$1

formatOutput(){
	addressFile=$1
	sed -r "s/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[mGK]//g" $addressFile > ./results/uncoloredraw.txt
	touch ./results/uncolored.txt
	uncoloredFile="./results/uncolored.txt"
	tail -n +16 ./results/uncoloredraw.txt > $uncoloredFile
	sed -i 's/IP Address * > */ipAddr:/g' $uncoloredFile
	sed -i 's/Country code * > */countryCode:/g' $uncoloredFile
	sed -i 's/Country * > */country:/g' $uncoloredFile
	sed -i 's/Date & Time * > */dateTime:/g' $uncoloredFile
	sed -i 's/Region code * > */regionCode:/g' $uncoloredFile
	sed -i 's/Region * > */region:/g' $uncoloredFile
	sed -i 's/City * > */city:/g' $uncoloredFile
	sed -i 's/Zip code * > */zipCode:/g' $uncoloredFile
	sed -i 's/Time zone * > */timeZone:/g' $uncoloredFile
	sed -i 's/ISP * > */isp:/g' $uncoloredFile
	sed -i 's/Organization * > */organization:/g' $uncoloredFile
	sed -i 's/ASN * > */asn:/g' $uncoloredFile
	sed -i 's/Latitude * > */latitude:/g' $uncoloredFile
	sed -i 's/Longtitude * > */longitude:/g' $uncoloredFile
	sed -i 's/Location * > */location:/g' $uncoloredFile
	rm ./results/uncoloredraw.txt
}



ip-tracer -t $ip > ./results/colored.txt
formatOutput ./results/colored.txt


