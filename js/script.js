const fullName = document.getElementById("fullname");
const nickName = document.getElementById("nickname");
const titleName = document.getElementById("title");
const eAddress = document.getElementById("email");
const inpPhone = document.getElementById("phone");
const inpCode = document.getElementById("ccode");
const countrySelect = document.getElementById("country");
const departmentSelect = document.getElementById("department");
const logoList = document.getElementById("clogo");
const bannerSelect = document.getElementById("banner");


const countryListContainer = document.getElementById("country-list");
const previewContainer = document.getElementById("signature-container");
const leftContent = document.getElementById("left-content");
const rightContent = document.getElementById("right-content");
const bannerContent = document.getElementById("banner-container");
const emailDomain = '@acommerce.asia';

const formFields = ["fullname", "nickname", "title", "email", "ccode", "phone","department", "banner", "countryid", "countryname", "address", "logo"];
var addressList = [], arrCountry = [];
var sectionBanner = '', popCountryLine = '', idxCountry = 0, bannerImg = '';
let countryTx = 'No country selected';
let addressTx = '';
let logoSelected = '';

document.body.onload = () => {
  //updateStorageData();
}

document.getElementById("signature-form").addEventListener("input", () => {
  updatePreview(popCountryLine);
}); 

const populateCountry = (arr, idx) => {
  var countryInline = "";
  for(var i = 0; i < arr.length; i++) {
    if(i==(idx-1)) {
      //console.log("i: " + i);
      if(i < (arr.length - 1)) {
          countryInline += "<b style='color:#505050;'>"+arr[i]+"</b>&nbsp;&nbsp;|&nbsp;&nbsp;";
      } else {
          countryInline += "<b style='color:#505050;'>"+arr[i]+"</b>";
      }
    } else {
      if(i < (arr.length - 1)) {
          countryInline += arr[i]+"&nbsp;&nbsp;|&nbsp;&nbsp;";
      } else {
          countryInline += arr[i];
      }
    }
  }
  return countryInline;
}

// Format phone number
const formatPhoneNumber = () => {
  const countryCode = inpCode.value;
  let phoneNumber = document.getElementById('phone').value.trim();

  if (phoneNumber.startsWith('0')) {
    phoneNumber = phoneNumber.slice(1);
  }

  phoneNumber = phoneNumber.replace(/\D/g, '');
  const formattedNumber = phoneNumber.replace(/^(\d{2})(\d{3})(\d{4})$/, '$1 $2 $3');
  const finalFormattedNumber = `+${countryCode} ${formattedNumber}`;
  return finalFormattedNumber;
}

