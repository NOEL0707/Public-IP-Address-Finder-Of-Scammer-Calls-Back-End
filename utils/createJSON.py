import json
import sys

filename = sys.argv[1]
print(filename)

f = open(filename, "r")
dictionary={}
for x in f:
	if x!='\n':
		ele=x.split(':')
		dictionary[ele[0].strip()]=(ele[1].rstrip('\n'))
with open("./results/sample.json", "w") as outfile:
    json.dump(dictionary, outfile)
