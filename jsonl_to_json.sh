#!/bin/sh
echo "[" > "Large_Even.json"
while IFS="\n" read -r Complaint
do
    echo "$Complaint," >> "Large_Even.json"
done < "/home/ashahbaz/Downloads/Large_Predictions_Even.jsonl"
sed -i '$ s/.$//' Large_Even.json
echo "]" >> "Large_Even.json"