module.exports = {
  apps: [
    {
      name: "easy-pod",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/var/www/easy-pod",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "/var/log/easy-pod/error.log",
      out_file: "/var/log/easy-pod/out.log",
    },
  ],
};
