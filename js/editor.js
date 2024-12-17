const jsonContainer = document.getElementById('json-container');
const downloadButton = document.getElementById('download-json');

// Your JSON object
let jsonData = {
  "departments": [
    {
      "id": 1,
      "name": "Marketing",
      "sections": [
        { "id": 1, "name": "Social Media Ad", "banner": [""], "link": [""] }
      ]
    }
  ],
  "countries": [
    { "id": 1, "name": "Thailand", "code": "66", "address": "Some Address" }
  ]
};

// Render the form
function renderForm(data, container) {
  container.innerHTML = '';
  for (let key in data) {
    const section = document.createElement('div');
    section.classList.add('form-section');

    // Add a title
    const title = document.createElement('h3');
    title.textContent = key;
    section.appendChild(title);

    if (Array.isArray(data[key])) {
      // Handle arrays
      data[key].forEach((item, index) => {
        const itemContainer = document.createElement('div');
        itemContainer.style.marginLeft = '20px';
        const label = document.createElement('label');
        label.textContent = `Item ${index + 1}`;
        const textarea = document.createElement('textarea');
        textarea.value = JSON.stringify(item, null, 2);
        textarea.addEventListener('input', (e) => {
          try {
            data[key][index] = JSON.parse(e.target.value);
          } catch {
            console.error('Invalid JSON');
          }
        });
        itemContainer.appendChild(label);
        itemContainer.appendChild(textarea);
        section.appendChild(itemContainer);
      });
    } else if (typeof data[key] === 'object') {
      // Handle nested objects
      renderForm(data[key], section);
    } else {
      // Handle primitive values
      const input = document.createElement('input');
      input.type = 'text';
      input.value = data[key];
      input.addEventListener('input', (e) => {
        data[key] = e.target.value;
      });
      section.appendChild(input);
    }

    container.appendChild(section);
  }
}

// Download JSON
function downloadJSON() {
  const jsonString = JSON.stringify(jsonData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '../data.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Initial rendering
renderForm(jsonData, jsonContainer);

// Set up download button
downloadButton.addEventListener('click', downloadJSON);
