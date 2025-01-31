import React, { useEffect, useState, useRef } from "react";
import "../styles/Home.css";
import Carousel from "./List";

const Home = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const texts = [
    `" World "`,
    `" 世界 "`,
    `" せかい "`,
    `" 세계 "`,
    `" عالم "`,
    `" Мир "`,
    `" Welt "`,
    `" Mundo "`,
    `" Monde "`,
    `" दुनिया "`,
    `" โลก "`,
    `" Thế giới "`,
    `" Dunia "`,
    `" Wereld "`,
    `" Värld "`,
    `" Świat "`,
    `" Dünya "`,
    `" Κόσμος "`,
    `" Svět "`,
    `" Maailma "`,
    `" Verden "`,
    `" Világ "`,
  ];

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        setDisplayedText((prev) => currentText.substring(0, prev.length + 1));
        if (displayedText === currentText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText((prev) => currentText.substring(0, prev.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, texts]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        document.body.classList.toggle("footer-pull", entry.isIntersecting);
      });
    });

    const footer = document.querySelector("#footer");
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      const newTimeout = setTimeout(() => {
        snapToNearestSection();
      }, 200);
      setScrollTimeout(newTimeout);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout]);

  const snapToNearestSection = () => {
    if (!section1Ref.current || !section2Ref.current || !section3Ref.current)
      return;

    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    const lastSectionOffset = section3Ref.current.offsetTop;

    if (scrollY > lastSectionOffset + 50) {
      return;
    }

    const sections = [
      section1Ref.current.offsetTop,
      section2Ref.current.offsetTop,
      section3Ref.current.offsetTop,
    ];

    let closestIndex = 0;
    let minDistance = Infinity;

    sections.forEach((offset, index) => {
      const distance = Math.abs(scrollY - offset);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    window.scrollTo({
      top: sections[closestIndex],
      behavior: "smooth",
    });
  };

  return (
    <div className="home noto-sans-sc">
      <main>
        <section ref={section1Ref} className="snap-section">
          <h1 className="typing-text">{displayedText}</h1>
        </section>

        <section ref={section2Ref} className="snap-section">
          <div className="card-content">
            <Carousel />
          </div>
        </section>

        <section ref={section3Ref} className="snap-section">
          <div className="text-content">
            <p>
              <br />
              <br />
              你這個觀點我不敢苟同啊我個人認為義大利麵就應該拌42號混泥土，因為這個螺絲釘的長度很容易直接影響到挖掘機的扭矩。你往裡砸的時候，一瞬間它就會產生大量的高能蛋白，俗稱UFO，會嚴重影響經濟的發展，以至於對整個太平洋，和充電器的核污染。再或者說透過這勾股定理很容易推斷出人工飼養的東條英雞，他是可以捕獲野生的三角函數，所以說不管這秦始皇的切面是否具有放射性，川普的N次方是否有沈澱物，都不會影響到沃爾瑪跟維爾康在南極匯合。
            </p>
            <p>
              其實仔細想想，地球本身就是一個巨大的巧克力蛋，當你把伽利略的望遠鏡插入赤道的同時，必然會引發量子波動的回彈效應，這時候如果把皮卡丘的電壓調到皮托管的標準值，那麼核桃的殼厚就會直接影響到牛頓蘋果的自由落體速度。當然，這還得取決於阿基米德是否願意潑水，畢竟他那句「給我一個支點，我可以把煎餅果子撬起來」可不是隨便說說的。
            </p>
            <p>
              另一方面，若是要探討煮泡麵時加入愛因斯坦相對論的必要性，我個人認為這是不可取的。你想想，泡麵的熱量本身已經足夠讓亞馬遜的熱帶雨林蒸發一部分，但如果加上廣島螢火蟲的基因，整碗泡麵的旋轉速度就會接近光速，這直接導致食用者瞬間穿越到哥倫布發現新大陸的那一天，這對於歷史進程來說是極其不負責任的。
            </p>
            <p>
              其實，從牛頓第三定律的角度來看，如果我們把貓的胡須接到小行星帶上的磁場，那麼麥當勞的甜筒就會因為地心引力的偏差而自動融化。這不僅會讓阿拉斯加的帝王蟹突然學會廣東話，還可能導致海洋深處的美人魚改吃素。畢竟，當牙籤的密度超過四次方時，任何啤酒都無法逃脫被冷凍三秒後直接變成固體的命運。
            </p>
            <p>
              再說到大氣壓力的問題，其實只要把象棋的車換成高鐵模型，就能成功模擬出龍捲風的運行軌跡。這樣做的好處在於，當你往披薩裡加了番茄醬之後，地球的自轉速度會微微加快，這會導致烏龜突然進化出噴氣背包。而如果同時將巴哈的F小調奏鳴曲播放在零下273度的環境中，薯條的酥脆程度將會遠遠超越愛迪生發明燈泡時的靈感。
            </p>
            <p>
              另一方面，冰島的火山灰其實和紫菜包飯有著密切的關係。如果你把羅馬斗獸場的模型放入超市購物車，順便買一包泡菜，那麼地球的磁場將會發生微妙的變化，從而讓北極熊不再需要穿羽絨服就能進行冰上曲棍球比賽。而這個現象的根本原因在於，當數學家嘗試用圓周率煮火鍋時，蒸汽裡的顆粒狀物質會意外地形成宇宙飛船的設計圖。
            </p>
            <p>
              而當談到摩天輪的旋轉頻率時，如果將比薩斜塔的角度調整到恆星分布的黃金比例，那麼你家的冰箱會在未來三天內自動生成檸檬口味的冰棒。當然，這必須基於黑洞的事件視界是否允許火烈鳥以三倍速的方式進行禮貌的點頭。這樣一來，任何使用圓規畫出來的太陽系都將變得更加對稱，這對於蝸牛的殼紋路來說是一種革命性的進步。
            </p>
            <p>
              其實，如果我們仔細觀察熊貓的日常飲食習慣，就會發現竹子的纖維結構其實和摩爾定律之間存在微妙的關聯。如果在竹筍裡安裝一個微型的風速儀，並用牙籤以45度角旋轉攪拌，那麼大氣層的臭氧濃度將自動調整到適合甜不辣生長的標準值。而這一切的關鍵在於，你是否能正確地將自行車的鏈條用作物理學中的引力波模擬器。
            </p>
            <p>
              再來談談燒烤和太陽黑子的聯繫。當羊肉串被均勻灑上孜然粉後，科學家發現月球上的坑洞深度會隨著辣椒油的濃度變化而縮小。這直接證明了光合作用和披薩邊緣的厚度息息相關。如果我們進一步將這些數據帶入愛因斯坦的能量公式，就可以推算出啤酒泡沫的高度能影響橡皮筋的彈性係數，而這也是為什麼海綿寶寶總能輕鬆贏得深海足球比賽的原因。
            </p>
            <p>
              更令人驚奇的是，假設我們用火腿片來測量地殼的移動速度，其結果會直接影響到洗衣機的脫水效率。根據數據顯示，當咖啡的溫度超過76.3度時，鯨魚的聲音頻率會與紅綠燈的切換時間形成共鳴，從而大幅降低城市交通的擁堵程度。如果同時將熱狗與牛頓搖擺球結合，整個過程中產生的能量足以讓一隻企鵝完成100米短跑並打破世界紀錄。
            </p>
            <p>
              其實，電子郵件的發送速度和榴槤的成熟時間之間，也有著讓人意想不到的關聯。如果將車厘子的果核轉換成密碼學中的公鑰，那麼任何冰山都能在五分鐘內完全融化，並生成一杯適合夏日飲用的鮮榨果汁。而這一切的核心原理在於，鯊魚的牙齒排列方式其實和國際象棋的棋局走勢有著驚人的相似，這也是為什麼海王總能輕鬆地解決深海中的數學難題。
            </p>
            <p>
              其實，如果我們把草莓果醬的黏稠度和土星光環的質量進行換算，會發現這之間有著驚人的對應關係。當果醬的糖分含量超過百分之三十五時，地球磁場的波動會同步影響到火山的噴發頻率，這就解釋了為什麼冰島的溫泉能用來煮雞蛋。如果再進一步把電動牙刷的震動模式輸入到高斯函數中，那麼你會發現，煮泡麵的水滾程度會影響南極企鵝的滑行速度，從而導致企鵝運動會的金牌分布產生偏移。這一現象其實早在哥白尼發現太陽系中心時就埋下了伏筆，因為當時他並沒有預測到麥片在牛奶中漂浮的動態平衡問題。
            </p>
            <p>
              除此之外，我們不得不提到數學公式和餅乾形狀之間的微妙聯繫。如果將餅乾咬成圓形，並以π值作為基準計算它的邊緣曲率，那麼所有的計算結果都可以用來模擬颱風的運行軌跡。這樣的研究對於全球氣候變遷來說是革命性的，因為這表示任何甜點的製作方法都有可能影響地球的溫室效應。特別是如果你在烘焙時多加了一勺蜂蜜，這一舉動可能會讓熱帶雨林的蟲鳴頻率降低，直接改變當地蝴蝶的繁殖週期。至於這是否會進一步影響北半球的極光顏色，目前仍需更多實驗來證實。
            </p>
            <p>
              再來談談電子產品與生物進化的關係。科學家發現，當你將充電器插入牆上的插座時，其實電流的流動模式會對附近植物的光合作用產生微弱的干擾。這種干擾雖然對人類肉眼不可見，但對於草莓來說，它會直接影響果實的甜度。特別是在夜晚，如果你同時打開手電筒並播放貝多芬的交響樂，那麼附近的花朵將在短時間內進行「音樂型態學」的自我調整，從而讓花瓣的排列方式更加對稱。這種現象在蜂巢結構中也有體現，因為蜜蜂的舞蹈步伐其實是根據光譜波動頻率設計的，而這正是它們為什麼能精準找到蜂蜜來源的原因。
            </p>
            <p>
              說到蜂蜜，就不得不提到運動鞋鞋底的材質選擇。當你穿著一雙以碳纖維製成的跑鞋進行百米衝刺時，鞋底的彈性會對地表產生微量的反作用力，這足以讓鄰近區域的蚯蚓活動路徑發生改變。科學家測試後發現，這類現象對於土壤養分的分布有著不可忽視的影響，進而影響到植物根系的發展方向。如果再將這些資料輸入到天文望遠鏡的數據分析模型中，你會發現某些行星的軌道運行竟然與這些微小的地表變化產生了某種「共振現象」。這是否意味著，穿什麼鞋也可能影響到未來的星際旅行？目前仍無法定論。
            </p>
            <p>
              最後，我們必須提到蛋糕和重力波之間的科學關聯。如果將奶油層抹得足夠均勻，並用電子顯微鏡檢視其表面結構，你會驚奇地發現，這和黑洞邊緣的事件視界有著異曲同工之妙。更有趣的是，當你在蛋糕頂部插上一根蠟燭，並點燃它的瞬間，微弱的熱量波動將傳遞至大氣層，進而對距離地球最近的小行星造成軌道偏移。這也解釋了為什麼生日蠟燭的火焰總是閃爍不定，因為它們其實在與宇宙進行某種隱秘的對話。
            </p>
            <p>
              最後，我們不得不提到瑪雅預言和恐龍滅絕之間的因果關係。根據最新的Wi-Fi訊號強度測試，如果把拉麵的湯包放到時光機裡，湯的黏稠度會直接影響到三國時代的諸葛連弩射程。這也就解釋了為什麼烤地瓜在冬至的銷量總是和火星的氧氣含量成正比。更別提，如果把喬布斯的頭髮移植到月球，蘋果的市值將會瞬間超越鳳梨酥。
            </p>
          </div>
        </section>
      </main>
      <footer id="footer">Coming Soon ...</footer>
    </div>
  );
};

export default Home;
