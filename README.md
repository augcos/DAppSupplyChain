# DApp Supply Chain Project
## Introduction
This code is part of the DApp Supply Chain Project for the Blockchain Developer Nanodegree by Udacity. The goal of this project is to implement a notary sistem to create, track and exchange ERC721 tokens on the ethereum network. For this project, a custom ERC-721 token called The Coolest Token (TCT) was implemented and deployed to the Rinkeby testnet.

## Development
The project vas developed using the following software:
```
Node.js         v10.19.0
npm             v8.1.1
Truffle         v5.4.14
OpenZeppelin    v2.3.0
Solidity        v0.5.16
```

## How to install?
Before running this project in your local system, you will need to have Node.js, npm and Truffle preinstalled. After cloning this repository, run the following command to install all the necessary dependencies:
```
npm install
```

## Test the project
If you want to modify the testing of the project, you can modify the TestSupplyChain.js file in the Test folder. To test the project, run the following commands:
```
truffle compile
truffle test
``` 

## Run the project
### Deploy to a local blockchain
First start the Truffle development enviroment. Run the following command, which will launch a local ethereum blockchain on 127.0.0.1:9454 as well as the development enviroment:
```
truffle develop
```
Next, compile the code and deploy from the Truffle development enviroment using the following commands:
```
compile
migrate --reset
```
Then, run the frontend from the terminal using the command:
```
npm run dev
```

### Deploy to the Rinkeby testnet
First start the Truffle development enviroment. Run the following commands to compile the code and deploy to the Rinkeby testnet (deployment make take a few minutes):
```
compile
migrate --reset --network rinkeby
```
In order for this deployment to be successfull, you will need to do two changes to the project. First, create a file in the same directory as truffle-config.js named .secret with the mnemonic to you ethereum account. Next, add your Infura endpoint address to the infuraKey variable in the truffle-config.js file. You can already find the project deployed on the Rinkeby testnet here:
```
    SupplyChain:        https://rinkeby.etherscan.io/address/0x870d3BDd0aEaA702129FDB464b9EEcCB1C457a93          
    Ownable:            https://rinkeby.etherscan.io/address/0xE208784AAfF484CF0059968349300c6956EfE02E          
    FarmerRole:         https://rinkeby.etherscan.io/address/0xD7fbE73f7fde19E6C405F0dD322eD945Ac379FF2          
    DistributorRole:    https://rinkeby.etherscan.io/address/0x2cf59b0799c4dC47fA5b09EB20a7Da2628F0536C          
    RetailerRole:       https://rinkeby.etherscan.io/address/0x279c0cDF42e73fab1CA673cB46Cc8318bf5C99F0          
    ConsumerRole:       https://rinkeby.etherscan.io/address/0x03Fb85B275Ccd504DBcBe142bf8aAdcC23C2fA75
```

### Run DApp locally
After exiting the truffle command line run the following command to launch the frontend:
```
    npm run dev
```


