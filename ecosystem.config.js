module.exports = {
  apps: [{
    script: 'npm start',
  },],

  deploy: {
    production: {
      key: 'DevCael-Home.pem',
      user: 'ubuntu',
      host: '18.228.153.32',
      ref: 'origin/main',
      repo: 'https://github.com/devcael/seletimportados',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes',
    }
  }
};