/*** Update signature preview ***/
let bannerContentTemplate = '';
let logoCont = '';
const updatePreview = (popCountryLine) => {

  const formData = formFields.reduce((data, field) => {
    data[field] = document.getElementById(field)?.value || "";
    return data;
  }, {});  
  
  let fName = formData.fullname;
  let nName = formData.nickname;
  let emailSender = formData.email+emailDomain;

  if(popCountryLine !== '') {
    countryTx = popCountryLine;
    if(addressList && idxCountry) {
      addressTx = addressList[idxCountry - 1];
      //console.log(' addressTx: '+addressTx+' idxCountry: '+idxCountry);
    }
  }

  if(nName != '') fName += ' ('+nName+')';
  phoneData = formatPhoneNumber();

  if( departmentSelect.value != '' && bannerSelect.value != '') {
    console.log('departmentSelect: '+departmentSelect.value+' bannerSelect: '+bannerSelect.value);
    //let getBannerData = getBanner2(departmentSelect.value, bannerSelect.value);
    //console.log('getBannerData: '+getBannerData);
    //bannerContentTemplate = updateBannerView(sectionBanner); 
    bannerContentTemplate = getBanner2(departmentSelect.value, bannerSelect.value);
  }

  if(sectionBanner !== '') {
    bannerContentTemplate = `<div class="img-container one-column" style="display:block;width:100%;max-width:640px;height:100%;"><a href="#"><img src="${sectionBanner}" width="100%" alt=""/></a></div>`;
    
    bannerContentTemplate = updateBannerView(sectionBanner);    
  } else {
    bannerContentTemplate = '';
  }

  if(logoList.selectedIndex > 0) {
  //if(logoCont != '') {
    let cLogo = getLogo(logoList.selectedIndex);
    //console.log('cLogo: '+cLogo);
    //logoCont = updateLogoView(cLogo);
    //console.log('logoCont: '+logoCont);
    upateRightView(countryTx, addressTx, cLogo);
  }
  
  const leftContentTemplate = `<table role="presentation" width="100%" style="
    border-right: 1px dotted #cfcfcf;
"><tr><td style="padding:0 10px;" valign="middle"><p class="sender-name" style="margin:0;margin-top:8px;font-weight:bold;line-height:18px;color:#505050;">${fName}</p><p class="sender-title" style="margin:0;font-weight:400;line-height:18px;color:#909090;">${formData.title}</p></td></tr><tr><td style="padding:0 10px;" valign="middle"><p class="sender-email" style="margin:0;margin-top:8px;font-weight:400;line-height:18px;color:#909090;">E: <a style="text-decoration:none;color:#909090;" class="mailto" href="mailto:${emailSender}">${emailSender}</a></p><p class="sender-phone" style="margin:0;font-weight:400;line-height:18px;color:#909090;">M: ${phoneData}</p></td></tr></table>`;

  const rightContentTemplate = `<table role="presentation" width="100%"><tr><td style="width:50%;padding:0 10px;" valign="middle">${logoCont}</td><td style="width:50%;padding:0 10px;"><ul style="list-style:none;margin:15px 0 0 0;padding:0;display:inline-block;float:right;">
  
  <li class="social-icon" style="display:inline-block;width:25px;"><a href="https://www.facebook.com/acommerce.asia/"><img src="https://lh3.googleusercontent.com/d/1CG__yxnVK7nIwsdGCueTTGO39PZWu3AW" alt="Facebook" width="20" class="sender-fb"/></a></li>
  
  <!-- <li class="social-icon" style="display:inline-block;width:25px;"><a href="https://www.youtube.com/channel/UC_DM4P6tgBNhXQZDXSMrMVg"><img src="https://lh3.googleusercontent.com/d/1xVfgtnJKk51PPmwlFGlW44xUNP1gCYBF" alt="Youtube" width="20" class="sender-fb"/></a></li> -->
  
  <li class="social-icon" style="display:inline-block;width:25px;"><a href="https://www.linkedin.com/company/acommerce/"><img src="https://lh3.googleusercontent.com/d/14sHVcrwreh-6-TCge2J5tyt-g6AtFP6E" alt="LinkedIn" width="20" class="sender-fb"/></a></li>

  </ul></td></tr><tr><td colspan="2" style="width:100%;padding:0 10px;"> <p class="sender-address" style="margin:0 0 5px;padding:0;display:block;font-weight:400;line-height:18px;color:#909090;">A: ${addressTx}</p><p style="margin:0;font-weight:400;line-height:18px;color:#909090;" id="country-list">${countryTx}</p></td></tr></table>`;  

  leftContent.innerHTML = leftContentTemplate;
  rightContent.innerHTML = rightContentTemplate;
  if(bannerContentTemplate !== '') bannerContent.innerHTML = bannerContentTemplate;
}

/*** Copy to Clipboard ***/
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
      //updateStorageData();
  } catch (err) {
      console.log("Fail: "+err);
  }
};


document.getElementById("copy-signature").addEventListener("click", () => {
  //copyToClipboard();
  confirmPop();
});

const updateSelectedFlag = (flagCode) => {  
  let currentClass = inpCode.className;
  let newCode = 'flag'+flagCode;
  let tmp = classExist(inpCode);
  if(!tmp) {
    inpCode.classList.add(newCode);
  } else {
    inpCode.classList.remove(currentClass);
    inpCode.classList.add(newCode);
  }
}

const classExist = (element) => {
  let current = (element.className).substr(0,4);
  if(current == 'flag') return true;
  return false;
}

// const numOnly = (id) => {
//   // Get the element by id
//   console.log('phone input now!');
//   var element = document.getElementById(id).getElementsByTagName("input");
//   // Use numbers only pattern, from 0 to 9 with \-
//   var regex = /\D/g;
//   // Replace other characters that are not in regex pattern
//   element.value = element.value.replace(regex, "");
// }

