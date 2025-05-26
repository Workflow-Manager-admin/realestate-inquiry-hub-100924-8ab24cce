#!/bin/bash
cd /home/kavia/workspace/code-generation/realestate-inquiry-hub-100924-8ab24cce/realestate_inquiry_hub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

