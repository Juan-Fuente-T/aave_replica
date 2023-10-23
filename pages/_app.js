import { useState } from 'react';
import '../styles/globals.css'
import '../styles/_app.css'
import abi from '../abi.json';
import { createPublicClient, http, createWalletClient } from 'viem';
import { PrivateKeyToAccount, privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';
import { sepolia } from 'viem/chains';
import { background } from '@chakra-ui/react';
import { color } from 'framer-motion';
//import { estimateFeesPerGas } from 'viem/_types/actions/public/estimateFeesPerGas';
//import { useEditable } from '@chakra-ui/react';

export default function AaveCopia() {

  const [_deposit, setDeposit] = useState('0');
  const [balance, setBalance] = useState('0');
  const [blockNumber, setBlockNumber] = useState('0');
  const [estimateFeesPerGas, setEstimateFeesPerGas] = useState('0');
  const [price, setPrice] = useState('0');
  const client = createPublicClient({
    chain:sepolia,
    transport: http(),
  })
  const wallet = createWalletClient ({
    chain:sepolia,
    transport: http(),
    //const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80') 
    //account: privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80')
    account: privateKeyToAccount('0xc45f85a5ec0d4bd6c655c9fc2c505c3b6576a9d81e73635f77deb457aa68f3d9')
  })
  async function hasHechoClick() {
    //let balance = await client.getBalance();
    let blockNum  = await client.getBlockNumber();
    let estimateFees_Per_Gas = await client.getGasPrice();
    let result = await client.readContract({
      address:'0x97c6f93ae8C03bFFc6262c9F4914c26F9Ef26f42',
      functionName:'getPrice',
      abi: abi
    });
    let balance = await client.readContract({
      address:'0x97c6f93ae8C03bFFc6262c9F4914c26F9Ef26f42',
      abi: abi,
      functionName:'balanceOf',
      args: ['0xe67F18c5064f12470Efc943798236edF45CF3Afb']
    });
    try{
      let _deposit = await wallet.writeContract({
      address:'0x97c6f93ae8C03bFFc6262c9F4914c26F9Ef26f42',
      abi: abi,
      functionName:'deposit',
      args: ['0.000001']
    });
  }catch (error){
    console.log(error)
  }
    
    console.log("Result", result.toString());
    //let transactionCountlet = await client.getTransactionCount();
    console.log("Hola");
    //console.log("Balance", balance);
    //console.log("TransactionCount", transactionCount);
    console.log("BlockNumber", blockNumber);
    console.log("Balance", balance);
    setBlockNumber(blockNum.toString());
    setEstimateFeesPerGas(estimateFees_Per_Gas.toString());
    setPrice(result.toString());
    setBalance(balance.toString());
    setDeposit(_deposit.toString());
  }
  
  async function deposit(){
    let blockNumber  = await client.getBlockNumber();
    //console.log("Deposit");
    //console.log("BlockNumber", blockNumber);
  }
  async function withdraw(){
    let blockNumber  = await client.getBlockNumber();
    //console.log("Withdraw");
   //console.log("BlockNumber", blockNumber);
  }
  async function borrow(){
    let blockNumber  = await client.getBlockNumber();
    //console.log("Borrow");
    //console.log("BlockNumber", blockNumber);
  }
  

async function repay(){
  let blockNumber  = await client.getBlockNumber();
    //console.log("Repay");
    //console.log("BlockNumber", blockNumber);

  }

  return (
    <div className='main_container'>
      <div className='boton_loco'>
      <button  onClick={hasHechoClick}>Hola</button>
      <h2>Block {blockNumber}</h2>
      <h2>Gas {estimateFeesPerGas}</h2>
      <h2>Price {price / 10**18}</h2>
      <h2>Balance {balance}</h2>
      <h2>Deposit {_deposit}</h2>
      </div>

      <h1 className='main_title'> AAVE REPLICA</h1>
      <div className='assets_container'>
        <div>
            
            <h2>ASSSETS</h2>
        </div>
        
        <div className='assets_titles_borrow'>
              <h3>Assets to supply</h3>
              <h3>Supply</h3>
              
        </div>
        
        <div className ='internal_assets_container' >
          <div className='borrow_title'>
            <h3>Assets</h3>
            
          </div>
          <div className='row_container'>
          <div className='assets_row'>
            <p className='paragraph1'>ETH </p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          <div className='assets_row'>
            <p className='paragraph1'>BTC </p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          <div className='assets_row'>
            <p className='paragraph1'>LINK</p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          <div className='assets_row'>
            <p className='paragraph1'>USDT</p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          <div className='assets_row'>
            <p className='paragraph1'>ADA </p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          </div>
        </div>


      <div className='assets_container'>
        <div>
            <h2>BORROW</h2>
        </div>
        
        <div className='assets_titles_borrow'>
              <h3>Assets to borrow</h3>
              <h3>Your borrows</h3>
              
        </div>
        <div className ='internal_assets_container' >
          <div className='borrow_title'>
            <h3>Borrows</h3>
            
          </div>
          <div className='row_container'>
          <div className='assets_row'>
            <p className='paragraph1'>ETH </p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          <div className='assets_row'>
            <p className='paragraph1'>BTC </p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          <div className='assets_row'>
            <p className='paragraph1'>LINK</p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          <div className='assets_row'>
            <p className='paragraph1'>USDT</p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          <div className='assets_row'>
            <p className='paragraph1'>ADA </p>
            <p className='paragraph2'>...eth</p>
            <button className='transaction_button'onClick ={borrow()}>Deposit</button>
            <button className='transaction_button'onClick ={repay()}>Withdraw</button>
          </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  );
  //return <Component {...pageProps} />
}

//export default AaveCopia