const confirmPop = () => {
  document.getElementById('pop_state').style.display="block";
  document.getElementById('confrm_pop').style.display="block"; //this is the replace of this line

  document.getElementById('copy_btn').addEventListener("click", () => {
    copyToClipboard();
    killPop();
    deSelectedTx();
    window.location.href = "https://mail.google.com/mail/u/0/?tab=rm&ogbl#settings/general";

  });
  document.getElementById('cancel_btn').addEventListener("click", () => {
    killPop();
     //return false;
  });
}
const killPop = () => {  
  document.getElementById('pop_state').style.display="none";
  document.getElementById('confrm_pop').style.display="none";
}

const deSelectedTx = () => {
  const windowSelection = window.getSelection();
  if (windowSelection) {
      windowSelection.removeAllRanges();
  }
  //document.selection.empty();
}

// const restrictInputOnlyNumbers = (val:string) =>  { 
//   if(val === "") return true 
//   if(val.length === 6) return false 
//   return
// }

const handleChange = (event) => {
  let inp = event.target.value;
  consoloe.log('inp: '+inp);
  if (!inp.match(/[^0-9]/)) {
    event.preventDefault();
  }
}

/*** Fetch Data ***/
var mainData;
fetch('data.json')
.then(response => response.json())
.then(data => {
  mainData = data;
  const countryDropdown = document.getElementById("country");
  const countryCodeDropdown = document.getElementById("ccode");
  const departmentDropdown = document.getElementById('department');  
  const bannerDropdown = document.getElementById('banner');
  let currCountryCode = '';

  /*** Populate the Country dropdown ***/
  //countryDropdown.innerHTML = '<option value="" disabled selected>Select your Country</option>';
  data.countries.forEach(country => {
    arrCountry.push(country.name);
    addressList.push(country.address);
    const option = document.createElement('md-select-option');
    const cOption = document.createElement('md-select-option');
    const span = document.createElement('span');
    currCountryCode = "flag"+country.code;
    span.classList.add("flag");
    span.classList.add(currCountryCode);
    option.value = country.id;
    option.textContent = country.name;
    cOption.id = country.id;
    cOption.value = country.code;
    span.textContent = "+"+country.code;
    cOption.appendChild(span);
    countryDropdown.appendChild(option);
    countryCodeDropdown.appendChild(cOption);
  });

  countryDropdown.addEventListener('change', () => {
    const selectedCountryId = countryDropdown.value;
    const selectedCountry = data.countries.find(
      country => country.id === selectedCountryId
    );
    //updateSelectedFlag(countrySelect, );
    
    updateSelectedFlag(selectedCountry.code);
    let tmp = selectedCountry.code;
    countryCodeDropdown.value = tmp;
    if(selectedCountryId && arrCountry.length) {
      idxCountry = selectedCountryId;
      popCountryLine = populateCountry(arrCountry, idxCountry);
    }
    updatePreview(popCountryLine);
  });
  
  countryCodeDropdown.addEventListener('change', () => {
    const selectedCountryCodeId = countryCodeDropdown.value;
    const selectedCountryCode = data.countries.find(
      country => country.code === selectedCountryCodeId
    );
    updateSelectedFlag(selectedCountryCode.code);    
    let tmp = selectedCountryCode.id;
    countryDropdown.value = tmp;
    idxCountry = tmp;
    popCountryLine = populateCountry(arrCountry, idxCountry);    
    updatePreview(popCountryLine);
  });

  /*** Populate the department dropdown ***/
  data.departments.forEach(department => {
    const option = document.createElement('md-select-option');
    option.value = department.id;
    option.textContent = department.name;
    departmentDropdown.appendChild(option);
  });

  /*** add event Departments Dropdown ***/
  departmentDropdown.addEventListener('change', function () {
    const selectedDepartmentId = parseInt(this.value);
    const selectedDepartment = data.departments.find(
      department => department.id === selectedDepartmentId
    );

    if (selectedDepartment) {
      let dep = 0;
      selectedDepartment.sections.forEach(section => {
        dep++;
        const option = document.createElement('md-select-option');
        option.value = dep;
        option.textContent = section.name;
        option.setAttribute('data-banner', section.banner);
        bannerDropdown.appendChild(option);
      });
      bannerDropdown.disabled = false;
    }
  });

   /*** Populate the Banner dropdown ***/
  bannerDropdown.addEventListener('change', () => {
    const selectedDeptId = departmentDropdown.value;
    const selectedSectionId = bannerDropdown.value;

    if (selectedDeptId && selectedSectionId) {
        const selectedDepartment = data.departments.find(dept => dept.id == selectedDeptId);
        const selectedSection = selectedDepartment.sections.find(section => section.id == selectedSectionId);
        if (selectedSection && selectedSection.banner.length > 0) {
          //console.log("selectedSection: " + selectedSection.banner[0] + " selectedSectionId: " + selectedSectionId);          
          sectionBanner = selectedSection.banner[0];
        }
    }
    updatePreview(popCountryLine);
  });

  /*** Populate the department dropdown ***/
  data.logo.forEach(logo => {
    const option = document.createElement('md-select-option');
    option.value = logo.id;
    option.textContent = logo.name;
    logoList.appendChild(option);
  });

  /*** Populate the Logo dropdown ***/
  logoList.addEventListener('change', () => {
    const selectedLogoId = logoList.value;
    const selectedLogoImg = data.logo.find(
      logo => logo.id === selectedLogoId
    );
    let imageLogo = '';
    if(selectedLogoImg) {
      imageLogo = selectedLogoImg.image;
      console.log('from logo dropdown: '+selectedLogoImg.image+' id: '+selectedLogoImg.id);
    }
    logoCont = updateLogoView(imageLogo); 
    updatePreview(popCountryLine);
  });
})
.catch(error => console.error('Error loading JSON:', error));


