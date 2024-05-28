const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newImg = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newImg;
};

for(let select of dropdown) {
    for (codes in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = codes;
        newOption.value = codes;

        if(select.name === "from" && codes === "USD") {
            newOption.selected = "seleccted";
        } else if (select.name === "to" && codes === "INR") {
            newOption.selected = "seleccted";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

btn.addEventListener("click", (evt)=> {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let inputVal = amount.value;
    if(inputVal === "" || inputVal < 1 ) {
        inputVal.value = "1";
        inputVal = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let respose = await fetch(URL);
    let data = await respose.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmon = rate * inputVal;
    msg.innerText = `${inputVal} ${fromCurr.value} = ${finalAmon} ${toCurr.value}`;
}