// dapp/test/Certificate.test.js (Güncellenmiş)
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateRegistry", function () {
  let Registry, reg, owner;
  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    Registry = await ethers.getContractFactory("CertificateRegistry");
    reg = await Registry.deploy(); // v6'da deployed() gerekmez ama hardhat-ethers uyumu için bazen waitForDeployment() kullanılır.
    // await reg.deployed(); // Bu satırı silebilirsin v6'da genellikle await reg.waitForDeployment(); kullanılır.
  });

  it("issues and verifies a certificate", async () => {
    // v6 Syntax güncellemeleri:
    const id = ethers.encodeBytes32String("cert1"); 
    const holderHash = ethers.keccak256(ethers.toUtf8Bytes("1234|ALI VELI|salt"));
    
    await reg.issue(id, holderHash, "Completion", "Dept", 0);
    const result = await reg.verify(id, holderHash);
    expect(result[0]).to.equal(true);
  });
});