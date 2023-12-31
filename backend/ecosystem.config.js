const dotenv = require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_HOST,
  REPO_URL,
  DEPLOY_USER,
  REPO_REF,
  DEPLOY_PATH,
} = dotenv.parsed;

const { JWT_SECRET, DATABASE_HOST } = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      script: './dist/app.js',
      env_production: {
        NODE_ENV: 'production',
        DATABASE_HOST,
        secret_word: JWT_SECRET,
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
      'pre-deploy-local': `scp -C ./.env ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source`,
      'post-deploy': 'npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
