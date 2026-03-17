## Lab 1: Connecting a Database

This lab sets up a MongoDB Atlas cluster and a simple Node.js/Express application that connects to it using the native MongoDB driver. The app exposes a single GET `/` route that verifies the connection and returns a JSON success or failure message.

### How to Run

1. Install dependencies:
   - `npm install`
2. Create a `.env` file using `.env.example` as a guide and set `MONGO_URI` and an optional `PORT`.
3. Start the server:
   - `npm start`
4. Visit `http://localhost:3001/` (or your configured port) in a browser or API client.

### Reflection Questions

**1. Why is it important to whitelist IP addresses in a real-world production environment? What are the risks of allowing connections from anywhere (`0.0.0.0/0`)?**

In production, whitelisting specific IP addresses limits who can reach your database, reducing the attack surface. Allowing connections from anywhere (`0.0.0.0/0`) means anyone on the internet can attempt to connect, which increases the risk of brute-force attacks, data exfiltration, misconfigurations being exploited, and accidental exposure of sensitive data.

**2. What is the purpose of the `dotenv` package? What other methods could you use to manage environment variables in a production environment (e.g., in a cloud hosting service)?**

The `dotenv` package loads environment variables from a `.env` file into `process.env`, so secrets like connection strings do not have to be hard-coded in source code. In production, environment variables are typically managed by the hosting platform itself (for example, environment configuration panels, secret managers like AWS Secrets Manager, Azure Key Vault, or Google Secret Manager, Docker/Kubernetes secrets, or CI/CD variable stores) instead of `.env` files.

**3. If your application failed to connect, what are the first few steps you would take to debug the issue?**

I would first confirm that the `MONGO_URI` is correct (including username, password, cluster name, and database). Next, I would verify that the IP address of the application server is whitelisted in MongoDB Atlas and that the network is not blocking outbound connections. Then I would check the application logs and stack traces for specific error messages, confirm that the `dotenv` configuration is loading correctly, and finally test connectivity using a MongoDB client (like MongoDB Compass) with the same URI.

