import { ethers } from "ethers";
import fs from "fs/promises";


function CreateRegex(total) {
    const regexList = [];
    for (let index = 0; index < total; index++) {
        // 填充3位数字，比如888
        const paddedIndex = (index + 1).toString().padStart(3, '0');
        const regex = new RegExp(`^0x${paddedIndex}.*$`);
        regexList.push(regex);
    }
    return regexList;
}

async function CreateWallet(regexList) {
    let wallet;
    var isValid = false;

    while (!isValid && regexList.length > 0) {
        wallet = ethers.Wallet.createRandom();
        const index = regexList.findIndex(regex => regex.test(wallet.address));
        // 移除匹配的正则表达式
        if (index !== -1) {
            isValid = true;
            regexList.splice(index, 1);
        }
    }
    const data = `${wallet.address}:${wallet.privateKey}`
    console.log(data);
    return data
}
function RandomWallet() {
    var wallet // 钱包
    const regex = /^0x0.*8$/
    var isValid = false

    while(!isValid){
        wallet = ethers.Wallet.createRandom() // 随机生成钱包
        isValid = regex.test(wallet.address)
    }

    console.log(`靓号地址：${wallet.address}`)
    console.log(`靓号私钥：${wallet.privateKey}`)
}

const start = async () => {
    RandomWallet(); //靓号
};

const start2 = async () => {
    const total = 1;
    const regexL = CreateRegex(total)
    const privateKeys = []

    for (let index = 1; index < total + 1; index++) {
        privateKeys.push(await CreateWallet(regexL))
    }

    await fs.appendFile('seeds.txt', privateKeys.sort().join('\n'));
};

(async () => {
  try {
    // await start();
    await start2();
  } catch (e) {
    console.error(e);
  }
})();