const updateBannerList = (deptId) => { //, sectId
  const departmentId = deptId;
  const departmentData = mainData.departments.find(
    department => department.id === departmentId
  );

  if (departmentData) {
    let dep = 0;
    departmentData.sections.forEach(section => {
      dep++;
      const option = document.createElement('md-select-option');
      option.value = dep;
      option.textContent = section.name;
      option.setAttribute('data-banner', section.banner);
      bannerSelect.appendChild(option);
    });
    bannerSelect.value = departmentId;
  }
}

const getBanner = (deptId, sectId) => {
  if(mainData && deptId && sectId) {
    const dataDept = mainData.departments.find(dept => dept.id == deptId);
    const dataSect = dataDept.sections.find(section => section.id == sectId);
    if (dataSect && dataSect.banner.length > 0) {
      console.log("image banner: " + dataSect.banner[0]+" banner Url: " + dataSect.link[0] );
      let imageUrl = dataSect.banner[0];
      return imageUrl;
    }
  }
}

const getBanner2 = (deptId, sectId) => {
  let imageBanner, bannerUrl, bannerTemplate;
  if(mainData && deptId && sectId) {
    const dataDept = mainData.departments.find(dept => dept.id == deptId);
    const dataSect = dataDept.sections.find(section => section.id == sectId);
    if (dataSect && dataSect.banner.length > 0) {
      console.log("getBanner2 function > image banner: " + dataSect.banner+" banner Url: "+dataSect.link);
      imageBanner = dataSect.banner[0];
      bannerUrl = dataSect.link[0];
      if(imageBanner != '' && bannerUrl != '') {
        bannerTemplate = `<div class="img-container" style="display:block;width:100%;max-width:640px;height:100%;"><a href="${bannerUrl}"><img src="${imageBanner}" width="100%" alt=""/></a></div>`;
      }

      //console.log('bannerTemplate: '+bannerTemplate);
      return bannerTemplate;
    }
  }
}

const getLogo = (logoId) => {
  if(logoId){
    const dataLogo = mainData.logo.find(logo => logo.id == logoId);
    if(dataLogo) {
      //console.log('getLogo function: '+dataLogo.image);    
      let logoImageUrl = dataLogo.image;
      return logoImageUrl;
    }
     else {
      return '';
    }
  }
}
//const upateleftView = () => {}

