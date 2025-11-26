async function main() {
  const Registry = await ethers.getContractFactory("CertificateRegistry");
  const reg = await Registry.deploy();
  await reg.waitForDeployment();
  
  const address = await reg.getAddress();
  console.log("Registry deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});