let balance = 0;
const fs = require('fs');

try {

    function getMachineBalance(balances) {
        let machineBalance = 0;

        for (let balance of balances) {
            machineBalance += balance.amount * getIntCoinValue(balance.value);
        }
        return machineBalance;
    }

    const data = fs.readFileSync('products.json', 'utf8');
    const products = JSON.parse(data);
    const data2 = fs.readFileSync('balance.json', 'utf8');
    const startingMachineBalance = JSON.parse(data2);
    let machineBalance = getMachineBalance(startingMachineBalance);

    function initiate() {
        return require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    function getIntCoinValue(coin) {
        switch (coin) {
            case '0.1':
                return 1;
            case '0.2':
                return 2;
            case '0.5':
                return 5;
            case '1':
                return 10;
            case '2':
                return 20;
            case '5':
                return 50;
        }
    }

    function isAllowCoin(coin) {
        return coin === "5" || coin === "2" || coin === "1" || coin === "0.5" || coin === "0.2" || coin === "0.1";
    }

    function isNotAllowCoin(coin) {
        return coin === "0.05" || coin === "0.02" || coin === "0.01";
    }

    function moneyInput(readline) {
        readline.question('\nINSERT COIN or type "product" to choose\n\n', coin => {
            if (isNotAllowCoin(coin)) {
                console.log("\nValue Too Low\n");
                console.log("Here Is Your Coin Back:" + coin);
                moneyInput(readline);
            } else if (isAllowCoin(coin)) {
                startingMachineBalance.find(x => { if (x.value == coin) { x.amount += 1; } });
                coin = getIntCoinValue(coin);
                balance += coin;
                console.log("\nYour balance:" + balance / 10);
                moneyInput(readline);
            } else if (coin === "product") {
                productInput(readline, products);
            } else {
                console.log("\nInvalid Coin Value");
                moneyInput(readline);
            }
        });
    }
    // ---------------------------------------------

    function productInput(readline, products) {
        console.log("\nchoose product\n");
        for (let i = 0; i < products.length; i++) {
            console.log(i + 1 + "." + `${products[i].name}`)
        }
        console.log("0.Exit\n");
        readline.question('INSERT PRODUCT NUMBER\n\n', choice => {

            if (choice === "1") {
                if (machineBalance - `${products[0].cost}` < 0) {
                    console.log("Exact Change Only");
                    changeReturn(balance);
                    return process.exit(1);
                }
                console.log("\nyour choice is cola\n");
                if (`${products[0].amount}` > 0) {
                    console.log("product available(" + `${products[0].amount}` + ")\n");
                    console.log("cost:" + `${products[0].cost}` + "\n");
                    let change = balance - `${products[0].cost}` * 10;
                    if (change >= 0) {
                        console.log("here is your product \n");
                        products[0].amount -= 1;
                        changeReturn(change);
                    }
                    if (change < 0) {
                        console.log("not enough money\n");
                        moneyInput(readline);
                    }
                } else {
                    console.log("\nproduct unavailable\n");
                    productInput(readline, products);
                }
            } else if (choice === "2") {
                if (machineBalance - `${products[1].cost}` < 0) {
                    console.log("Exact Change Only");
                    changeReturn(balance);
                    return process.exit(1);
                }
                console.log("\nyour choice is chips\n");
                if (`${products[1].amount}` > 0) {
                    console.log("product available(" + `${products[1].amount}` + ")\n");
                    console.log("cost:" + `${products[1].cost}` + "\n");
                    let change = balance - `${products[1].cost}` * 10;
                    console.log(change);
                    if (change >= 0) {
                        console.log("here is your product \n");
                        products[1].amount -= 1;
                        changeReturn(change);
                    }
                    if (change < 0) {
                        console.log("not enough money \n");
                        moneyInput(readline);
                    }
                } else {
                    console.log("\nproduct unavailable \n");
                    productInput(readline, products);
                }
            } else if (choice === "3") {
                if (machineBalance - `${products[2].cost}` < 0) {
                    console.log("Exact Change Only");
                    changeReturn(balance);
                    return process.exit(1);
                }
                console.log("\nyour choice is candy\n");
                if (`${products[2].amount}` > 0) {
                    console.log("product available(" + `${products[2].amount}` + ")\n");
                    console.log("cost:" + `${products[2].cost}` + "\n");
                    let change = balance - `${products[2].cost}` * 10;
                    if (change >= 0) {
                        console.log("here is your product\n");
                        products[2].amount -= 1;
                        changeReturn(change);
                    }
                    if (change < 0) {
                        console.log("not enough money\n");
                        moneyInput(readline);
                    }
                } else {
                    console.log("\nproduct unavailable\n");
                    productInput(readline, products);
                }
            } else if (choice === "0") {
                changeReturn(balance);
                return process.exit(1);
            } else {
                console.log("\nwrong choice\n");
                productInput(readline, products);
            }
        });
    }

    function changeReturn(change) {
        let x = 0;
        let list = [];
        while (x !== change) {
            x += 50;
            list.push(5);
            if (x > change) {
                x -= 50;
                list.pop();
                x += 20;
                list.push(2);
                if (x > change) {
                    x -= 20;
                    list.pop();
                    x += 10;
                    list.push(1);
                    if (x > change) {
                        x -= 10;
                        list.pop();
                        x += 5;
                        list.push(0.5);
                        if (x > change) {
                            x -= 5;
                            list.pop();
                            x += 2;
                            list.push(0.2);
                            if (x > change) {
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

        function reduceCoinAmount(list) {
            for (let i = 0; i <= list.length; i++) {
                switch (list[i]) {
                    case 0.1:
                        startingMachineBalance.find(x => {
                            if (x.value === list[i]) {
                                x.amount -= 1;
                            }
                        });
                        break;
                    case 0.2:
                        startingMachineBalance.find(x => {
                            if (x.value === list[i]) {
                                x.amount -= 1;
                            }
                        });
                        break;
                    case 0.5:
                        startingMachineBalance.find(x => {
                            if (x.value === list[i]) {
                                x.amount -= 1;
                            }
                        });
                        break;
                    case 1:
                        startingMachineBalance.find(x => {
                            if (x.value === list[i]) {
                                x.amount -= 1;
                            }
                        });
                        break;
                    case 2:
                        startingMachineBalance.find(x => {
                            if (x.value === list[i]) {
                                x.amount -= 1;
                            }
                        });
                        break;
                    case 5:
                        startingMachineBalance.find(x => {
                            if (x.value === list[i]) {
                                x.amount -= 1;
                            }
                        });
                        break;
                }
            }
        }

        reduceCoinAmount(list);

        console.log("Your Change Back Is:" + list);

        const balanceData = JSON.stringify(startingMachineBalance);

        const productsData = JSON.stringify(products);

        fs.writeFileSync('balance.json', balanceData, 'utf8');

        fs.writeFileSync('products.json', productsData, 'utf8');

        return process.exit(1);
    }


} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}

moneyInput(initiate());