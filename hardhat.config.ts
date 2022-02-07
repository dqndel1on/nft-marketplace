import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: "0.8.10",
  networks: {
    hardhat: {
      chainId: 1337
    },
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/GsknOKKsLYVoQ9HEe-QuxGX4xOvZa2-T",
      accounts:
        ["0xc857be77df665e7c6280fa57d56ad9cbff2f8997e32c74064f3519530c0c7a5c"],
    },
  }
};

export default config;
