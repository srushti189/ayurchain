import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AyurChainModule = buildModule("AyurChainModule", (m) => {
  const ayurChain = m.contract("AyurChain");
  return { ayurChain };
});

export default AyurChainModule;