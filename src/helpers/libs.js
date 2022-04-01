

const randomNumber=()=>{
const possible='abcdefghijklsmnxyz0123456789';
let randomNumber=0;
for (let i=1; i<6;i++){
    randomNumber +=possible.charAt(Math.floor(Math.random()* possible.length));
}

return randomNumber;
}


module.exports={ randomNumber}