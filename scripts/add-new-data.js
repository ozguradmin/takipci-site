#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('📝 Yeni veri ekleme scripti\n');

// Video tarihi al
rl.question('📅 Video tarihi (YYYY-MM-DD formatında, örn: 2025-09-01): ', (videoDate) => {
  // Tarih formatını kontrol et
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(videoDate)) {
    console.error('❌ Geçersiz tarih formatı! YYYY-MM-DD formatında olmalı.');
    rl.close();
    return;
  }

  // JSON dosyası yolu
  const jsonPath = path.join(__dirname, '..', 'public', 'data', `rankings-${videoDate}.json`);
  
  // Dosya zaten var mı kontrol et
  if (fs.existsSync(jsonPath)) {
    console.log(`⚠️  ${videoDate} tarihli veri zaten mevcut!`);
    rl.question('Üzerine yazmak istiyor musunuz? (y/n): ', (overwrite) => {
      if (overwrite.toLowerCase() !== 'y') {
        console.log('❌ İşlem iptal edildi.');
        rl.close();
        return;
      }
      addData(videoDate, jsonPath);
    });
  } else {
    addData(videoDate, jsonPath);
  }
});

function addData(videoDate, jsonPath) {
  console.log('\n📊 Veri ekleme modu:');
  console.log('1. JSON dosyası yolu girin (tam yol)');
  console.log('2. Veya "manuel" yazın manuel giriş için');
  
  rl.question('Seçiminiz: ', (choice) => {
    if (choice.toLowerCase() === 'manuel') {
      manualDataEntry(videoDate, jsonPath);
    } else {
      // JSON dosyasından oku
      try {
        const jsonData = JSON.parse(fs.readFileSync(choice, 'utf8'));
        saveData(videoDate, jsonPath, jsonData);
      } catch (error) {
        console.error('❌ JSON dosyası okuma hatası:', error.message);
        rl.close();
      }
    }
  });
}

function manualDataEntry(videoDate, jsonPath) {
  console.log('\n📝 Manuel veri girişi:');
  console.log('Her satırda: username,rank (virgülle ayrılmış)');
  console.log('Örnek: john_doe,1');
  console.log('Bitirmek için boş satır bırakın\n');
  
  const rankings = [];
  
  const askForRanking = () => {
    rl.question('Kullanıcı adı, sıra: ', (input) => {
      if (input.trim() === '') {
        // Veri girişi tamamlandı
        if (rankings.length === 0) {
          console.log('❌ Hiç veri girilmedi!');
          rl.close();
          return;
        }
        
        // Sıralamayı rank'e göre sırala
        rankings.sort((a, b) => a.rank - b.rank);
        
        const data = {
          video_date: videoDate,
          rankings: rankings,
          total_count: rankings.length,
          generated_at: new Date().toISOString()
        };
        
        saveData(videoDate, jsonPath, data);
      } else {
        const [username, rank] = input.split(',').map(s => s.trim());
        if (!username || !rank || isNaN(rank)) {
          console.log('❌ Geçersiz format! Tekrar deneyin.');
          askForRanking();
        } else {
          rankings.push({
            id: rankings.length + 1,
            username: username,
            profile_picture_url: null,
            rank: parseInt(rank),
            created_at: videoDate,
            updated_at: new Date().toISOString()
          });
          askForRanking();
        }
      }
    });
  };
  
  askForRanking();
}

function saveData(videoDate, jsonPath, data) {
  try {
    // data klasörünü oluştur
    const dataDir = path.dirname(jsonPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // JSON dosyasını kaydet
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`✅ Veri kaydedildi: ${jsonPath}`);
    console.log(`📊 Toplam ${data.rankings?.length || data.total_count || 0} kayıt`);
    
    // Ana rankings.json'u güncelle
    updateMainRankings(videoDate, data);
    
    rl.close();
  } catch (error) {
    console.error('❌ Dosya kaydetme hatası:', error.message);
    rl.close();
  }
}

function updateMainRankings(videoDate, newData) {
  const mainRankingsPath = path.join(__dirname, '..', 'public', 'data', 'rankings.json');
  
  try {
    let mainData = { rankings: [], total_count: 0, last_updated: new Date().toISOString() };
    
    if (fs.existsSync(mainRankingsPath)) {
      mainData = JSON.parse(fs.readFileSync(mainRankingsPath, 'utf8'));
    }
    
    // En son 100 kaydı al
    const allRankings = newData.rankings || [];
    mainData.rankings = allRankings.slice(0, 100);
    mainData.total_count = allRankings.length;
    mainData.last_updated = new Date().toISOString();
    
    fs.writeFileSync(mainRankingsPath, JSON.stringify(mainData, null, 2));
    console.log('✅ Ana rankings.json güncellendi');
    
    console.log('\n🚀 Sonraki adımlar:');
    console.log('1. npm run update-data  (veriyi deploy et)');
    console.log('2. Veya manuel olarak git add, commit, push yap');
    
  } catch (error) {
    console.error('❌ Ana rankings güncelleme hatası:', error.message);
  }
}
