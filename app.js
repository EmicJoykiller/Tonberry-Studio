/* Add your real contact details before launch. Leave blank until confirmed. */
const SITE_CONTACT = {
  email: "",
  instagram: "",
  youtube: "",
  location: "Toronto, Canada",
};

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  document.body.classList.toggle("menu-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const form = document.querySelector("#enquiry-form");
const formNote = document.querySelector("#form-note");
const sendButton = form?.querySelector("button[type=submit]");

if (!SITE_CONTACT.email && sendButton) {
  sendButton.disabled = true;
  sendButton.textContent = "Enquiry inbox coming soon";
  formNote.textContent = "The contact inbox has not been connected yet.";
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  if (!SITE_CONTACT.email) {
    formNote.textContent = "The enquiry inbox is not connected yet.";
    formNote.dataset.state = "setup";
    return;
  }

  const data = new FormData(form);
  const subject = encodeURIComponent(`A Tonbery figure idea from ${data.get("name")}`);
  const body = encodeURIComponent(`Name: ${data.get("name")}\nReply to: ${data.get("email")}\n\n${data.get("idea")}`);
  window.location.href = `mailto:${SITE_CONTACT.email}?subject=${subject}&body=${body}`;
  formNote.textContent = "Your email app should open with your note ready to send. Photos can follow once we reply.";
  formNote.dataset.state = "ready";
});

document.querySelectorAll("[data-locality]").forEach((label) => {
  label.textContent = SITE_CONTACT.location;
});

for (const [platform, url] of [["instagram", SITE_CONTACT.instagram], ["youtube", SITE_CONTACT.youtube]]) {
  if (!url) continue;
  const link = document.querySelector(`[data-social="${platform}"]`);
  if (link) {
    link.href = url;
    link.hidden = false;
  }
}
