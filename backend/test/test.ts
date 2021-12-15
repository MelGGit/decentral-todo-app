import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Test } from "../typechain";

describe ("Test", () => {
  let deployedTestContract: Test
  let addrs: SignerWithAddress[]
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress

beforeEach(async() => {
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners()
  const testContract = await ethers.getContractFactory('Test')
  deployedTestContract = await testContract.deploy()
})

  it("Should initialize the contractwith an owner", async() => {
    await deployedTestContract.deployed()

    expect(await deployedTestContract.getOwner()).to.equal(owner.address)
  })
  it("Should set a new owner", async() => {
    await deployedTestContract.deployed()
    const newOwner = await deployedTestContract.setOwner(addr2.address)
    await newOwner.wait();

    expect(await deployedTestContract.getOwner()).to.equal(addr2.address)
  })
})