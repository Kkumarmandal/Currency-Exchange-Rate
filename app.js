const apiKey = "b7407aff43aa0b76b0732ed2";

const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair`;

const dropDownSelec = document.querySelectorAll (".dropdown select");
const btn = document.querySelector ("form button");
const formCurr = document.querySelector (".from select");
const toCurr = document.querySelector (".to select");
const msg = document.querySelector (".msg");

for ( let select of dropDownSelec){
    for (currCode in countryList){

        let newOption = document.createElement ("option");

        newOption.innerText = currCode;

        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } 
        else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        };
        select.appendChild (newOption);
       
    }

    select.addEventListener ("change", (evt) => {
        udpdateFlag(evt.target);
    });
}

const udpdateFlag = (element) => {
    let currCode = element.value;
    let contryCode = countryList [currCode];
    let newSrc = `https://flagsapi.com/${contryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener ("click" , async (event) => {
    event.preventDefault();
    let amount = document.querySelector (".amount input");
    let amtVal = amount.value;
    if (amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    console.log (formCurr.value , toCurr.value);
    let url = `${baseUrl}/${formCurr.value}/${toCurr.value}`;

    let response = await fetch(url);
    
    let data = await response.json ();
    let rate = data.conversion_rate;

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${formCurr.value} = ${finalAmount} ${toCurr.value}`;

    
    console.log (rate);
});


