const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url == "") {
    alert("Please enter a url");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      // to show the image
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
  //   console.log(url, size);
};
// https://davidshimjs.github.io/qrcodejs/
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

// CLEAR UI
const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) {
    saveLink.remove();
  }
};

// Create SAVE BUTTON
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  // to add style
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
