import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/components/Layout/Layout'
import { useAccount, useProvider } from 'wagmi'
import { Text, Flex, Button } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractAddress, abi } from "../public/constants"
import Link from 'next/link';


export default function Collection() {

  const { address, isConnected } = useAccount()
  const provider = useProvider()

  const [iceNumber, setIceNumber] = useState(null)
  const [FireNumber, setFireNumber] = useState(null)


  useEffect(() => {
    if (isConnected) {
      setInfo(0)
      setInfo(1)
    }
  }, [address]);

  const setInfo = async (id) => {
    const contract = new ethers.Contract(contractAddress, abi, provider)
    let smartContractValue = await contract.balanceOf(address, id)
    if (id === 0)
      setIceNumber(smartContractValue.toString())
    if (id === 1)
      setFireNumber(smartContractValue.toString())
  }

  return (
    <>
      <Head>
        <title>Punk Hazard Land : Collection</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {isConnected ? (
          <Flex alignItems="center">
            {/* <Button colorScheme='blue' onClick={() => collection(0)}>Number of your Ice Land</Button> */}
            {iceNumber > 0 ? (
              <div align="center" style={{ margin: 10 }}>
                <Image src="/img0.jpg" alt="img" width={400} height={400} style={{ margin: 10 }} />
                <Text ml="1rem">You have {iceNumber} Ice Land</Text>
              </div>
            ) : (
              <div>
                <Text ml="1rem">You don't have any Ice Land</Text>
                <Button><Link href="/mint">Mint a Land here!</Link></Button>
              </div>
            )}
            {FireNumber > 0 ? (
              <div align="center" style={{ margin: 10 }}>
                <Image src="/img1.jpg" alt="img" width={400} height={400} style={{ margin: 10 }} />
                <Text ml="1rem">You have {FireNumber} Fire Land</Text>
              </div>
            ) : (
              <div>
                <Text ml="1rem">You don't have any Fire Land</Text>
                <Button><Link href="/mint">Mint a Land here!</Link></Button>
              </div>
            )}
          </Flex>
        ) : (
          <Alert status='warning' width="50%">
            <AlertIcon />
            Please, connect your Wallet!
          </Alert>
        )}
      </Layout>
    </>
  )
}
