import { ethers } from 'ethers'
import { defineStore, acceptHMRUpdate } from 'pinia'
import TodoList from '~/utils/TodoList.json'

export const useWeb3Store = defineStore('web3Store', {
  state: () => ({
    account: null as string | null,
    error: null as string | null,
    isCorrectNetwork: true,
    isLoading: false,
    lists: null as string[] | null,
    todos: null as {id: number; text: string; done: boolean}[] | null,
    contractAddress: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9'
  }),

  actions: {
    async connect(connect: boolean) {
      try {
        const { ethereum } = window
        if (!ethereum) {
          this.error = 'Metamask not installed!'
          return
        }
        if (!(await this.checkIfisAlreadyConnected()) && connect) await this.requestAccess()
        await this.checkIsCorrectNetwork()
        await this.getLists()
        await this.setupEventListeners()
      }
      catch (error) {
        this.error = 'Account request refused'
      }
    },
    async checkIfisAlreadyConnected() {
      const { ethereum } = window
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length !== 0) {
        this.account = accounts[0]
        return true
      }
      else {
        return false
      }
    },
    async requestAccess() {
      const { ethereum } = window
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      this.account = accounts[0]
    },
    async checkIsCorrectNetwork() {
      const { ethereum } = window
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      const hardhatChainId = import.meta.env.VITE_APP_CHAIN_ID
      if (chainId !== hardhatChainId) {
        // if (!(await this.switchNetwork()))
        //   this.error = 'You are not connected to Hardhat network!'
        this.isCorrectNetwork = false
      }
    },
    async switchNetwork() {
      const { ethereum } = window
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: import.meta.env.VITE_APP_CHAIN_ID }],
        })
        this.isCorrectNetwork = true
        return true
      }
      catch (switchError) {
        return false
      }
    },
    async setupEventListeners() {
      const { ethereum } = window
      ethereum.on('accountsChanged', async() => {
        window.location.reload()
      })
      ethereum.on('chainChanged', async() => {
        await this.checkIsCorrectNetwork()
      })
    },
    async getContract() {
      try {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const connectedContract = new ethers.Contract(
        this.contractAddress,
        TodoList.abi,
        signer
      )
      return connectedContract
      } catch (error) {
        console.log(error)
        console.log('connected contract not found')
        return null
      }
    },
    async addList(listName: string) {
      try {
        const connectedContract = await this.getContract()
        const addListTxn = await connectedContract?.addList(listName)
        await addListTxn.wait()
      } catch (error) {
        console.log(error)
      } 
    },
    async getLists() {
      try {
        const connectedContract = await this.getContract()
        const getListsTx = await connectedContract?.getLists()
        this.lists = getListsTx
      } catch(error) {
        console.log(error)
      }
    }
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWeb3Store, import.meta.hot))
