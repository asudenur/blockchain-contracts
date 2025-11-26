Blockchain Tabanlı Sertifika Doğrulama Sistemi

Ders: Dijital Dönüşüme Giriş
Bölüm: Yazılım Mühendisliği
Kurum: Konya Teknik Üniversitesi

1. Proje Hakkında

Bu proje, Docker tabanlı blockchain altyapısı üzerinde çalışan bir akıllı kontrat sistemi ile dijital sertifika oluşturma, doğrulama ve iptal süreçlerini uçtan uca göstermeyi amaçlar.
Öğrenciler, konteynerleştirme, mikroservis mimarisi ve akıllı kontrat etkileşimlerini deneyimleyecektir.

2. Öğrenme Çıktıları

Docker Compose ile çok konteynerli geliştirme ortamı kurma.
Hardhat ve ethers kullanarak akıllı kontrat derleme, deploy ve test.
Hash tabanlı sertifika sistemi tasarlama ve güvenliğini sağlama.
KVKK uyumu için kişisel verileri zincire yazmadan koruma.
CLI veya basit web arayüzü ile sertifika doğrulama işlemleri.
Git ve dokümantasyon ile projenin yönetimi.

3. Teknik Yığın
Docker Desktop / Podman + Docker Compose v2
Node.js 18+
Hardhat + ethers.js
Ganache (Yerel EVM)

4. Sistem Mimarisi
Servis	Açıklama
ganache	Yerel EVM zinciri
hardhat	Akıllı kontrat derleme, deploy ve test
client	Sertifika üretme ve doğrulama istemcisi

Docker Compose ağı: certnet
Servisler aynı network üzerinde birbirine erişir.
client → hardhat → ganache bağımlılığı ile çalışır.

5. Kurulum Adımları

Repo klonlama:
git clone <https://github.com/asudenur/blockchain-contracts>
cd <blockchain-contracts>
Docker Compose ile ortamı başlat:
docker compose up -d
<img width="1473" height="264" alt="Ekran görüntüsü 2025-11-26 160212" src="https://github.com/user-attachments/assets/722fbe80-eed9-4f3f-889d-97e172069d74" />

Hardhat içinde kontrat derleme ve deploy:
docker compose exec hardhat bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
<img width="959" height="127" alt="Ekran görüntüsü 2025-11-26 160432" src="https://github.com/user-attachments/assets/9be8156d-8607-4ff0-8694-f9c03d4310e7" />

Çıktıda kontrat adresini not edin ve client/index.js içindeki REGISTRY_ADDRESS değişkenine yazın.
Client üzerinden sertifika oluşturma ve doğrulama:
docker compose exec client bash
node index.js
<img width="799" height="63" alt="Ekran görüntüsü 2025-11-26 160549" src="https://github.com/user-attachments/assets/1c8f9fb6-e0bf-4482-909c-0d03fe83c78c" />

6. Akıllı Kontrat Özeti

Kontrat Adı: CertificateRegistry
Fonksiyonlar:
issue(id, holderHash, title, issuer, expiresAt) – sertifika oluşturur
verify(id, holderHash) – sertifika doğrulama
revoke(id) – sertifika iptal
Veri yapısı:
holderHash → kişisel verinin hash’i
title → sertifika adı
issuer → ihraç eden kurum
issuedAt, expiresAt, revoked
Güvenlik:
Kişisel veriler zincire yazılmaz
onlyOwner modifier ile yalnızca yetkili ihraççı işlem yapabilir

7. Sertifika JSON Modeli
{
  "id": "hex32bytes",
  "holderHash": "0x...",
  "title": "Ders Tamamlama",
  "issuer": "KTUN",
  "expiresAt": 0,
  "salt": "rastgele-üretilecek"
}
Salt istemci tarafında üretilir, zincire yazılmaz.
<img width="1000" height="342" alt="Ekran görüntüsü 2025-11-26 160625" src="https://github.com/user-attachments/assets/4f075d81-cccd-4cb1-a207-1b47566e46f7" />


8. Kullanım Örnekleri
Sertifika oluşturma (issue)
node index.js

Sertifika doğrulama (verify)
node index.js
Sertifika iptal (revoke)
(Hardhat konsolu veya deploy edilmiş kontrat üzerinden)

9. Güvenlik ve KVKK Notları
Zincire kişisel veri koymayın.
Hash + salt kullanın.
Revokasyon ve son kullanma desteği bulunur.
Cüzdan/anahtar bilgilerini repoya koymayın.

10. Testler
Hardhat testleri: npx hardhat test
Birim ve uçtan uca doğrulama senaryoları içerir.
