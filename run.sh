#!/bin/bash
SCRIPT_PATH=`realpath $0`
SCRIPT_DIR=`dirname $SCRIPT_PATH`

DEBUG_FILE=/boot/no_system_control

cd $SCRIPT_DIR
echo $SCRIPT_DIR

if [ -f $DEBUG_FILE ]; then
  echo "DEBUG FILE $DEBUG_FILE detected, System Control will not start"
  exit
fi

export CONFIG_PATH=/boot/config/systemcontrol.json
export DEBUG=node-system-control:*

while true; do
	npm start .
	sleep 5
done
