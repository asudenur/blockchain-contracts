Blockchain Tabanlı Sertifika Doğrulama Sistemi <br>

Ders: Dijital Dönüşüme Giriş <br>
Bölüm: Yazılım Mühendisliği <br>
Kurum: Konya Teknik Üniversitesi <br>

1. Proje Hakkında<br>

Bu proje, Docker tabanlı blockchain altyapısı üzerinde çalışan bir akıllı kontrat sistemi ile dijital sertifika oluşturma, doğrulama ve iptal süreçlerini uçtan uca göstermeyi amaçlar.<br>
Öğrenciler, konteynerleştirme, mikroservis mimarisi ve akıllı kontrat etkileşimlerini deneyimleyecektir.<br>

2. Öğrenme Çıktıları<br>

Docker Compose ile çok konteynerli geliştirme ortamı kurma.<br>
Hardhat ve ethers kullanarak akıllı kontrat derleme, deploy ve test.<br>
Hash tabanlı sertifika sistemi tasarlama ve güvenliğini sağlama.<br>
KVKK uyumu için kişisel verileri zincire yazmadan koruma.<br>
CLI veya basit web arayüzü ile sertifika doğrulama işlemleri.<br>
Git ve dokümantasyon ile projenin yönetimi.<br>

3. Teknik Yığın<br>
Docker Desktop / Podman + Docker Compose v2<br>
Node.js 18+<br>
Hardhat + ethers.js<br>
Ganache (Yerel EVM)<br>

4. Sistem Mimarisi<br>
Servis	Açıklama<br>
ganache	Yerel EVM zinciri<br>
hardhat	Akıllı kontrat derleme, deploy ve test<br>
client	Sertifika üretme ve doğrulama istemcisi<br>

Docker Compose ağı: certnet<br>
Servisler aynı network üzerinde birbirine erişir.<br>
client → hardhat → ganache bağımlılığı ile çalışır.<br>

5. Kurulum Adımları<br>

Repo klonlama:<br>
git clone <https://github.com/asudenur/blockchain-contracts><br>
cd <blockchain-contracts><br>
Docker Compose ile ortamı başlat:<br>
docker compose up -d<br>
<img width="1473" height="264" alt="Ekran görüntüsü 2025-11-26 160212" src="https://github.com/user-attachments/assets/722fbe80-eed9-4f3f-889d-97e172069d74" />

Hardhat içinde kontrat derleme ve deploy:<br>
docker compose exec hardhat bash<br>
npx hardhat compile<br>
npx hardhat run scripts/deploy.js --network localhost<br>
<img width="959" height="127" alt="Ekran görüntüsü 2025-11-26 160432" src="https://github.com/user-attachments/assets/9be8156d-8607-4ff0-8694-f9c03d4310e7" />

Çıktıda kontrat adresini not edin ve client/index.js içindeki REGISTRY_ADDRESS değişkenine yazın.<br>
Client üzerinden sertifika oluşturma ve doğrulama:<br>
docker compose exec client bash<br>
node index.js<br>
<img width="799" height="63" alt="Ekran görüntüsü 2025-11-26 160549" src="https://github.com/user-attachments/assets/1c8f9fb6-e0bf-4482-909c-0d03fe83c78c" />

6. Akıllı Kontrat Özeti<br>

Kontrat Adı: CertificateRegistry<br>
Fonksiyonlar:<br>
issue(id, holderHash, title, issuer, expiresAt) – sertifika oluşturur<br>
verify(id, holderHash) – sertifika doğrulama<br>
revoke(id) – sertifika iptal<br>
Veri yapısı:<br>
holderHash → kişisel verinin hash’i<br>
title → sertifika adı<br>
issuer → ihraç eden kurum<br>
issuedAt, expiresAt, revoked<br>
Güvenlik:<br>
Kişisel veriler zincire yazılmaz<br>
onlyOwner modifier ile yalnızca yetkili ihraççı işlem yapabilir<br>

7. Sertifika JSON Modeli<br>
{<br>
  "id": "hex32bytes",<br>
  "holderHash": "0x...",<br>
  "title": "Ders Tamamlama",<br>
  "issuer": "KTUN",<br>
  "expiresAt": 0,<br>
  "salt": "rastgele-üretilecek"<br>
}<br>
Salt istemci tarafında üretilir, zincire yazılmaz.<br>
<img width="1000" height="342" alt="Ekran görüntüsü 2025-11-26 160625" src="https://github.com/user-attachments/assets/4f075d81-cccd-4cb1-a207-1b47566e46f7" />


8. Kullanım Örnekleri<br>
Sertifika oluşturma (issue)<br>
node index.js<br>

Sertifika doğrulama (verify)<br>
node index.js<br>
Sertifika iptal (revoke)<br>
(Hardhat konsolu veya deploy edilmiş kontrat üzerinden)<br>

9. Güvenlik ve KVKK Notları<br>
Zincire kişisel veri koymayın.<br>
Hash + salt kullanın.<br>
Revokasyon ve son kullanma desteği bulunur.
Cüzdan/anahtar bilgilerini repoya koymayın.

10. Testler
Hardhat testleri: npx hardhat test
Birim ve uçtan uca doğrulama senaryoları içerir.
