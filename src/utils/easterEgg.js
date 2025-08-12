const QUOTES = [
  "Time is money.", // 時間就是金錢
  "Lost time is never found again.", // 失去的時間再也找不回
  "The key is in not spending time, but in investing it.", // 關鍵不在於花時間，而在於投資時間
  "Time is what we want most, but what we use worst.", // 時間是我們最想要卻最不善用的東西
  "The two most powerful warriors are patience and time.", // 最強大的兩位戰士是耐心與時間
  "Your time is limited. Don’t waste it living someone else’s life.", // 你的時間有限，不要浪費在活別人的人生
  "Time waits for no one.", // 時間不等人
  "Better three hours too soon than a minute too late.", // 寧早三小時，不遲一分鐘
  "Yesterday is gone. Tomorrow has not yet come. We have only today.", // 昨日已逝，明日未至，唯有今日
  "Time flies over us, but leaves its shadow behind.", // 時光飛逝，但留下它的影子
  "The trouble is, you think you have time.", // 問題是，你以為你還有時間
  "Punctuality is the thief of time.", // 準時是時間的小偷
  "The future is something which everyone reaches at the rate of sixty minutes an hour.", // 未來是每個人都以每小時六十分鐘的速度到達的地方
  "An inch of time is an inch of gold, but you can't buy that inch of time with an inch of gold.", // 一寸光陰一寸金，寸金難買寸光陰
  "Time is a created thing. To say 'I don't have time' is like saying 'I don't want to.'", // 時間是人造的，說「我沒時間」等於說「我不想」
  "Time is the wisest counselor of all.", // 時間是最睿智的顧問
  "You may delay, but time will not.", // 你可以拖延，但時間不會
  "The bad news is time flies. The good news is you're the pilot.", // 壞消息是時間飛逝，好消息是你是駕駛
  "Time takes it all, whether you want it to or not.", // 無論你願不願意，時間都會奪走一切
  "The best time to plant a tree was twenty years ago. The second best time is now.", // 種樹的最佳時間是二十年前，其次是現在
  "Time changes everything except something within us which is always surprised by change.", // 時間改變一切，除了我們心中對改變的驚訝
  "Men talk of killing time, while time quietly kills them.", // 人們談著消磨時間，時間卻靜靜地殺死他們
  "Time, the devourer of all things.", // 時間，萬物的吞噬者
];

function pickRandom(arr) {
  if (window.crypto?.getRandomValues) {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return arr[buf[0] % arr.length];
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

function getYearBasics(d = new Date()) {
  const y = d.getFullYear();
  const start = new Date(y, 0, 1);
  const end = new Date(y + 1, 0, 1);
  const dayIndex = Math.floor((d - start) / 86400000) + 1;
  const totalDays = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 366 : 365;
  const left = totalDays - dayIndex;
  const pct = Math.round(((d - start) / (end - start)) * 100);
  return { y, dayIndex, totalDays, left, pct };
}

function printBanner(chosen) {
  const { y, pct, dayIndex, totalDays, left } = getYearBasics();
  const title = `
██╗   ██╗███████╗ █████╗ ██████╗     ██████╗ ██████╗  ██████╗  ██████╗ ██████╗ ███████╗███████╗███████╗    
╚██╗ ██╔╝██╔════╝██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗██╔════╝██╔════╝██╔════╝    
 ╚████╔╝ █████╗  ███████║██████╔╝    ██████╔╝██████╔╝██║   ██║██║  ███╗██████╔╝█████╗  ███████╗███████╗    
  ╚██╔╝  ██╔══╝  ██╔══██║██╔══██╗    ██╔═══╝ ██╔══██╗██║   ██║██║   ██║██╔══██╗██╔══╝  ╚════██║╚════██║    
   ██║   ███████╗██║  ██║██║  ██║    ██║     ██║  ██║╚██████╔╝╚██████╔╝██║  ██║███████╗███████║███████║    
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝    
`.trim();

  const chip = "padding:2px 6px;border-radius:6px";
  const base = `${chip};background:#000;color:#0ff;font-weight:700`;
  const quote =
    "color:#b1f2ff;font-style:italic;font-size:20px;font-weight:bold";

  console.clear();
  console.log("%c" + title, "color:#0ff");
  console.log(
    "%cYEAR%c %d  %cPROGRESS%c %d%%  %cDAY%c %d/%d  %cLEFT%c %d",
    base,
    "",
    y,
    base,
    "",
    pct,
    base,
    "",
    dayIndex,
    totalDays,
    base,
    "",
    left
  );
  console.log("%c“%s”", quote, chosen);
}

export function installEasterEgg() {
  if (typeof window === "undefined") return;
  if (window.__YEAR_BAR_EASTER__) return;
  window.__YEAR_BAR_EASTER__ = true;

  const chosen = pickRandom(QUOTES);
  window.__YEAR_BAR_QUOTE__ = chosen;

  window.yearPct = () => {
    const { pct } = getYearBasics();
    console.log(`This year is ${pct}% complete.`);
    return pct;
  };
  window.dayOfYear = () => {
    const { dayIndex, totalDays } = getYearBasics();
    console.log(`Today is day ${dayIndex} of ${totalDays}.`);
    return { dayIndex, totalDays };
  };
  window.countdown = () => {
    const { left } = getYearBasics();
    console.log(`${left} days left in this year.`);
    return left;
  };
  window.helpTime = () => {
    console.table(getYearBasics());
    console.log("Available: yearPct(), dayOfYear(), countdown(), helpTime()");
    console.log("Quote:", window.__YEAR_BAR_QUOTE__);
  };

  printBanner(chosen);

  const refresh = () => setTimeout(() => printBanner(chosen), 120);
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refresh();
  });
}
