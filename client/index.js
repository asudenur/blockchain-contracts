const { ethers } = require("ethers");

// ----------------------------------------
// 1) RPC adresi (Ganache)
// ----------------------------------------
const RPC = "http://ganache:8545";
const provider = new ethers.JsonRpcProvider(RPC);

// ----------------------------------------
// 2) Private Key (Ganache ilk hesabın PK’si)
// Ganache loglarından alacaksın:
// docker compose logs ganache | grep "Private Key"
// ----------------------------------------
const PRIVATE_KEY = "0xf982874d6e071feb5c930933294fc97087d97994779ff2f3147794b6d458cd1f"; 
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// ----------------------------------------
// 3) Deploy sonrası kontrat adresi
// Örn: Registry deployed to: 0x1234abcd... 
// ----------------------------------------
const REGISTRY_ADDRESS = "0x6a53a9Dab55Fcce93c94EC12A1C9F78d5B17e6bA";

// Adres boşsa kullanıcıya uyarı ver (kontrol amaçlı)
if (!REGISTRY_ADDRESS || REGISTRY_ADDRESS === "0xDEPLOY_SONRASI_ADRESI_BURAYA") {
  console.log("⚠️ Lütfen REGISTRY_ADDRESS içine deploy sonrası adresi yaz.");
  process.exit(1);
}

// ----------------------------------------
// 4) ABI (sabit)
// ----------------------------------------
const abi = [
  "function issue(bytes32 id, bytes32 holderHash, string title, string issuer, uint64 expiresAt) external",
  "function verify(bytes32 id, bytes32 holderHash) external view returns (bool, bool, uint64, uint64, string, string)"
];

const contract = new ethers.Contract(REGISTRY_ADDRESS, abi, wallet);

// ----------------------------------------
// 5) Demo Fonksiyon
// ----------------------------------------
async function run() {
  // Sertifika ID (bytes32)
  const id = ethers.id("cert1");

  // holder hash oluştur
  const salt = "random-salt-123";
  const holderHash = ethers.keccak256(
    ethers.toUtf8Bytes(`12345|ASUDE NUR DEMIR|${salt}`)
  );

  console.log("holderHash:", holderHash);

  // 1) CERTIFICATE ISSUE
  console.log("\n🔧 Sertifika oluşturuluyor...");
  const tx = await contract.issue(id, holderHash, "Ders Tamamlama", "KTUN", 0);
  await tx.wait();
  console.log("📌 Issue TX:", tx.hash);

  // 2) VERIFY
  const res = await contract.verify(id, holderHash);

  console.log("\n🔍 Verify sonucu:");
  console.log("Geçerli mi  :", res[0]);
  console.log("Revoked?    :", res[1]);
  console.log("Issued At   :", res[2]);
  console.log("Expires At  :", res[3]);
  console.log("Title       :", res[4]);
  console.log("Issuer      :", res[5]);
}

run().catch(console.error);
