const dotenv = require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_HOST,
  REPO_URL,
  DEPLOY_USER,
  REPO_REF,
  DEPLOY_PATH,
} = dotenv.parsed;

const { REACT_APP_API_URL } = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-frontend',
      script: './build/app.js',
      env_production: {
        NODE_ENV: 'production',
        REACT_APP_API_URL,
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      repo: REPO_URL,
      ref: REPO_REF,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -C ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};
