#!/bin/bash
cd /home/kavia/workspace/code-generation/employee-time-and-pay-tracker-45574-45890/employee_time_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

