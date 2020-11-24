let invalid = [];
let balance = 0;
let valid = [];

const fs = require('fs');

try {

const data = fs.readFileSync('products.json', 'utf8');

const productss = JSON.parse(data);

const data2 = fs.readFileSync('balance.json', 'utf8');

const balancee = JSON.parse(data2);

let machineBalance = balancee[0].amount*50 + balancee[1].amount*20 + balancee[2].amount*10 + balancee[3].amount*5 + balancee[4].amount*2 + balancee[5].amount*1;

function initiate (){
    return require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
}


function moneyInput (readline){

    readline.question('\nINSERT COIN or type "product" to choose\n\n', amount => {
        if(amount === "0.05" || amount === "0.02" || amount === "0.01"){
            invalid += amount;
            console.log("\nValue Too Low\n");
            console.log("Here Is Your Coin Back:" + amount);
            moneyInput(readline);
        }
        else if(amount === "5" || amount === "2" || amount === "1" || amount === "0.5" || amount === "0.2" || amount === "0.1"){
            if(amount === "0.1"){
                amount = 1;
                balancee[5].amount += 1;
            }
            else if(amount === "0.2"){
                amount = 2;
                balancee[4].amount += 1;
            }
            else if(amount === "0.5"){
                amount = 5;
                balancee[3].amount += 1;
            }
            else if(amount === "1"){
                amount = 10;
                balancee[2].amount +=1 ;
            }
            else if(amount === "2"){
                amount = 20;
                balancee[1].amount += 1;
            }
            else if(amount === "5"){
                amount = 50;
                balancee[0].amount += 1;
            }
            valid += amount;
            balance += amount;
            console.log("\nYour balance:" + balance/10);
            moneyInput(readline);
        }
        else if(amount === "product"){
            productInput(readline, productss);
        }
        else{
            console.log("\nInvalid Coin Value");
            moneyInput(readline);
        }

    });
}

function productInput(readline, productss){
    console.log("\nchoose product\n");
    for(let i = 0; i<productss.length; i++){
        console.log(i+1 + "." + `${productss[i].name}`)
    }
    console.log("0.Exit\n");
    readline.question('INSERT PRODUCT NUMBER\n\n', choice => {

        if(choice === "1"){
            if(machineBalance-`${productss[0].cost}` < 0){
                console.log("Exact Change Only");
                changeReturn(balance);
                return process.exit(1);
            }
            console.log("\nyour choice is cola\n");
            if (`${productss[0].amount}` > 0){
                console.log("product available(" + `${productss[0].amount}` + ")\n");
                console.log("cost:" + `${productss[0].cost}` + "\n");
                let change = balance - `${productss[0].cost}`*10;
                if(change >= 0){
                    console.log("here is your product \n");
                    productss[0].amount -= 1;
                    changeReturn(change);
                }
                if(change < 0){
                    console.log("not enough money\n");
                    moneyInput(readline);
                }
            }
            else{
                console.log("\nproduct unavailable\n");
                productInput(readline, productss);
            }
        }
        else if(choice === "2"){
            if(machineBalance-`${productss[1].cost}` < 0){
                console.log("Exact Change Only");
                changeReturn(balance);
                return process.exit(1);
            }
            console.log("\nyour choice is chips\n");
            if (`${productss[1].amount}` > 0){
                console.log("product available(" + `${productss[1].amount}` + ")\n");
                console.log("cost:" + `${productss[1].cost}` + "\n");
                let change = balance - `${productss[1].cost}`*10;
                console.log(change);
                if(change >= 0){
                    console.log("here is your product \n");
                    productss[1].amount -= 1;
                    changeReturn(change);
                }
                if(change < 0){
                    console.log("not enough money \n");
                    moneyInput(readline);
                }
            }
            else{
                console.log("\nproduct unavailable \n");
                productInput(readline, productss);
            }
        }
        else if(choice === "3"){
            if(machineBalance-`${productss[2].cost}` < 0){
                console.log("Exact Change Only");
                changeReturn(balance);
                return process.exit(1);
            }
            console.log("\nyour choice is candy\n");
            if (`${productss[2].amount}` > 0){
                console.log("product available(" + `${productss[2].amount}` + ")\n");
                console.log("cost:" + `${productss[2].cost}` + "\n");
                let change = balance - `${productss[2].cost}`*10;
                if(change >= 0){
                    console.log("here is your product\n");
                    productss[2].amount -= 1;
                    changeReturn(change);
                }
                if(change < 0){
                    console.log("not enough money\n");
                    moneyInput(readline);
                }
            }
            else{
                console.log("\nproduct unavailable\n");
                productInput(readline, productss);
            }
        }
        else if(choice === "0"){
            changeReturn(balance);
            return process.exit(1);
        }
        else{
            console.log("\nwrong choice\n");
            productInput(readline, productss);
        }
    });
}

function changeReturn (change){
    let x = 0;
    let list = [];
    while (x !== change){
        x += 50;
        list.push(5);
        if(x > change){
            x -= 50;
            list.pop();
            x += 20;
            list.push(2);
            if(x > change){
                x -= 20;
                list.pop();
                x += 10;
                list.push(1);
                if(x > change){
                    x -= 10;
                    list.pop();
                    x += 5;
                    list.push(0.5);
                    if(x > change){
                        x -= 5;
                        list.pop();
                        x += 2;
                        list.push(0.2);
                        if(x > change){
                            x -= 2;
                            list.pop();
                            x += 1;
                            list.push(0.1);
                        }
                    }
                }
            }
        }
    }
    for (let i=0; i<=list.length; i++){
        if(list[i] === 5){
            balancee[0].amount --;
        }
        else if(list[i] === 2){
            balancee[1].amount --;
        }
        else if(list[i] === 1){
            balancee[2].amount --;
        }
        else if(list[i] === 0.5){
            balancee[3].amount --;
        }
        else if(list[i] === 0.2){
            balancee[4].amount --;
        }
        else if(list[i] === 0.1){
            balancee[5].amount --;
        }
    }
    console.log("Your Change Back Is:" + list);

    const balanceData = JSON.stringify(balancee);

    const productsData = JSON.stringify(productss);

    fs.writeFileSync('balance.json', balanceData, 'utf8');

    fs.writeFileSync('products.json', productsData, 'utf8');

    return process.exit(1);
}


} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}

moneyInput(initiate());