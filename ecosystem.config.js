const dotenv = require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_HOST,
  REPO_URL,
  REPO_PASSWORD,
  DEPLOY_USER,
  USER_PASSWORD,
  REPO_REF,
  DEPLOY_PATH,
} = dotenv.parsed;

const { JWT_SECRET, DATABASE_HOST } = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      script: './dist/app.js',
      env_env_production: {
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
      user_password: USER_PASSWORD,
      repo: REPO_URL,
      ref: REPO_REF,
      repo_password: REPO_PASSWORD,
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};
