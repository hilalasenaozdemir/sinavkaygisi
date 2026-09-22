import { MotivationalQuote } from '../types';

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    id: 1,
    quote: "Sınav senin bilginin sadece o anki fotoğrafıdır; senin zekânı, değerini ya da gelecekteki potansiyelini asla sınırlayamaz.",
    author: "Psikolojik Dayanıklılık İlkesi",
    category: "sınav_kaygısı",
    stressTip: "Derin bir nefes al: Şu anda sadece bir soruyla karşı karşıyasın, tüm hayatınla değil."
  },
  {
    id: 2,
    quote: "Kaygı bir tehlike değil, vücudunun 'ben bu işi önemsiyorum' deme şeklidir. Onu bastırma, enerjisini odaklanmaya dönüştür.",
    author: "Bilişsel Davranışçı Terapi",
    category: "sınav_kaygısı",
    stressTip: "Kalp atışının hızlanması beynine daha çok oksijen gittiği anlamına gelir. Bedenin senin yanında!"
  },
  {
    id: 3,
    quote: "Rüzgarın yönünü değiştiremezsin belki ama yelkenlerini her zaman ayarlayabilirsin. Sakin zihin en fırtınalı sınavı bile aşar.",
    author: "Epiktetos",
    category: "sakinlik",
    stressTip: "Omuzlarını serbest bırak, çeneni gevşet ve 4 saniye nefes alıp 6 saniyede ver."
  },
  {
    id: 4,
    quote: "Mükemmel olmak zorunda değilsin; sadece elinden gelenin en samimisini ortaya koyman yeterli.",
    author: "Carl Rogers",
    category: "özgüven",
    stressTip: "Kendine arkadaşına davrandığın gibi şefkatli yaklaş."
  },
  {
    id: 5,
    quote: "Bir gemi limanda daima güvendedir, ama gemiler bunun için yapılmamıştır. Cesaret, korkuya rağmen adım atabilmektir.",
    author: "John A. Shedd",
    category: "özgüven",
    stressTip: "Korku hissettiğinde dur ve hatırla: Ne kadar hazırlandın, ne kadar emek verdin."
  },
  {
    id: 6,
    quote: "Zihnin dalgalı bir su gibidir; onu zorla yatıştıramazsın, sadece durup sakinleşmesine izin verirsen berraklaşır.",
    author: "Doğu Felsefesi",
    category: "sakinlik",
    stressTip: "Zihnindeki soru yağmurunu 30 saniye izle, onlara kapılmadan sadece geçip gitmelerine izin ver."
  },
  {
    id: 7,
    quote: "Başarı, bir gecede gelen bir mucize değil; kaygılara rağmen her gün atılan küçük kararlı adımların toplamıdır.",
    author: "Robert Collier",
    category: "başarı",
    stressTip: "Büyük resmi parçalara böl: Sadece sıradaki 15 dakikayı veya sıradaki soruyu düşün."
  },
  {
    id: 8,
    quote: "Sınav kağıdındaki hiçbir soru, senin içindeki merak ve öğrenme ışığından daha büyük değildir.",
    author: "Eğitim Psikolojisi",
    category: "sınav_kaygısı",
    stressTip: "Takıldığın bir soru olursa işaretle ve hemen ilerle; zihnin arkada çözmeye devam edecektir."
  },
  {
    id: 9,
    quote: "Korkularının seni hapsetmesine izin verme; çünkü korku geleceğin hayalidir, senin gücün ise tam şu andadır.",
    author: "Seneca",
    category: "odaklanma",
    stressTip: "Şu ana dön: 5-4-3-2-1 tekniğiyle etrafındaki nesnelere odaklan."
  },
  {
    id: 10,
    quote: "Bugün hissettiğin sınav baskısı, yarın hayallerine ulaştığında arkana bakıp gururla gülümseyeceğin bir hatıra olacak.",
    author: "Gelişim Zihniyeti",
    category: "özgüven",
    stressTip: "Gözlerini 10 saniye kapat ve başarıyla sınav salonundan çıktığın anı hayal et."
  },
  {
    id: 11,
    quote: "Kaygı seni gelecekteki olası bir yenilgiye hazırlar; oysa hazırlık seni şu andaki başarıya taşır. Şimdiye odaklan.",
    author: "Marcus Aurelius",
    category: "odaklanma",
    stressTip: "Ayak tabanlarının yere bastığını hisset. Yere sağlam basıyorsun, dengedesin."
  },
  {
    id: 12,
    quote: "Sen bu sınava giren ilk kişi değilsin, son kişi de olmayacaksın. Ama bu süreci kendi iç huzurunla taçlandıracak tek kişi sensin.",
    author: "Rehberlik & Psikolojik Danışmanlık",
    category: "sınav_kaygısı",
    stressTip: "Derin nefesle diyaframını şişir. Bedenin rahatladıkça zihnin berraklaşır."
  },
  {
    id: 13,
    quote: "Zorluklar seni durdurmak için değil, ne kadar güçlü ve dirençli olduğunu sana göstermek için vardır.",
    author: "Helen Keller",
    category: "başarı",
    stressTip: "Zorlandığın anlarda derin bir 'oh' çekerek nefesini serbest bırak."
  },
  {
    id: 14,
    quote: "Hata yapmaktan korkma; en büyük dehalar dahi başarısızlıkların basamaklarını tırmanarak zirveye ulaşmıştır.",
    author: "Albert Einstein",
    category: "özgüven",
    stressTip: "Bir denemede netlerin düşmüş olabilir, bu sadece neyi pekiştirmen gerektiğini gösteren dostane bir pusuladır."
  },
  {
    id: 15,
    quote: "Sınav günü masaya oturduğunda hatırla: Tüm bu kitaplar, notlar ve saatler senin arkanda bir ordu gibi duruyor.",
    author: "Öğrenci Motivasyonu",
    category: "başarı",
    stressTip: "Elini kalbinin üzerine koy ve 'Ben hazırım, elimden geleni yapacağım' de."
  }
];

export function getRandomQuote(): MotivationalQuote {
  const index = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
  return MOTIVATIONAL_QUOTES[index];
}
