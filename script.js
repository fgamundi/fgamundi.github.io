function fetchFileList() {
  fetch("results.list")
    .then((response) => response.text())
    .then((text) => {
      const files = text.split(/\r?\n/); // Split the text into an array by new lines
      const file1Selector = document.getElementById("file1Selector");
      const file2Selector = document.getElementById("file2Selector");

      files.forEach((file) => {
        if (file.trim()) {
          // Ensure that the file name is not just empty spaces
          let option1 = new Option(file, file);
          let option2 = new Option(file, file);
          file1Selector.add(option1);
          file2Selector.add(option2);
        }
      });
    })
    .catch((error) => console.error("Error loading file list:", error));
}

function loadAndCompare() {
  const file1 = document.getElementById("file1Selector").value;
  const file2 = document.getElementById("file2Selector").value;

  Promise.all([
    fetch(`output/${file1}`).then((response) => response.json()),
    fetch(`output/${file2}`).then((response) => response.json()),
  ])
    .then((jsons) => {
      processResults(jsons[0], jsons[1]);
      processConfig(jsons[0], jsons[1]);
    })
    .catch((error) => {
      console.error("Error fetching the text files:", error);
    });
}

function processResults(json1, json2) {
  const resultsTableBody = document
    .getElementById("resultsTable")
    .getElementsByTagName("tbody")[0];
  resultsTableBody.innerHTML = ""; // Clear existing table data

  const resultsKeys1 = Object.keys(json1.results.drop);
  const resultsKeys2 = Object.keys(json2.results.drop);
  const allResultsKeys = new Set([...resultsKeys1, ...resultsKeys2]);

  allResultsKeys.forEach((key) => {
    const value1 = json1.results.drop[key];
    const value2 = json2.results.drop[key];
    const row = resultsTableBody.insertRow();
    row.insertCell(0).textContent = key;
    row.insertCell(1).textContent = value1;
    row.insertCell(2).textContent = value2;
  });

  const content1Element = document.getElementById("file1Content");
  const content2Element = document.getElementById("file2Content");
  content1Element.innerHTML = JSON.stringify(json1, null, 2);
  content2Element.innerHTML = JSON.stringify(json2, null, 2);
}

function processConfig(json1, json2) {
  const configTableBody = document
    .getElementById("configTable")
    .getElementsByTagName("tbody")[0];
  configTableBody.innerHTML = ""; // Clear existing table data

  const configKeys1 = Object.keys(json1.config);
  const configKeys2 = Object.keys(json2.config);
  const allConfigKeys = new Set([...configKeys1, ...configKeys2]);

  allConfigKeys.forEach((key) => {
    const value1 = json1.config[key];
    const value2 = json2.config[key];
    const row = configTableBody.insertRow();
    row.insertCell(0).textContent = key;
    row.insertCell(1).textContent = value1;
    row.insertCell(2).textContent = value2;
  });

  const content1Element = document.getElementById("file1Content");
  const content2Element = document.getElementById("file2Content");
  content1Element.innerHTML = JSON.stringify(json1, null, 2);
  content2Element.innerHTML = JSON.stringify(json2, null, 2);
}

window.onload = fetchFileList;
