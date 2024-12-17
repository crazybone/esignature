// script.js

// Populate country dropdown
const countryList = ["Thailand", "Indonesia", "Singapore", "Philippines", "Malaysia"];
const countrySelect = document.getElementById("country");
const countryListContainer = document.getElementById("country-list");
const previewContainer = document.getElementById("signature-preview");

countryList.forEach((country, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = country;
  countrySelect.appendChild(option);
});

// Handle department-specific banners
const departmentBanners = {
  sales: ["Sales Banner 1", "Sales Banner 2"],
  marketing: ["Marketing Banner 1", "Marketing Banner 2"],
  support: ["Support Banner 1", "Support Banner 2"]
};

const departmentSelect = document.getElementById("department");
const bannerSelect = document.getElementById("banner");

departmentSelect.addEventListener("change", () => {
  const department = departmentSelect.value;
  bannerSelect.innerHTML = ""; // Clear existing options
  departmentBanners[department]?.forEach((banner) => {
    const option = document.createElement("option");
    option.value = banner;
    option.textContent = banner;
    bannerSelect.appendChild(option);
  });
});


// Render the country list
function renderCountryList(selectedCountry = "") {
  countryListContainer.innerHTML = ""; // Clear existing list
  countryList.forEach((country) => {
    const li = document.createElement("li");
    li.textContent = country;
    li.style.marginRight = "10px";
    li.style.fontWeight = country === selectedCountry ? "bold" : "normal";
    countryListContainer.appendChild(li);
  });
}

// Initial render
renderCountryList();

// Update the country list when the user selects a country
countrySelect.addEventListener("change", () => {
  const selectedCountry = countrySelect.value;
  console.log(selectedCountry);

  //renderCountryList(selectedCountry);
  var allList = "";
  for (var i = 0; i < countryList.length; i++){
    if(i==selectedCountry) {
      console.log('countrySelect.value: '+selectedCountry + ' i: '+i);
      allList += "<li><b>"+countryList[i]+"</b></li>";
    }else {
      allList += "<li>"+countryList[i]+"</li>";
    }
  }
  
  const formData = formFields.reduce((data, field) => {
    data[field] = document.getElementById(field)?.value || "";
    return data;
  }, {});
  var dataPreview = `
  <p><strong>${formData["full-name"]}</strong> (${formData["nickname"] || ""})</p>
  <p>${formData.title}</p>
  <p>E: <a href="mailto:${formData.email}">${formData.email}</a></p>
  <p>P: ${formData.phone}</p>
  <p>Department: ${formData.department}</p>
  <p>Banner: ${formData.banner}</p>`;
  console.log('dataPreview + allList : '+dataPreview + 'allList: ' + allList);
  previewContainer.innerHTML = dataPreview + '<ul id="country-list">' + allList + '</ul>';
});

// Update signature preview dynamically
const formFields = ["full-name", "nickname", "title", "email", "phone", "department", "banner", "country"];


document.getElementById("signature-form").addEventListener("input", () => {
  const formData = formFields.reduce((data, field) => {
    data[field] = document.getElementById(field)?.value || "";
    return data;
  }, {});
  var dataPreview = `
    <p><strong>${formData["full-name"]}</strong> (${formData["nickname"] || ""})</p>
    <p>${formData.title}</p>
    <p>E: <a href="mailto:${formData.email}">${formData.email}</a></p>
    <p>P: ${formData.phone}</p>
    <p>Department: ${formData.department}</p>
    <p>Banner: ${formData.banner}</p><ul id="country-list">`;

    var allCountry = "";
    for (var i = 0; i < countryList.length; i++){    
      //allCountry += "<li>"+countryList[i]+"</li>";
       
      if(i==countrySelect.value) {
        console.log('countrySelect.value: '+countrySelect.value + ' i: '+i);
        allCountry += "<li><b>"+countryList[i]+"</b></li>";
      }else {
        allCountry += "<li>"+countryList[i]+"</li>";
      }
    }
   

  previewContainer.innerHTML =  dataPreview + allCountry + '</ul>';
});

// Handle logo upload
document.getElementById("logo").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result;
      img.alt = "Uploaded Logo";
      img.style.maxWidth = "100px";
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// Copy to Clipboard
document.getElementById("copy-signature").addEventListener("click", () => {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = previewContainer.innerHTML;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert("Signature copied to clipboard!");
});
