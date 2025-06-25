FROM node:22.9.0
# Newer versions may be available at https://nodejs.org/en/

# node may come with an older version of npm. Ensure we have a specific npm.
RUN npm install -g npm@9.8.1
# To check if newer versions are available, see https://www.npmjs.com/package/npm


################################################################################
# Install prerequisites
RUN apt-get update
RUN apt-get install -y \
    lsb-release \
    curl


################################################################################
# Install TypeScript
RUN npm install -g typescript@5.8.3
# More recent version may be available at https://www.npmjs.com/package/typescript
