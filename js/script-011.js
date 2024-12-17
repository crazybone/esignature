// script.js

// Populate country dropdown
const countryList = ["Thailand", "Indonesia", "Singapore", "Philippines", "Malaysia"];
const countrySelect = document.getElementById("country");
const countryListContainer = document.getElementById("country-list");
const previewContainer = document.getElementById("signature-preview");
const leftContent =  document.getElementById("left-content");
const rightContent =  document.getElementById("right-content");

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
//renderCountryList();



var emailDomain = '@acommerce.asia';
// Update the country list when the user selects a country
countrySelect.addEventListener("change", () => {
  const selectedCountry = countrySelect.value;
  console.log(selectedCountry);

  //renderCountryList(selectedCountry);
  var allList = "";
  for (var i = 0; i < countryList.length; i++){
    if(i==selectedCountry) {
      console.log('countrySelect.value: '+selectedCountry + ' i: '+i);
      allList += '<li class="my-country">'+countryList[i]+'</li>';
    }else {
      allList += '<li>'+countryList[i]+'</li>';
    }
  }
  const formData = formFields.reduce((data, field) => {
    data[field] = document.getElementById(field)?.value || "";
    return data;
  }, {});

  var emailSender = formData.email+emailDomain;
  var nickName = document.getElementById('nickname').value;
  if(nickName.value != '') {
    
  }
  var dataAvatar = `<p><img src="img/avatar.png" alt="${formData["full-name"]}'s image" class="sender-avatar"></p>`;
  var dataFullname = `<p class="sender-name" style="margin:0;margin-top:8px;font-weight:bold">${formData["full-name"]}</p>`;
  var dataTitle = `<p class="sender-title" style="margin:0;margin-top:8px">${formData.title}</p>`;
  var dataSocial = `<p class="sender-social-link" style="margin:0;margin-top:8px;">
                      <ul style="list-style:none;margin:0;padding:0;display:block;">
                          <li class="social-icon" style="display:inline-block;width:30px;">
                              <a><img src="img/fb-icon.png" alt="Facebook" class="sender-fb"/></a>
                          </li>
                          <li class="social-icon" style="display:inline-block;width:30px;">
                              <a><img src="img/yt-icon.png" alt="Youtube" class="sender-yt"/></a>
                          </li>
                          <li class="social-icon" style="display:inline-block;width:30px;">
                              <a><img src="img/ig-icon.png" alt="Instagram" class="sender-ig"/></a>
                          </li>
                      </ul>
                    </p>`;
  
  var dataAddress = `<p class="sender-address" style="margin:0;margin-bottom:12px;padding:0;display:inline-block;">A: 33rd Floor, 689 Bhiraj Tower Sukhumvit Rd, Bangkok 10110,`;
  var dataCountry = `<ul id="country-list">${allList}</ul></p>`;

  var dataLogo = `<p><img src="img/acomm-logo.png" alt="Company Logo" class="sender-avatar"></p>`;
  var dataEmail = `<p class="sender-email">E: <a class="mailto" href="mailto:${emailSender}">${emailSender}</a></p>`;
  var dataMobile = `<p class="sender-phone">M: ${formData.phone}</p>`;
  
  var leftData = dataAvatar + dataFullname + dataTitle + dataSocial;
  var rightData = dataLogo + dataEmail + dataMobile + dataAddress + dataCountry;

  //console.log('dataPreview + allList : '+dataPreview + 'allList: ' + allList);  
  //previewContainer.innerHTML = dataPreview + '<ul id="country-list">' + allList + '</ul>';
  leftContent.innerHTML = leftData;
  rightContent.innerHTML = rightData;
});



// Update signature preview dynamically
const formFields = ["full-name", "nickname", "title", "email", "phone", "department", "banner", "country"];


document.getElementById("signature-form").addEventListener("input", () => {
  const formData = formFields.reduce((data, field) => {
    data[field] = document.getElementById(field)?.value || "";
    return data;
  }, {});

  var allCountry = "";
  for (var i = 0; i < countryList.length; i++){         
    if(i==countrySelect.value) {
      //console.log('countrySelect.value: '+countrySelect.value + ' i: '+i);
      allCountry += '<li class="my-country">'+countryList[i]+'</li>';
    }else {
      allCountry += "<li>"+countryList[i]+"</li>";
    }
  }   
  var emailSender = formData.email+emailDomain;
  var nickName = document.getElementById('nickname').value;
  if(nickName.value != '') {
    
  }
  var dataAvatar = `<p><img src="img/avatar.png" alt="${formData["full-name"]}'s image" class="sender-avatar"></p>`;
  var dataFullname = `<p class="sender-name" style="margin:0;margin-top:8px;font-weight:bold">'${formData["full-name"]}</p>`;
  var dataTitle = `<p class="sender-title" style="margin:0;margin-top:8px">${formData.title}</p>`;
  var dataSocial = `<p class="sender-social-link" style="margin:0;margin-top:8px;">
                      <ul style="list-style:none;margin:0;padding:0;display:block;">
                          <li class="social-icon" style="display:inline-block;width:30px;">
                              <a><img src="img/fb-icon.png" alt="Facebook" class="sender-fb"/></a>
                          </li>
                          <li class="social-icon" style="display:inline-block;width:30px;">
                              <a><img src="img/yt-icon.png" alt="Youtube" class="sender-yt"/></a>
                          </li>
                          <li class="social-icon" style="display:inline-block;width:30px;">
                              <a><img src="img/ig-icon.png" alt="Instagram" class="sender-ig"/></a>
                          </li>
                      </ul>
                    </p>`;
  
  var dataAddress = `<p class="sender-address" style="margin:0;margin-bottom:12px;padding:0;display:inline-block;">A: 33rd Floor, 689 Bhiraj Tower Sukhumvit Rd, Bangkok 10110,`;
  var dataCountry = `<ul id="country-list">${allCountry}</ul></p>`;
  var dataLogo = `<p><img src="img/acomm-logo.png" alt="Company Logo" class="sender-avatar"></p>`;
  var dataEmail = `<p class="sender-email">E: <a class="mailto" href="mailto:${emailSender}">${emailSender}</a></p>`;
  var dataMobile = `<p class="sender-phone">M: ${formData.phone}</p>`;  
  var leftData = dataAvatar + dataFullname + dataTitle + dataSocial;
  var rightData = dataLogo + dataEmail + dataMobile + dataAddress + dataCountry;

  leftContent.innerHTML = leftData;
  rightContent.innerHTML = rightData;
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
/*
document.getElementById("copy-signature").addEventListener("click", () => {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = previewContainer.innerHTML;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert("Signature copied to clipboard!");
});
*/