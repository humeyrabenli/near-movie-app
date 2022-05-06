#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


read -p "Enter movie Id: " id
echo
echo "You entered $id"

read -p "Enter deposit amount: " deposit
echo
echo "You entered $deposit"


echo
echo --------------------------------------------
echo 
echo "Calling buyBook function"
echo

near call $CONTRACT donateMovie '{"id": '$id'}' --accountId $OWNER --deposit $deposit

echo
echo