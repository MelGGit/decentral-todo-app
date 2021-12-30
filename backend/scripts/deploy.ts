// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled

  const TodoContract = await ethers.getContractFactory("TodoList");
  const todolist = await TodoContract.deploy();

  await todolist.deployed();

  console.log("TodoList deployed to:", todolist.address);

  // const testContract = await ethers.getContractFactory("Test");
  // const test = await testContract.deploy()

  // await test.deployed()

  // console.log("Test deployed to:", test.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
