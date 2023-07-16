module.exports = {
  apps: [
    {
      name: "client",
      script: "npm",
      args: "run start",
      cwd: "./client",
      watch: true,
      autorestart: false,
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "server",
      script: "npm",
      args: "run start",
      cwd: "./server",
      watch: true,
      autorestart: false,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};