const rollupServer = process.env.ROLLUP_HTTP_SERVER_URL;
console.log(`HTTP rollup_server url is ${rollupServer}`);

// Function to perform GET request
const getTx = async () => {
  try {
    const response = await fetch(`${rollupServer}/get_tx`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.text(); // or .json() if you expect JSON response
    console.log(`Got tx ${content}`);

    return content; // This might be useful if you want to do something with the response
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};

// Function to perform GET request
const getData = async (namespace, hash) => {
  try {
    const response = await fetch(`${rollupServer}/get_data/${namespace}/${hash}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.arrayBuffer(); // or .json() if you expect JSON response

    return content; // This might be useful if you want to do something with the response
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};

const hint = async(str) => {
  try {
    const response = await fetch(`${rollupServer}/hint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: new TextEncoder().encode(str) // Encode the string as UTF-8
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.text();
    console.log('Success:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to perform POST request
const finishTx = async () => {
  try {
    const response = await fetch(`${rollupServer}/finish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // Empty JSON object as per original script
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(`Finish tx request sent.`);
  } catch (error) {
    console.error(`Error finishing tx: ${error.message}`);
  }
};

// Execute the functions
(async () => {
  console.log("tx is: " + await getTx());
  await finishTx();
})();
