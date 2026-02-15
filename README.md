# Microservices Application - The Transformation

## 🔍 Overview

This repository demonstrates a **microservices architecture** - the result of decomposing a monolithic application into independent, loosely-coupled services. Each service is responsible for a specific business capability and can be developed, deployed, and scaled independently.

### What You'll Learn:

- How to break down a monolith into microservices
- Inter-service communication patterns
- Service independence and isolation
- Docker-based deployment strategies
- Microservices best practices

## 🔄 What Changed?

### From Monolith → To Microservices

| Aspect | Monolith (Before) | Microservices (After) |
|--------|-------------------|----------------------|
| **Codebase** | Single repository | Multiple services |
| **Deployment** | One unit | Independent deployments |
| **Scaling** | Scale entire app | Scale services independently |
| **Technology** | Locked to Node.js | Freedom per service |
| **Database** | Shared MongoDB | Separate databases (optional) |
| **Team Structure** | All in one codebase | Teams per service |
| **Failure Impact** | System-wide | Isolated to service |
| **Build Time** | Entire application | Individual services |

## Architecture

### Microservices Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
└────────────────────────────────┬─────────────────────────────────┘
                                 │
                                 │ HTTP
                                 │
                    ┌────────────▼────────────┐
                    │   Frontend Service      │
                    │   (React/EJS)           │
                    │   Port: 3001            │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                │                │                │
    ┌───────────▼──────────┐    │    ┌──────────▼──────────┐
    │   Auth Service       │    │    │  Payment Service    │
    │   (Node.js)          │    │    │  (Node.js)          │
    │   Port: 3002         │    │    │  Port: 3003         │
    │   • Registration     │    │    │  • Process Payment  │
    │   • Login/Logout     │    │    │  • Payment History  │
    │   • Session Mgmt     │    │    │  • Refunds          │
    └──────────┬───────────┘    │    └──────────┬──────────┘
               │                │               │
               │                │               │
        ┌──────▼──────┐         │        ┌─────▼──────┐
        │  Auth DB    │         │        │ Payment DB │
        │  (MongoDB)  │         │        │ (MongoDB)  │
        └─────────────┘         │        └────────────┘
                                │
                         ┌──────▼──────┐
                         │  Shared DB  │
                         │ (Optional)  │
                         └─────────────┘
```


Microservices Breakdown - breakdown-mono-multi
This repository demonstrates the evolution of our application from a single monolith into a distributed microservices architecture. We have decoupled the frontend from the backend and split the backend into two distinct business domains: Authentication and Payments.
🏗 The Microservices Architecture
Unlike the monolith where everything ran in one process on port 4000, this version runs as four separate containers working in harmony.
1. Frontend Service (port 3000)
Role: Serves the User Interface.
Decoupling: In the monolith, the backend served the HTML. Now, the frontend is an independent service that makes API calls to the Auth and Payment services.
2. Auth Service (port 5001)
Role: Handles user registration and login.
Isolation: It has its own logic and environment variables. If the Payment service crashes, users can still log in because this service is independent.
3. Payment Service (port 5002)
Role: Handles all transaction-related logic.
Scalability: If the app gets many sales, we can scale just this service without affecting the Login logic.
4. Shared Database (mongodb:27017)
Role: Central data store.
Pattern: We are using a Shared Database pattern here. Both Auth and Payment services connect to the same MongoDB instance but use different logical databases (auth_db and payment_db).
🔌 How they Communicate (Service Discovery)
In this setup, we use Docker Internal Networking. Notice the MONGO_URI in the compose file:
mongodb://admin:admin123@mongodb:27017/auth_db
mongodb: This is not localhost. This is the service name defined in the docker-compose.yaml. Docker acts as a DNS server, allowing the auth container to find the mongodb container by its name.
depends_on: Ensures that the database starts up before the services try to connect to it, preventing "Connection Refused" errors.
🛠 Setup and Execution
Clone the repo:
code
Bash
git clone https://github.com/preranabl/breakdown-mono-multi
cd breakdown-mono-multi
Start the entire ecosystem:
code
Bash
docker-compose up --build
Access the services:
Frontend: http://localhost:3000
Auth API: http://localhost:5001
Payment API: http://localhost:5002
## 🎯 Next Steps

### For Further Learning:

1. **Add API Gateway**: Implement a gateway (Kong, Nginx) to route requests
2. **Service Discovery**: Add Consul or Eureka
3. **Message Queue**: Implement RabbitMQ for async communication
4. **Centralized Config**: Use Spring Cloud Config or Consul
5. **Monitoring**: Add Prometheus + Grafana
6. **Logging**: Implement ELK stack
7. **Tracing**: Add Jaeger for distributed tracing
8. **Security**: Implement OAuth2/JWT properly

## 👤 Author

**Prerana Blown Lama**

- GitHub: [@preranabl](https://github.com/preranabl)
- Monolith Repository: [monolith-app](https://github.com/preranabl/monolith-app)
- Microservices Repository: [breakdown-mono-multi](https://github.com/preranabl/breakdown-mono-multi)

