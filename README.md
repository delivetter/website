# Delivetter – Delivery Simulator Website

**Delivetter** is a web-based simulation platform where users can compare parcel delivery performance between a traditional **van** with a delivery person and an autonomous robot named **Ona**. By configuring custom delivery scenarios, users can evaluate cost and time metrics to support strategic logistics decisions.

---

## 🚀 Features

- Visual configuration of delivery scenarios (locations, distances, constraints)
- Interactive map interface using **React Leaflet**
- Clear comparison between van and robot delivery outcomes
- Simulation results displayed with cost/time summaries
- Modular and modern stack with **React**, **Vite**, **Tailwind CSS**, and **FastAPI**

---

## 💠 Tech Stack

### Frontend

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Leaflet](https://react-leaflet.js.org/) – for map rendering and user input

### Backend

- [FastAPI](https://fastapi.tiangolo.com/) – handles simulation logic and metrics
- Python ≥ 3.10

---

## 📦 Requirements

- Node.js ≥ 22
- Python ≥ 3.10
- npm or yarn

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/delivetter/website.git
cd website
```

### 2. Setup

```bash
cd frontend
npm install
npm run dev
```

Access the app at `http://localhost:5173`