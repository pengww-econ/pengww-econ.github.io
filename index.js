const { ethers } = require("ethers");

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    document.getElementById("connectButton").innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install MetaMask";
  }
}

async function execute() {
  if (typeof window.ethereum !== "undefined") {
    const nameInput = document.getElementById('name');
    const valueInput = document.getElementById('value');
    const name = nameInput.value;
    const value = parseInt(valueInput.value);
    if (!name || isNaN(value)) {
                    alert('Please enter a valid name and value.');
                    return;
       }
    contractAddress = "0x8Db11564324a1562Bc0Be20153A8cFa704217032";
    const abi = [{
                        "inputs": [
                            {
                                "internalType": "string",
                                "name": "_name",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "_value",
                                "type": "uint256"
                            }
                        ],
                        "name": "addName",
                        "outputs": [],
                        "stateMutability": "nonpayable",
                        "type": "function"
                    },
                    {
                        "inputs": [],
                        "name": "getPublicNames",
                        "outputs": [
                            {
                                "internalType": "string[]",
                                "name": "",
                                "type": "string[]"
                            }
                        ],
                        "stateMutability": "view",
                        "type": "function"
                    }
                ];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      await contract.addName(name, value);
    } catch (error) {
      console.log(error);
    }
  } else {
    document.getElementById("executeButton").innerHTML =
      "Please install MetaMask";
  }
}

module.exports = {
  connect,
  execute,
};
