#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

read -p "Enter movie title: " title
echo
echo "You entered $title"

echo


read -p "Enter movie poster path: " poster_path
echo
echo "You entered $poster_path"

echo

read -p "Enter movie overview: " overview
echo
echo "You entered $overview"

echo


echo
echo --------------------------------------------
echo 
echo "Calling setBook function"

near call $CONTRACT addMovie '{"title": "'"$title"'", "poster_path": "'"$poster_path"'", "overview": "'"$overview"'"}' --accountId $OWNER

echo
echo