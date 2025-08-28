const itemBtn = document.getElementById("itemBtn");
const caseBtn = document.getElementById("caseBtn");
const content = document.getElementById("content");

const itemContent = `
  <div class="price">$0.40 <span style="font-size: 1rem; font-weight: normal;">per item</span></div>
  <div class="subtitle">or custom pricing for 5,000+ units/month</div>
`;

const caseContent = `
  <div class="price">$1.50 <span style="font-size: 1rem; font-weight: normal;">per box to FBA</span></div>
  <div class="subtitle">or custom pricing for 1,000+ cases/month</div>
`;

function showContent(type) {
  if (type === "item") {
    content.innerHTML = itemContent;
    itemBtn.classList.add("active");
    caseBtn.classList.remove("active");
  } else {
    content.innerHTML = caseContent;
    caseBtn.classList.add("active");
    itemBtn.classList.remove("active");
  }
}

// Set default content
showContent("item");

// Event listeners
itemBtn.addEventListener("click", () => showContent("item"));
caseBtn.addEventListener("click", () => showContent("case"));