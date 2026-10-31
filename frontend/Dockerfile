# 1. Base Image - Node.js version 20.19.6
FROM node:20.19.6-alpine

# 2. Container එක ඇතුළේ වැඩකරන Folder එක
WORKDIR /app

# 3. dependencies install කිරීම
COPY package*.json ./
RUN npm install

# 4. Source code එක Copy කිරීම
COPY . .

# 5. Vite එක run වෙන Port එක Expose කිරීම
EXPOSE 5173

# 6. React/Vite dev server එක run කිරීම (--host අනිවාර්යයි Container එක ඇතුළෙන් පිටතට Access ලැබීමට)
CMD ["npm", "run", "dev", "--", "--host"]