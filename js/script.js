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
var sectionBanner = '', popCountryLine = '', idxCountry = 0, bannerImg = '', bannerLink = '';
let countryTx = 'No country selected';
let addressTx = "";
let logoSelected = '';

document.body.onload = () => {
  inpCode.classList.add('flag66');
}

document.getElementById("signature-form").addEventListener("input", () => {
  updatePreview();
}); 

const populateCountry = (arr, idx) => {
  var countryInline = "";
  for(var i = 0; i < arr.length; i++) {
    if(i==(idx-1)) {
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

const updatePreview = () => {
  const formData = formFields.reduce((data, field) => {
    data[field] = document.getElementById(field)?.value || "";
    return data;
  }, {});  
  
  let fName = formData.fullname;
  let nName = formData.nickname;
  let emailSender = formData.email+emailDomain;

  countryTx = populateCountry(arrCountry, idxCountry);
  
  if(addressList && idxCountry) {
      addressTx = addressList[idxCountry - 1];
  }

  if(nName != '') fName += ' ('+nName+')';
  phoneData = formatPhoneNumber();

  if( departmentSelect.value != '' && bannerSelect.value != '') {
    bannerContentTemplate = bannerFactory(departmentSelect.value, bannerSelect.value);  
    //console.log('bannerContentTemplate: '+bannerContentTemplate);
  } 
  let cLogo = getLogo(logoList.value);
  let rCont = updateRightContent(countryTx, addressTx, cLogo);
  let rightContentTemplate = '';
  if(rCont != ''){
    rightContentTemplate = rCont;
  }

  let leftContentTemplate = `<table role="presentation" width="100%"><tr><td style="padding:0;" valign="middle"><p class="sender-name" style="margin:0;margin-top:8px;font-weight:bold;line-height:18px;color:#505050;">${fName}</p><p class="sender-title" style="margin:0;font-weight:400;line-height:18px;color:#909090;">${formData.title}</p></td></tr><tr><td style="padding:0;" valign="middle"><p class="sender-email" style="margin:0;margin-top:8px;font-weight:400;line-height:18px;color:#909090;">E: <a style="text-decoration:none;color:#909090;" class="mailto" href="mailto:${emailSender}">${emailSender}</a></p><p class="sender-phone" style="margin:0;font-weight:400;line-height:18px;color:#909090;">M: ${phoneData}</p></td></tr></table>`;

  leftContent.innerHTML = leftContentTemplate;

  rightContent.innerHTML = rightContentTemplate;

  if(bannerContentTemplate !== '') {
    //console.log('bannerContentTemplate: '+bannerContentTemplate);
    bannerContent.innerHTML = bannerContentTemplate;
  }
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

const numOnly = (event) => {  
  if(isNaN(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
}

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

/*** Fetch Data ***/
var mainData;
//fetch('data2.json')
fetch('https://crazybone.github.io/esdm/db.json')
.then(response => response.json())
.then(data => {
  mainData = data;
  const countryDropdown = document.getElementById("country");
  const countryCodeDropdown = document.getElementById("ccode");
  const departmentDropdown = document.getElementById('department');  
  const bannerDropdown = document.getElementById('banner');
  let currCountryCode = '';
  addressTx = "";

  /*** Populate the Country dropdown ***/
  //countryDropdown.innerHTML = '<option value="" disabled selected>Select your Country</option>';
  
  data.countries.forEach(country => {
    arrCountry.push(country.name);
    addressList.push(country.address);
    addressTx = addressList[0];
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
    countryDropdown.selectedIndex = 0;
    countryCodeDropdown.selectedIndex = 0;
    countryDropdown.appendChild(option);
    countryCodeDropdown.appendChild(cOption);    
  });

  /*** Populate the department dropdown ***/
  data.departments.forEach(department => {
    const option = document.createElement('md-select-option');
    option.value = department.id;
    option.textContent = department.departmentname;
    departmentDropdown.selectedIndex = 0;
    departmentDropdown.appendChild(option);
  });

  countryDropdown.addEventListener('change', () => {
    const selectedCountryId = countryDropdown.value;
    const selectedCountry = data.countries.find(
      country => country.id == selectedCountryId
    );
    
    updateSelectedFlag(selectedCountry.code);
    let tmp = selectedCountry.code;
    countryCodeDropdown.value = tmp;
    if(selectedCountryId && arrCountry.length) {
      idxCountry = selectedCountryId;
    }
    //updatePreview();
  });
  
  countryCodeDropdown.addEventListener('change', () => {
    const selectedCountryCodeId = countryCodeDropdown.value;
    const selectedCountryCode = data.countries.find(
      country => country.code == selectedCountryCodeId
    );
    updateSelectedFlag(selectedCountryCode.code);    
    let tmp = selectedCountryCode.id;
    countryDropdown.value = tmp;
    idxCountry = tmp;
    popCountryLine = populateCountry(arrCountry, idxCountry);    
    updatePreview();
    updateStorageData();
  });

  /*** add event Departments Dropdown ***/
  departmentDropdown.addEventListener('change', function () {
    const sectionSelected = departmentDropdown.value;
    updateBannerList(sectionSelected, bannerDropdown, 0);
    let deptId = sectionSelected;      
    if(deptId > 1) {
      console.log('sectionSelected > 1: '+deptId);
      bannerDropdown.value = deptId;
      logoList.disabled = false;
      bannerDropdown.disabled = false;
    } else {
      console.log('sectionSelected = 1: '+deptId);
      logoList.selectedIndex = 0;
      logoList.disabled = true;
      bannerDropdown.disabled = true;
    }
      bannerDropdown.selectedIndex = 0;
    updatePreview();
    updateStorageData();
  });

   /*** Populate the Banner dropdown ***/
  bannerDropdown.addEventListener('change', () => {
    const selectedDeptId = departmentDropdown.value;
    const selectedBannerId = bannerDropdown.value;
    const selectedSection = data.departments.find(
      department => department.id == selectedDeptId
    );
    if (selectedSection) {
      selectedSection.banners.forEach(banner => {
        for (let key in banner) {
          if(banner[key].bannerid == parseInt(selectedBannerId)) {
            sectionBanner = banner[key].content;
          }
        }
      });
    }
    updatePreview();
    updateStorageData();
  });

  /*** gen logo dropdown ***/
  if(data.logo.length) {
    data.logo.forEach(logo => {
      const option = document.createElement('md-select-option');
      option.value = logo.id;
      option.textContent = logo.name;
      logoList.selectedIndex = 0;
      logoList.appendChild(option);
    });
  }

  /*** Logo dropdown event ***/
  logoList.addEventListener('change', () => {
    const selectedLogoId = logoList.value;
    const selectedLogoImg = data.logo.find(
      logo => logo.id === selectedLogoId
    );
    let imageLogo = '';
    if(selectedLogoImg) {
      imageLogo = selectedLogoImg.image;
    }
    logoCont = updateLogoView(imageLogo); 
    updatePreview();
  });
})
.catch(error => console.error('Error loading JSON:', error));


const bannerFactory = (departmentvalue, bannerValue) => {
  const selectedDeptId = departmentvalue;
    const selectedBannerId = bannerValue;
    const selectedSection = mainData.departments.find(
      department => department.id == selectedDeptId
    );
    let bnnr = '';
    if (selectedSection) {
      selectedSection.banners.forEach(banner => {
        if(banner.bannerid == parseInt(selectedBannerId)) {
          bnnr = banner.content;
        }
      });
      //console.log('bannerFactory: '+bnnr);
      return bnnr;
    }
}

const updateBannerList = (deptId, dropdownList, ind) => { 
  const departmentId = deptId;
  const bannerId = dropdownList.value;
  let departmentData;
  if(mainData) {
    departmentData = mainData.departments.find(
      department => department.id == departmentId
    );
  } 

  if(departmentData) {
    let dep = 0;
    let bannerList = [];
    dropdownList.innerHTML = "";
    departmentData.banners.forEach(banner => {
      bannerList.push(banner.name);
    });  
    if(bannerList.length) {
      const len = bannerList.length;
      for (var i = 0; i < len; i++) {
        //console.log('bannerList: '+bannerList[i]);
        const option = document.createElement('md-select-option');        
        option.value = i + 1;
        option.textContent = bannerList[i];
        dropdownList.appendChild(option);
      }
    }
      bannerSelect.selectedIndex = ind;        
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
const updateLogoView = (logoUrl) => {
  let logoTmp = '';
  //console.log('updateLogoView > param logoUrl: '+logoUrl);
  if(logoUrl != '') {
    logoTmp = '<div style="display:block;width:100%;height:100%;"><a href="https://www.acommerce.asia/" target="_blank" style="display:block;"><img src="'+logoUrl+'" width="200" alt="aCommerce"/></a></div>';
  }
  return logoTmp;
}

const updateRightContent = (cntryTx, addrTx, logoImg) => {
  let logoSrc = '';
  if(logoImg != '') {
    logoSrc = updateLogoView(logoImg); 
  } 
  
  let rightTemplate = '';

  if(logoSrc != '') {
    //let theRight = document.getElementById("right-content");
    rightTemplate = '<table role="presentation" width="100%"><tr><td style="width:50%;padding:0 10px 0 0;" valign="middle">'+logoSrc+'</td><td style="width:50%;padding:0 10px 0 0;"><ul style="list-style:none;margin:0;padding:0;display:inline-block;float:right;"><li class="social-icon" style="display:inline-block;width:25px;"><a href="https://www.facebook.com/acommerce.asia/"><img src="https://lh3.googleusercontent.com/d/1CG__yxnVK7nIwsdGCueTTGO39PZWu3AW" alt="Facebook" width="20" class="sender-fb"/></a></li><li class="social-icon" style="display:inline-block;width:25px;"><a href="https://www.linkedin.com/company/acommerce/"><img src="https://lh3.googleusercontent.com/d/14sHVcrwreh-6-TCge2J5tyt-g6AtFP6E" alt="LinkedIn" width="20" class="sender-fb"/></a></li></ul></td></tr><tr><td colspan="2" style="width:100%;padding:0 10px 0 0;"><p class="sender-address" style="margin:0 0 5px;padding:0;display:block;font-weight:400;line-height:18px;color:#909090;">A: '+addrTx+'</p><p style="margin:0;font-weight:400;line-height:18px;color:#909090;" id="country-list">'+cntryTx+'</p></td></tr></table>'; 
    
    //console.log('rightTemplate: '+rightTemplate);
    //theRight.innerHTML = rightTemplate;
    return rightTemplate;
  }
}
const updateStorageData = () => {
  //let dataImg = bannerImg;

  const data = {
    address: addressTx,
    banner: bannerSelect.value,    
    ccode: inpCode.value,
    countryid: countrySelect.selectedIndex+1,
    countryname: countrySelect.value,
    department: departmentSelect.value,
    email: eAddress.value,
    fullname: fullName.value,
    logoid: logoList.value,
    logoimage: getLogo(logoList.value),
    nickname: nickName.value,
    phone: inpPhone.value,
    title: titleName.value,
    bannerimage: bannerFactory(departmentSelect.value, bannerSelect.value)
  };  
  localStorage.setItem("fData", JSON.stringify(data));
}

const signatureForm = document.getElementById('signature-form');

const renderForm = () => {
  const getData = JSON.parse(localStorage.getItem("fData"));
  const listBanner = document.getElementById('banner');
  if(getData) {
    let codeClass = "66";
    if(getData.ccode != '') codeClass = getData.ccode;    
    addressTx = getData.address || "";
    countryTx = getData.countryname || "";
    fullName.value = getData.fullname || "";
    nickName.value = getData.nickname || "";
    titleName.value = getData.title || "";
    eAddress.value = getData.email || "";
    if(getData.ccode != '') {
      let currentClass = inpCode.className;
      if(classExist(inpCode)) {
        inpCode.classList.remove(currentClass);
        inpCode.classList.add('flag'+getData.ccode);
      } 
      inpCode.value = getData.ccode;
    } else {
      inpCode.value = codeClass;
      inpCode.classList.add('flag66');
    }
    inpPhone.value = getData.phone || "";
    listBanner.value = getData.banner || "";
    departmentSelect.value = getData.department || "";
    countrySelect.value = getData.countryname || "";  
    countrySelect.selectedIndex = parseInt(getData.countryid)-1;  
    inpCode.selectedIndex = parseInt(getData.countryid)-1;  

    if(getData.department > 1) {
      logoList.disabled = false;
      listBanner.disabled = false;
    }
    
    if(getData.logoid != '') {
      logoList.selectedIndex = getData.ccode;
    } else {
      logoList.selectedIndex = 1;
    }

    updateBannerList(getData.department, listBanner, parseInt(getData.banner)-1);    
    updateSelectedFlag(codeClass);
  } else {   
    updateBannerList(1, listBanner, 0);  
  }
}

document.addEventListener("DOMContentLoaded", () => {
  
  inpPhone.addEventListener('keydown', (event) => {
    numOnly(event);
  });

  signatureForm.addEventListener("input", () => {    
    updateStorageData();
  });

  renderForm();
  updatePreview(); 
});
