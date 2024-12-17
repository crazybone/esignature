// script.js

// Populate country dropdown
/*
const countryList = ["Thailand", "Indonesia", "Singapore", "Philippines", "Malaysia"];
const addressList = ["33rd Floor, 689 Bhiraj Tower Sukhumvit Rd, Bangkok 10110",
  "PT aCommerce Solusi Lestari Sahid Sudirman Center Lantai 17A Jl. Jendral Sudirman No 86 Jakarta Pusat 10220",
  "71, Robinson Road, 068895",
  "9/F WeWork Uptown Bonifacio Tower Three 36th St. cor 11th Ave., Bonifacio Global City Taguig, 1634",
  "Level 7, Oasis Wing, Brunsfield Oasis Tower 3 No. 2 Jalan PJU 1A/7A, Oasis Square, Oasis Damansara, Petaling Jaya, Selangor 47301"];
  */
const countrySelect = document.getElementById("country");
const countryListContainer = document.getElementById("country-list");
const previewContainer = document.getElementById("signature-container");
const leftContent = document.getElementById("left-content");
const rightContent = document.getElementById("right-content");  

const departmentSelect = document.getElementById("department");
const bannerSelect = document.getElementById("banner");
const bannerContent = document.getElementById("banner-content");
var addressList = [], arrCountry = [], arrCountry = [];
var sectionBanner;
var popCountryLine = '';

const formFields = ["full-name", "nickname", "title", "email", "phone", "department", "banner", "country"];
var emailDomain = '@acommerce.asia';
var idxCountry = 0;

// Render the country list
/*
countryList.forEach((country, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = country;
    countrySelect.appendChild(option);
    console.log('country: '+ country);
});
*/

// Handle department-specific banners

/*
const departmentBanners = {
    sales: ["Sales Banner 1", "Sales Banner 2"],
    marketing: ["Marketing Banner 1", "Marketing Banner 2"],
    support: ["Support Banner 1", "Support Banner 2"]
};
departmentSelect.addEventListener("change", () => {
  const department = departmentSelect.value;
  bannerSelect.innerHTML = ""; 
  departmentBanners[department]?.forEach((banner) => {
    const option = document.createElement("option");
    option.value = banner;
    option.textContent = banner;
    bannerSelect.appendChild(option);
  });
  console.log();
});
*/


countrySelect.addEventListener("change", () => {
  const selectedCountry = countrySelect.value;
  //console.log(selectedCountry);  
  updatePreview();
});

document.getElementById("signature-form").addEventListener("input", () => {
  updatePreview();
}); 

function popCountry() {
  var selectedCountry = "";
  for (var i = 0; i < countryList.length; i++){         
    if(i==countrySelect.value) {
        if(i < (countryList.length)) {
            selectedCountry += "<b>"+countryList[i]+"</b>&nbsp;&nbsp;|&nbsp;&nbsp;";
        } else {
            selectedCountry += "<b>"+countryList[i]+"</b>";
        }
        idxCountry = i;
    }else {
        if(i < (countryList.length)-1) {
            selectedCountry += countryList[i]+"&nbsp;&nbsp;|&nbsp;&nbsp;";
        } else {
            selectedCountry += countryList[i];
        }
    }
  }
  console.log("popCountry function");
  return selectedCountry;
}

function populateCountry(arr, idx) {
  var arrList = "";
  for (var i = 0; i < arr.length; i++){         
    if(i==idx) {
        if(i < (arr.length)-1) {
            arrList += "<b>"+arr[i]+"</b>&nbsp;&nbsp;|&nbsp;&nbsp;";
        } else {
            arrList += "<b>"+arr[i]+"</b>";
        }
        //idx = i;
    }else {
        if(i < (arr.length)-1) {
            arrList += arr[i]+"&nbsp;&nbsp;|&nbsp;&nbsp;";
        } else {
            arrList += arr[i];
        }
    }
  }
  console.log("populateCountry function");
  return arrList;
}
  

