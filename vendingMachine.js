let balance = 0;
let list = [];
let firstLoop = 0;
let secondLoop = 0;
let x = 0;
let valid = [];
const fs = require('fs');

try {

    const data = fs.readFileSync('products.json', 'utf8');
    const products = JSON.parse(data);
    const data2 = fs.readFileSync('balance.json', 'utf8');
    const startingMachineBalance = JSON.parse(data2);

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
                startingMachineBalance.find(x => {
                    if (x.value == coin) {
                        x.amount += 1;
                    }
                });
                coin = getIntCoinValue(coin);
                balance += coin;
                valid.push(coin / 10);
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

    function productInput(readline, products) {
        console.log("\nchoose product\n");
        for (let i = 0; i < products.length; i++) {
            console.log(i + 1 + "." + `${products[i].name}`)
        }
        console.log("0.Exit\n");
        readline.question('INSERT PRODUCT NUMBER\n\n', choice => {

            for (let i = 0; i < products.length; i++) {
                if (choice == i + 1) {
                    console.log("\nyour choice is " + `${products[i].name}` + "\n");
                    if (`${products[i].amount}` > 0) {
                        console.log("product available(" + `${products[i].amount}` + ")\n");
                        console.log("cost:" + `${products[i].cost}` + "\n");
                        let change = balance - `${products[i].cost}` * 10;
                        if (change >= 0 && changeReturn(change)) {
                            console.log("here is your product \n");
                            products[i].amount -= 1;
                            callback(list);
                        }
                        if (change < 0) {
                            console.log("not enough money\n");
                            moneyInput(readline);
                        } else {
                            console.log("Exact Change Only");
                            console.log("Your Coin Back: " + valid);
                            return process.exit(1);
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
            }
        })
    }

    function changeReturn(change) {
        list = [];
        secondLoop = 0;
        firstLoop = 0;
        x = 0;

        while (x !== (Math.floor(change / 10)) * 10) {
            if (x < change && startingMachineBalance[0].amount > 0) {
                x += 50;
                list.push(5);
                startingMachineBalance[0].amount--;
                if (x > change) {
                    x -= 50;
                    list.pop();
                    startingMachineBalance[0].amount++;
                }
                if (x < change && startingMachineBalance[1].amount > 0) {
                    x += 20;
                    list.push(2);
                    startingMachineBalance[1].amount -= 1;
                    if (x > change) {
                        x -= 20;
                        list.pop();
                        startingMachineBalance[1].amount += 1;
                    }
                }
                if (x < change && startingMachineBalance[2].amount > 0) {
                    x += 10;
                    list.push(1);
                    startingMachineBalance[2].amount--;
                    if (x > change) {
                        x -= 10;
                        list.pop();
                        startingMachineBalance[2].amount++;
                    }
                }

                firstLoop++;
                if (firstLoop === 30 && x !== change) {
                    break;
                }
            }
        }
        while (x !== change) {
            if (x < change && startingMachineBalance[3].amount > 0) {
                x += 5;
                list.push(0.5);
                startingMachineBalance[3].amount--;
                if (x > change) {
                    x -= 5;
                    list.pop();
                    startingMachineBalance[3].amount++;
                }
            }
            if (x < change && startingMachineBalance[4].amount > 0) {
                x += 2;
                list.push(0.2);
                startingMachineBalance[4].amount--;
                if (x > change) {
                    x -= 2;
                    list.pop();
                    startingMachineBalance[4].amount++;
                }
            }
            if (x < change && startingMachineBalance[5].amount > 0) {
                x += 1;
                list.push(0.1);
                startingMachineBalance[5].amount--;
                if (x > change) {
                    x -= 1;
                    list.pop();
                    startingMachineBalance[5].amount++;
                }
            }
            secondLoop++;
            if (secondLoop === 30 && x !== change) {
                break;
            }
        }
        if (change === x) {
            return true;
        } else {
            return false;
        }

    }

    function callback(list) {
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