module.exports = {
  apps : [
      {
        name: "conference",
        script: "./server.js",
        watch: true,
        env: {
          "NODE_ENV": "development",
          "PORT": "4000",
          "TWILIO_ACCOUNT_SID": "AC8c47b32c7c068f604cbe0da9efb93c6f",
          "TWILIO_API_KEY": "SK138da65c3cc21ec2c07bd9244f72a0e3",
          "TWILIO_API_SECRET": "vOlZ3tt0nPkPOlYHFXK8SKuFQBCGBGWa"
        }
      }
  ]
}