const upateRightView = (cntryTx, addrTx, logoImg) => {
  let logoSrc = updateLogoView(logoImg); 
  let rightTemplate = `<table role="presentation" width="100%"><tr><td style="width:50%;padding:0 10px;" valign="middle">${logoSrc}</td><td style="width:50%;padding:0 10px;"><ul style="list-style:none;margin:15px 0 0 0;padding:0;display:inline-block;float:right;">
  
  <li class="social-icon" style="display:inline-block;width:25px;"><a href="https://www.facebook.com/acommerce.asia/"><img src="https://lh3.googleusercontent.com/d/1CG__yxnVK7nIwsdGCueTTGO39PZWu3AW" alt="Facebook" width="20" class="sender-fb"/></a></li>
  
  <!-- <li class="social-icon" style="display:inline-block;width:25px;"><a href="https://www.youtube.com/channel/UC_DM4P6tgBNhXQZDXSMrMVg"><img src="https://lh3.googleusercontent.com/d/1xVfgtnJKk51PPmwlFGlW44xUNP1gCYBF" alt="Youtube" width="20" class="sender-fb"/></a></li> -->
  
  <li class="social-icon" style="display:inline-block;width:25px;"><a href="https://www.linkedin.com/company/acommerce/"><img src="https://lh3.googleusercontent.com/d/14sHVcrwreh-6-TCge2J5tyt-g6AtFP6E" alt="LinkedIn" width="20" class="sender-fb"/></a></li>

  </ul></td></tr><tr><td colspan="2" style="width:100%;padding:0 10px;"> <p class="sender-address" style="margin:0 0 5px;padding:0;display:block;font-weight:400;line-height:18px;color:#909090;">A: ${addrTx}</p><p style="margin:0;font-weight:400;line-height:18px;color:#909090;" id="country-list">${cntryTx}</p></td></tr></table>`; 
  
  rightContent.innerHTML = rightTemplate;
}

const updateBannerView = (bannerData,bannerLink) => {  
  console.log('bannerData: '+bannerData);
  let bannerTmp = '';
  if(bannerData) bannerTmp = '<div class="img-container" style="display:block;width:100%;max-width:640px;height:100%;"><a href="'+bannerLink+'"><img src="'+bannerData+'" width="100%" alt=""/></a></div>'; 
  return bannerTmp
}

const updateLogoView = (logoUrl) => {
  let logoTmp = '';
  if(logoUrl != '') {
    logoTmp = '<div style="display:block;width:100%;height:100%;"><a href="#" style="display:block;"><img src="'+logoUrl+'" width="200" alt=""/></a></div>';
  }
  return logoTmp
}

const updateStorageData = () => {
  let dataDept = departmentSelect.value;
  let dataBanner = bannerSelect.value;
  let dataImg = '';
   
  if(dataDept != '' && dataBanner != '') {
    dataImg = getBanner(dataDept, dataBanner);
  }

  const data = {
      fullname: fullName.value,
      nickname: nickName.value,
      title: titleName.value,
      email: eAddress.value,
      ccode: inpCode.value,
      phone: inpPhone.value,
      department: departmentSelect.value,
      banner: bannerSelect.value,
      countryid: countrySelect.selectedIndex+1,
      countryname: countrySelect.value,
      bannerimage: dataImg,
      address: addressTx,
      logoid: logoList.value,
      logoimage: getLogo(logoList.value)
  };  
  localStorage.setItem("fData", JSON.stringify(data));
}

const signatureForm = document.getElementById('signature-form');
document.addEventListener("DOMContentLoaded", () => {
  
  inpPhone.addEventListener('input', (event) => {
    //numOnly(this.id);
    handleChange(event);
  });

  signatureForm.addEventListener("input", () => {    
    updateStorageData();
  });

  const savedData = JSON.parse(localStorage.getItem("fData"));

  if(savedData) {
    let codeClass = savedData.ccode || "";
    let addrTx = savedData.address || "";
    let cntryTx = savedData.countryname || "";
    let cntryIx = parseInt(savedData.countryid)-1;
    let logoImg = updateLogoView(savedData.logo);

    fullName.value = savedData.fullname || "";
    nickName.value = savedData.nickname || "";
    titleName.value = savedData.title || "";
    eAddress.value = savedData.email || "";
    inpCode.value = savedData.ccode || "";
    inpPhone.value = savedData.phone || "";
    departmentSelect.value = savedData.department || "";
    bannerSelect.value = savedData.banner || "";
    countrySelect.value = savedData.countryname || "";    
    countrySelect.selectedIndex = cntryIx;
    addressTx = addrTx;
    countryTx = savedData.countryname || "";
    logoList.value = savedData.logoid || "";
    
    updateSelectedFlag(codeClass);
    upateRightView(cntryTx, addrTx, savedData.logoimage);
    popCountryLine = populateCountry(arrCountry, cntryIx+1);
    console.log('popCountryLine: '+popCountryLine);
    updatePreview(popCountryLine); 
    updateBannerList(savedData.department);
    bannerContent.innerHTML = updateBannerView(savedData.bannerimage);
    //logoContent.innerHTML = updateLogoView(savedData.logoimage);
  }   
});
