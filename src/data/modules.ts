import { EducationalModule } from '../types';

export const INITIAL_MODULES: EducationalModule[] = [
  {
    id: 1,
    title: "1. Modül: Sınav Kaygısını Tanıma & Anlama",
    subtitle: "Kaygı nedir, fizyolojik ve psikolojik belirtileri nelerdir?",
    description: "Sınav kaygısı doğal bir alarm mekanizmasıdır. Bu modülde bedenimizin ve zihnimizin verdiği sinyalleri fark etmeyi ve onları bir düşman değil, rehber olarak görmeyi öğreniyoruz.",
    topics: [
      "Sınav Kaygısının Fizyolojik Belirtileri (Kalp çarpıntısı, terleme, mide krampları)",
      "Zihinsel ve Duygusal Tepkiler (Konsantrasyon dağınıklığı, unutma korkusu)",
      "Sağlıklı Kaygı ile Yıkıcı Kaygı Arasındaki Çizgi",
      "Kaygının Bilişsel Temelleri: 'Ya başaramazsam?' tuzağı"
    ],
    externalUrl: "https://orgm.meb.gov.tr/meb_iys_dosyalar/2020_06/15152528_sinav_kaygisi_ogrenci_brosuru.pdf",
    homeworkPrompt: "Son 1 hafta içinde sınav düşündüğünde bedeninde hissettiğin 2 fiziksel ve 2 zihinsel tepkiyi yazınız.",
    reflectionPrompt: "Bu belirtileri fark ettiğinde sakinleşmek için hangi yöntemi denedin ve ne hissettin?",
    color: {
      bg: "bg-gradient-to-br from-violet-500 to-purple-600",
      border: "border-purple-200",
      text: "text-purple-700",
      gradient: "from-purple-500 to-indigo-600",
      light: "bg-purple-50",
      badge: "bg-purple-100 text-purple-800"
    }
  },
  {
    id: 2,
    title: "2. Modül: Olumsuz Düşünceleri Yönetme & Bilişsel Yeniden Yapılanma",
    subtitle: "Zihnimizdeki yıkıcı otomatik düşünceleri yakalayıp dönüştürme",
    description: "Sınav kaygısını besleyen en büyük etken, olaylar değil o olaylar hakkındaki yorumlarımızdır. Bu modülde 'felaketleştirme', 'ya hep ya hiç' gibi düşünce hatalarını keşfediyoruz.",
    topics: [
      "Otomatik Olumsuz Düşünceler (OOD) Nelerdir?",
      "Felaketleştirme: En kötü senaryoya saplanıp kalma",
      "Kişiselleştirme ve Aşırı Genelleme Eğilimleri",
      "Kanıt İnceleme Tekniği: Gerçekçi ve destekleyici alternatif düşünceler üretme"
    ],
    externalUrl: "https://www.meb.gov.tr",
    homeworkPrompt: "Sınavla ilgili aklına en sık gelen 1 olumsuz düşünceyi yaz ve bunu gerçekçi bir alternatif düşünceye dönüştür.",
    reflectionPrompt: "Düşünceni alternatif cümleyle değiştirdiğinde içindeki kaygı seviyesinde (1-10 arası) ne kadarlık bir değişim oldu?",
    color: {
      bg: "bg-gradient-to-br from-blue-500 to-cyan-600",
      border: "border-blue-200",
      text: "text-blue-700",
      gradient: "from-blue-500 to-cyan-600",
      light: "bg-blue-50",
      badge: "bg-blue-100 text-blue-800"
    }
  },
  {
    id: 3,
    title: "3. Modül: Zaman Yönetimi & Verimli Çalışma Stratejileri",
    subtitle: "Zaman baskısını azaltan planlama ve çalışma ritimleri",
    description: "Belirsizlik ve plansızlık kaygıyı katlar. Zamanını yönetebilen bir öğrenci, sınav sürecinin efendisi haline gelir.",
    topics: [
      "Pomodoro Tekniği ve Zihinsel Mola Rutinleri",
      "Eisenhower Matrisi: Acil ile Önemliyi Ayırt Etme",
      "Erteleme Hastalığı (Procrastination) ile Başa Çıkma",
      "Deneme Sınavlarında Zamanı Bölümlere Ayırma Sanatı"
    ],
    externalUrl: "https://www.meb.gov.tr",
    homeworkPrompt: "Bugün 2 blokluk Pomodoro çalışması (25 dk çalışma + 5 dk mola) uyguladın mı? Hangi derse odaklandın?",
    reflectionPrompt: "Çalışırken dikkatini en çok ne dağıttı ve bunu engellemek için nasıl bir önlem aldın?",
    color: {
      bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      border: "border-emerald-200",
      text: "text-emerald-700",
      gradient: "from-emerald-500 to-teal-600",
      light: "bg-emerald-50",
      badge: "bg-emerald-100 text-emerald-800"
    }
  },
  {
    id: 4,
    title: "4. Modül: Sınav Anı Taktikleri & Odaklanma Becerileri",
    subtitle: "Sınav salonunda, masa başında panik anında yapılacaklar",
    description: "Sınav anında karşılaştığın zor sorular karşısında soğukkanlılığını korumak ve 'turlama tekniği' ile zamanı maksimum verimle kullanmak.",
    topics: [
      "Turlama Tekniği: Kolaydan zora doğru ilerleme stratejisi",
      "Optik Forma Kodlama Hatalarını Önleme Taktikleri",
      "Sınav Anında Zihin Donması (Kilitlenme) Olduğunda 30 Saniyelik 'Reset' Kuralı",
      "Çeldirici Seçenekleri Eleme Yöntemleri"
    ],
    externalUrl: "https://www.meb.gov.tr",
    homeworkPrompt: "Bir deneme sınavında ilk defa çok zor bir soruyla karşılaştığında atacağın adımları 3 madde halinde özetle.",
    reflectionPrompt: "Sınav esnasında su içmek, gözlerini dinlendirmek ve derin nefes almak için mola planın nedir?",
    color: {
      bg: "bg-gradient-to-br from-amber-500 to-orange-600",
      border: "border-amber-200",
      text: "text-amber-700",
      gradient: "from-amber-500 to-orange-600",
      light: "bg-amber-50",
      badge: "bg-amber-100 text-amber-800"
    }
  },
  {
    id: 5,
    title: "5. Modül: Bedensel Rahatlama & Biyolojik Denge",
    subtitle: "Uyku düzeni, beslenme, nefes ve kas gevşetme protokolleri",
    description: "Beynimizin performansı biyolojik sağlığımızla doğrudan bağlantılıdır. Kaliteli uyku, dengeli beslenme ve diyafram nefesi sınav stresinin doğal panzehiridir.",
    topics: [
      "Diyafram Nefesi: Vagal Sinir Uyarımı ile Kalbi Yavaşlatma",
      "Aşamalı Kas Gevşetme (Jakobson Metodu)",
      "Sınav Haftası ve Sınav Sabahı İdeal Beslenme Kuralları",
      "Zihinsel Arınma için Uyku Hijyeni ve Mavi Işık Kısıtlaması"
    ],
    externalUrl: "https://www.meb.gov.tr",
    homeworkPrompt: "Platformdaki 'Rehberli Nefes Egzersizi'ni en az 3 tur (3 dakika) uygulayarak bedenindeki gevşeme hissini tanımlayınız.",
    reflectionPrompt: "Egzersiz öncesi gerginlik hissin ile egzersiz sonrası hissettiğin kas gevşemesini karşılaştırınız.",
    color: {
      bg: "bg-gradient-to-br from-rose-500 to-pink-600",
      border: "border-rose-200",
      text: "text-rose-700",
      gradient: "from-rose-500 to-pink-600",
      light: "bg-rose-50",
      badge: "bg-rose-100 text-rose-800"
    }
  },
  {
    id: 6,
    title: "6. Modül: Hedef Belirleme & Kendine Güven İnşası",
    subtitle: "İçsel motivasyon, gerçekçi hedefler ve psikolojik sağlamlık",
    description: "Sınav bir amaç değil, hayallerine giden yolda sadece bir araçtır. Kendi değerini bir sınav puanına indirgemeden, içindeki potansiyele inanarak yola devam etme modülü.",
    topics: [
      "SMART Hedef Belirleme Metodolojisi",
      "Kıyaslama Tuzağı: Kendini başkalarıyla değil dünkü kendinle kıyasla",
      "İçsel Motivasyon Kaynaklarını Keşfetme: 'Neden istiyorum?'",
      "Sınav Sonrası Hayat: Başarıyı ve Deneyimi Kucaklama"
    ],
    externalUrl: "https://www.meb.gov.tr",
    homeworkPrompt: "Sınav sonrasında ulaşmak istediğin en büyük hayalini ve bu hayal için bugün yapabileceğin 1 somut adımı yazınız.",
    reflectionPrompt: "Sana güç veren, zorlandığında kendine fısıldayacağın kendi kişisel motivasyon cümleni oluştur.",
    color: {
      bg: "bg-gradient-to-br from-indigo-500 to-sky-600",
      border: "border-indigo-200",
      text: "text-indigo-700",
      gradient: "from-indigo-500 to-sky-600",
      light: "bg-indigo-50",
      badge: "bg-indigo-100 text-indigo-800"
    }
  }
];
