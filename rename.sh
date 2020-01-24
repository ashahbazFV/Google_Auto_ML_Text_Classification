#!/bin/bash
IFS='
'
i=0;
for f in /home/ashahbaz/test/test_docs/Mortgage/* 
do
    mv "$f" "/home/ashahbaz/test/test_docs/Mortgage/file${i}.txt"
    i=$((i+1))
done
