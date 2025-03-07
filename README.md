Email Queue System with BullMQ

📌 Overview

This project is an email queue system built using BullMQ and Redis. It allows you to queue email sending tasks, process them asynchronously using workers, and handle retries efficiently.

🚀 Features

Job Queueing: Uses BullMQ to queue email sending tasks.

Job Processing: Workers process emails asynchronously.

Retry Mechanism: Failed emails are retried with an exponential backoff.

Logging: Logs job status for easy debugging.

Express API: Exposes RESTful routes to add jobs to the queue.
🛠 Installation

1️⃣ Clone the repository
git clone https://github.com/your-username/email-queue-system.git
cd email-queue-system
2️⃣ Install dependencies
npm install
3️⃣ Start Redis

Make sure Redis is running before starting the queue.
redis-server
4️⃣ Start the Express server
npm start
5️⃣ Start the worker
node email_worker.ts
