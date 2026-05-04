const warnings = {
  guarantee:
    "「必ず儲かる」「低リスクで高利回り」といった保証は、FTCが注意喚起している典型的な詐欺サインです。",
  pressure:
    "今すぐ送金するよう急がせたり、家族や金融機関に相談しないよう求めたりする連絡は、冷静な確認を妨げるため危険です。",
  payment:
    "正規の企業や公的機関が、資産保護や手続きのために暗号資産で前払いを要求することはありません。",
  romance:
    "SNSやマッチングアプリで知り合った相手からの投資話は、送金後に引き出せなくなる詐欺につながることがあります。",
};

const warningButtons = document.querySelectorAll(".warning");
const warningText = document.querySelector("#warningText");

warningButtons.forEach((button) => {
  button.addEventListener("click", () => {
    warningButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    warningText.textContent = warnings[button.dataset.warning];
  });
});

const capitalInput = document.querySelector("#capital");
const cryptoShare = document.querySelector("#cryptoShare");
const reserveShare = document.querySelector("#reserveShare");
const cryptoShareOutput = document.querySelector("#cryptoShareOutput");
const reserveShareOutput = document.querySelector("#reserveShareOutput");
const cryptoAmount = document.querySelector("#cryptoAmount");
const reserveAmount = document.querySelector("#reserveAmount");
const cashAmount = document.querySelector("#cashAmount");
const donut = document.querySelector("#donut");

const yenFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

function updatePlanner() {
  const capital = Math.max(Number(capitalInput.value) || 0, 0);
  const cryptoPercent = Number(cryptoShare.value);
  const reservePercent = Number(reserveShare.value);
  const totalPlanned = cryptoPercent + reservePercent;
  const adjustedReserve = totalPlanned > 100 ? 100 - cryptoPercent : reservePercent;

  if (totalPlanned > 100) {
    reserveShare.value = adjustedReserve;
  }

  const reserveValue = Number(reserveShare.value);
  const cashValue = Math.max(100 - cryptoPercent - reserveValue, 0);

  cryptoShareOutput.textContent = cryptoPercent;
  reserveShareOutput.textContent = reserveValue;
  cryptoAmount.textContent = yenFormatter.format((capital * cryptoPercent) / 100);
  reserveAmount.textContent = yenFormatter.format((capital * reserveValue) / 100);
  cashAmount.textContent = yenFormatter.format((capital * cashValue) / 100);

  donut.style.background = `conic-gradient(
    var(--green) 0 ${cryptoPercent}%,
    var(--gold) ${cryptoPercent}% ${cryptoPercent + reserveValue}%,
    #dfe7e2 ${cryptoPercent + reserveValue}% 100%
  )`;
}

[capitalInput, cryptoShare, reserveShare].forEach((input) => {
  input.addEventListener("input", updatePlanner);
});

updatePlanner();
