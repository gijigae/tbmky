   #!/bin/bash

   # Install dependencies
   npm install

   # Build the Next.js app
   npm run build

   # Move the standalone output to the wwwroot directory
   mv .next/standalone/* /home/site/wwwroot/