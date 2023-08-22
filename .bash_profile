sudo gpasswd -a pm2 wacorasu
ssh-keyscan github.com >> ~/.ssh/known_hosts
sudo -u www-data stat home/wacorasu/mesto-frontend/static
sudo gpasswd -a www-data wacorasu
npm install -g npm@9.8.1