// Update signature preview dynamically
function updatePreview() {
  //var country = popCountry();
  const formData = formFields.reduce((data, field) => {
    data[field] = document.getElementById(field)?.value || "";
    return data;
  }, {});

  var emailSender = formData.email+emailDomain;
  var nickName = document.getElementById('nickname').value;
  if(nickName.value != '') {   
  }
    

  // <p><img src="img/avatar.png" alt="${formData["full-name"]}'s image" class="sender-avatar"></p>

  const leftContentTemplate = `<p class="sender-name" style="margin:0;margin-top:8px;font-weight:bold;line-height:18px;">${formData["full-name"]}</p><p class="sender-title" style="margin:0;font-weight:400;line-height:18px;">${formData.title}</p><p class="sender-email" style="margin:0;margin-top:8px;font-weight:400;line-height:18px;">E: <a class="mailto" href="mailto:${emailSender}">${emailSender}</a></p><p class="sender-phone" style="margin:0;font-weight:400;line-height:18px;">M: ${formData.phone}</p><p class="sender-social-link" style="margin:0;margin-top:8px;"><ul style="list-style:none;margin:0;padding:0;display:block;"><li class="social-icon" style="display:inline-block;width:30px;"><a href="#"><img src="https://lh3.googleusercontent.com/d/1SdmMeG_GHyhTEGhWFATN9GOC_ZE-SoWt" alt="Facebook" class="sender-fb"/></a></li><li class="social-icon" style="display:inline-block;width:30px;"><a href="#"><img src="https://lh3.googleusercontent.com/d/1Uqks5fxQDGJ_ArCih5qAxqyG9gUWAZ2R" alt="Youtube" class="sender-yt"/></a></li><li class="social-icon" style="display:inline-block;width:30px;"><a href="#"><img src="https://lh3.googleusercontent.com/d/1ItFr6bSRbLBkx2e5Zt3xdo6NMeX3GLBq" alt="Instagram" class="sender-ig"/></a></li></ul></p>`;

  const rightContentTemplate = `<img style="margin:0;margin-top:8px; src="https://lh3.googleusercontent.com/d/1EyD0_Y8yC29c2nwfPefI0KDvug9xkGhK" alt="Company Logo" class="sender-avatar"/><p class="sender-address" style="margin:0 0 5px;padding:0;display:inline-block;font-weight:400;line-height:18px;">A: ${addressList[idxCountry]}</p><p style="margin:0;margin-top:8px;font-weight:400;line-height:18px;" id="country-list">${popCountryLine}</p>`;  

  const bannerContentTemplate = `<p style=""><a href="#"><img src="${sectionBanner}" alt="" style="display:block;width:100%;max-width:640px;height:auto;"/> alt="" class="sender-fb"/></a></p>`;

  leftContent.innerHTML = leftContentTemplate;
  rightContent.innerHTML = rightContentTemplate;
  bannerContent.innerHTML = bannerContentTemplate;
}

// Handle logo upload
/*
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
*/
// Copy to Clipboard
const copied = false;
const copyToClipboard = () => {
  let copyText = document.querySelector("#signature-container");
  const range = document.createRange();
  if (copyText) {
      range.selectNode(copyText);
  }
  const windowSelection = window.getSelection();
  if (windowSelection) {
      windowSelection.removeAllRanges();
      windowSelection.addRange(range);
  }
  try {
      let successful = document.execCommand("copy");
      console.log(successful ? "Success" : "Fail");
  } catch (err) {
      console.log("Fail: "+err);
  }
};

document.getElementById("copy-signature").addEventListener("click", () => {
  copyToClipboard();
});


// Fetch the JSON file
fetch('data.json')
.then(response => response.json())
.then(data => {
  const countryDropdown = document.getElementById("country");
  const departmentDropdown = document.getElementById('department');
  const bannerDropdown = document.getElementById('banner');

  // Populate the Country dropdown
  data.countries.forEach(country => {
    arrCountry.push(country.name);
    addressList.push(country.address);
    const option = document.createElement('option');
    option.value = country.id;
    option.textContent = country.name;
    countryDropdown.appendChild(option);
  }); 

  console.log("arrCountry: "+arrCountry);
  
 
  
  countryDropdown.addEventListener('change', () => {

    const selectedCountryId = countryDropdown.value;
    const selectedCountry = data.countries.find(
        country => country.id === selectedCountryId
    );
    //populateCountry(arrCountry,selectedCountryId)
    //const selectedCountry = data.countries.find(country => country.name == selectedCountryId);
    console.log("selectedCountryId: "+selectedCountryId+" arrCountry.length: "+arrCountry.length);
  
    if (selectedCountryId && arrCountry.length) {
      idxCountry = selectedCountryId;
      popCountryLine = populateCountry(arrCountry, selectedCountryId);
      console.log("popCountryLine: "+popCountryLine);
    }
    
    updatePreview();
  });

  // Populate the department dropdown
  data.departments.forEach(department => {
    const option = document.createElement('option');
    option.value = department.id;
    option.textContent = department.name;
    departmentDropdown.appendChild(option);
  });

  // Add event listener to update the banner dropdown based on department selection
  departmentDropdown.addEventListener('change', function () {
    const selectedDepartmentId = parseInt(this.value);
    console.log("selectedDepartmentId: "+selectedDepartmentId);

    // Clear the banner dropdown
    bannerDropdown.innerHTML = '<option value="" disabled selected>Select a banner</option>';

    // Find the selected department and populate the banner dropdown
    const selectedDepartment = data.departments.find(
      department => department.id === selectedDepartmentId
    );
    // console.log("selectedDepartmentId: "+selectedDepartmentId);
    // console.log("selectedDepartment: "+selectedDepartment);

    if (selectedDepartment) {
        let a = 0;
      selectedDepartment.sections.forEach(section => {
        a++;
        const option = document.createElement('option');
        option.value = a;
        option.textContent = section.name;
        option.setAttribute('data-banner', section.banner);
        bannerDropdown.appendChild(option);
      });
      bannerDropdown.disabled = false;
    }
  });

  bannerDropdown.addEventListener('change', () => {
    const selectedDeptId = departmentDropdown.value;
    const selectedSectionId = bannerDropdown.value;

    if (selectedDeptId && selectedSectionId) {
        const selectedDepartment = data.departments.find(dept => dept.id == selectedDeptId);
        const selectedSection = selectedDepartment.sections.find(section => section.id == selectedSectionId);

        if (selectedSection && selectedSection.banner.length > 0) {
            console.log("selectedSection: " + selectedSection.banner[0]);
            sectionBanner = selectedSection.banner[0];
        }
    }
    updatePreview();
  });
})
.catch(error => console.error('Error loading JSON:', error));