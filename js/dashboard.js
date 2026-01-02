// js/dashboard.js
import { fetchRequests } from "./api.js";

const container = document.getElementById("requestsContainer");
const statusMessage = document.getElementById("statusMessage");


function createCard(req) {
  const card = document.createElement("div");
  card.className = "card";

 const saved = JSON.parse(localStorage.getItem("requestStatus")) || {};
const status = saved[req.id] || req.STATUS || "PENDING";


  card.innerHTML = `
  <h3>${req.name || "Customer"}</h3>
  <p><b>Tailor:</b> ${req.tailor || "Not selected"}</p>
  <p><b>Dress:</b> ${req.dressType}</p>
  <p><b>Fabric:</b> ${req.fabric}</p>
  <p><b>Colors:</b> ${req.colors}</p>
  <p><b>Text:</b> ${req.customText || "None"}</p>
  <p><b>Notes:</b> ${req.notes || "-"}</p>

  <p class="status-label ${status.toLowerCase()}">
    <b>Status:</b> ${status}
  </p>

  <div class="actions">
    <button class="accept">Accept</button>
    <button class="reject">Reject</button>
  </div>
`;


  const statusLabel = card.querySelector(".status-label");
  const acceptBtn = card.querySelector(".accept");
  const rejectBtn = card.querySelector(".reject");

 acceptBtn.onclick = () => {
  updateStatus(req.id, "ACCEPTED");
};

rejectBtn.onclick = () => {
  updateStatus(req.id, "REJECTED");
};


  return card;
}
function updateStatus(id, newStatus) {
  let saved = JSON.parse(localStorage.getItem("requestStatus")) || {};
  saved[id] = newStatus;
  localStorage.setItem("requestStatus", JSON.stringify(saved));
  loadDashboard();
}



async function loadDashboard() {
  try {
    statusMessage.textContent = "Loading requests...";
    statusMessage.className = "status";

    container.innerHTML = "";
    const data = await fetchRequests();

    if (!data || data.length === 0) {
      statusMessage.textContent = "No design requests available.";
      statusMessage.classList.add("empty");
      return;
    }

    statusMessage.textContent = "";

    data.forEach(req => {
      container.appendChild(createCard(req));
    });

  } catch (error) {
    console.error(error);
    statusMessage.textContent = "Failed to load requests. Please try again.";
    statusMessage.classList.add("error");
  }
}


loadDashboard();
