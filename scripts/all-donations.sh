#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo --------------------------------------------
echo 
echo "Calling getAllDonations function"
echo

near call $CONTRACT getAllDonations --accountId $OWNER

echo
echo