# 🖥️ Web Terminal Application

A lightweight web-based terminal interface built using **Node.js** and **xterm.js**, containerized with **Docker** and served via **NGINX**. This allows users to interact with a shell-like interface through any modern browser.

---

## 🚀 Features

- Live terminal access in the browser  
- Shell emulation with xterm.js  
- Responsive and minimal UI  
- Dockerized and ready to deploy on any Kubernetes or cloud platform  
- Runs behind NGINX on port 80 for easy access

---

## 📦 Tech Stack

- **Backend**: Node.js 22 (minimal slim build)  
- **Frontend**: xterm.js (integrated in the HTML)  
- **Web Server**: NGINX  
- **Container**: Docker

---

## 🛠️ Installation & Usage

### 1. Clone the Repository
```bash
git clone https://github.com/Manojkumar1709/web-terminal-app.git
cd web-terminal-app
```

### 2. Build the Docker Image

```bash
docker build -t username/web-terminal-app:latest .
```

### 3. Run the Container

```bash
docker run -d -p 80:80 username/web-terminal-app:latest
```

Open your browser and go to: [http://localhost](http://localhost)

**Note**: Make sure port 80 is not already in use. If so, use another port like:

```bash
docker run -d -p 8080:80 username/web-terminal-app:latest
```

---

## 🐳 Docker Hub

You can also pull the image directly from Docker Hub:

```bash
docker pull manoj1709/web-terminal-app:latest
```

---

## 📁 Project Structure

```
.
├── Dockerfile
├── nginx.conf
├── server.js
├── package.json
├── public/
│   └── index.html
└── README.md
```

---

## ✍️ Author

**Manoj M**  
[GitHub](https://github.com/Manojkumar1709) | [DockerHub](https://hub.docker.com/u/manoj1709)

---

