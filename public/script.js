const itemBtn = document.getElementById("itemBtn");
const caseBtn = document.getElementById("caseBtn");
const priceContent = document.getElementById("priceContent");

const itemText = `
  <strong>Starting at</strong><br><br>
  <span style="font-size: 1.8rem; font-weight: bold;">$0.40</span> per item<br>
  or custom pricing for 5,000+ units/month
`;

const caseText = `
  <strong>Starting at</strong><br><br>
  <span style="font-size: 1.8rem; font-weight: bold;">$1.50</span> per box to FBA<br>
  or custom pricing for 1,000+ cases/month
`;

function showContent(type) {
  if (type === "item") {
    priceContent.innerHTML = itemText;
    itemBtn.classList.add("active");
    caseBtn.classList.remove("active");
  } else {
    priceContent.innerHTML = caseText;
    caseBtn.classList.add("active");
    itemBtn.classList.remove("active");
  }
}

itemBtn.addEventListener("click", () => showContent("item"));
caseBtn.addEventListener("click", () => showContent("case"));

// Show default
showContent("item");
 
//------------services-----------//

// Example JS for interaction (optional)
document.querySelectorAll('.details-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const serviceName = btn.closest('.banner').querySelector('h3').innerText
      .toLowerCase()
      .replace(/ & /g, '-')
      .replace(/\s+/g, '-');
      
    window.location.href = `/service/${serviceName}`;
  });
});

document.getElementById("see-more-btn").addEventListener("click", function() {
  document.querySelectorAll(".hidden-review").forEach(el => el.style.display = "block");
  this.style.display = "none"; // Hide button after expanding
});


document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }
});
