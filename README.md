# My CRUD App

Bu, Next.js, Prisma, MongoDB ve Tailwind CSS kullanılarak oluşturulmuş bir CRUD (Create, Read, Update, Delete) uygulamasıdır. Bu proje, kullanıcıları yönetme yeteneği sağlar; kullanıcı ekleme, düzenleme ve silme işlemlerini içerir.

## Özellikler

- **Oluşturma**: Yeni kullanıcı ekleyebilme.
- **Okuma**: Kullanıcıların listesini görüntüleme.
- **Güncelleme**: Mevcut kullanıcı bilgilerini düzenleme.
- **Silme**: Kullanıcıları silme.
- Tailwind CSS kullanarak duyarlı tasarım.

## Kullanılan Teknolojiler

- **Next.js**: Server-rendered veya statik olarak dışa aktarılmış React uygulamaları için bir React framework'ü.
- **Prisma**: Veritabanlarına bağlanmak için kullanılan yeni nesil bir ORM.
- **MongoDB**: Kullanıcı verilerini depolamak için kullanılan bir NoSQL veritabanı.
- **Tailwind CSS**: Duyarlı kullanıcı arayüzleri tasarlamak için utility-first bir CSS framework'ü.

## Başlarken

### Gereksinimler

Aşağıdaki yazılımların yüklü olduğundan emin olun:

- Node.js (sürüm 14 veya üstü)
- npm (Node paket yöneticisi)

### Kurulum

1. **Depoyu Klonlayın:**

   ```sh
   git clone https://github.com/kullanici-adi/my-crud-app.git
   cd my-crud-app

2. **Gerekli Paketleri Yükleyin:**

   ```sh
   npm install

3. **.env Dosyasını Yapılandırın:** 

   ```sh
   DATABASE_URL="mongodb+srv://kullanici:parola@cluster0.mongodb.net/veritabaniniz?retryWrites=true&w=majority"
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   NEXT_PUBLIC_URL="http://localhost:3000"

4. **Veritabanını Ayarlayın:** 

   ```sh
   npx prisma migrate dev --name initial_migration

5. **Uygulamayı Başlatın:**

    ```sh
    npm run dev
