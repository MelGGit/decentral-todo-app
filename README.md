# Simple decentral Todo App

## Steps to install

### Clone to local

```bash
$ git clone https://github.com/MelGGit/decentralized-todo-list.git
$ cd decentralized-todo-list
$ pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

### Go to backend folder and install dependencies

- the backend folder contains the smart contract
- you can start your local dev blockchain from here

```bash
$ cd backend
$ pnpm i
```

### Start local blockchain

```bash
$ npx hardhat node
```
- a local development blockchain will run on http://127.0.0.1:8545/
- also you will get a list of all available accounts and their private keys
- !important! your local network needs to run the whole time. Else the App wont function

### Add an account to Metamask

To interact with your local Blockchain you need an account from the list in your terminal.

#### Steps
- go to Metamask in the browser
- click the round circle in the top right
- click on import account
- copy one of the private keys in from the terminal and paste it into Metamask
- hit import

### Add Hardhat to your networks

The second step to interact with your local development blockchain is to add it to your list of networks.

#### Steps
- click the circle in the top right again
- click on settings
- click on Networks
- click on Add Network
- Add Network name: Hardhat local
- New RPC URL: http://127.0.0.1:8545/
- ChainId: 31337

Now Metamask can connect to your local Network.

### Deploy the smart contract to your local network
Open another terminal window and switch to the backend folder again.
Run the deploy sript with:
```bash
$  npx hardhat run --network localhost scripts/deploy.ts
```
Now the smart contract has been deployed.

### Copy the address of the smart contract
After deploying the terminal will say:
```bash
TodoList deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```
The hex number in the end will be different to the one above.
This is the address of the contract
Copy that address starting with 0x
Now go to the file web3.ts in the src folder.
Paste the address into contractAddress: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'


### Run the app

Open another terminal window and type:

```bash
$ pnpm dev
```

Now your browser will open and you can use the App.

Haven fun!