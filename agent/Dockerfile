FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy only necessary files, excluding node_modules
COPY playground_agent.ts ./
COPY tsconfig.json ./

# Build TypeScript files
RUN npm run build

# Move the built file to the app directory
RUN mv dist/playground_agent.js ./

# List contents for debugging
RUN ls -la /app

# Command to run the agent
CMD ["node", "playground_agent.js", "start"]
