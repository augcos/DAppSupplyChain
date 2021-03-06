// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.utils.toWei("1", "ether")
    const payment = web3.utils.toWei("2", "ether")
    var itemState = 0
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Harvested()
        await supplyChain.contract.events.Harvested((err, res) => {
            eventEmitted = true
        })

        // Add originFarmerID in FarmerRole
        await supplyChain.addFarmer(originFarmerID)
        // Mark an item as Harvested by calling function harvestItem()
        await supplyChain.harvestItem(upc, originFarmerID, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes, {from: originFarmerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        const resultBufferThree = await supplyChain.fetchItemBufferThree.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferTwo[0], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferTwo[1], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferTwo[2], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferTwo[3], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferTwo[4], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(resultBufferThree[3], 0, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')    
    })  
    
    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        
        // Watch the emitted event Processed()
        await supplyChain.contract.events.Processed((err, res) => {
            eventEmitted = true
        })
        

        // Mark an item as Processed by calling function processtItem()
        await supplyChain.processItem(upc, {from: originFarmerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferThree = await supplyChain.fetchItemBufferThree.call(upc)
        

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferThree[3], 1, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')      
    })    
    
    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        
        // Watch the emitted event Packed()
        await supplyChain.contract.events.Packed((err, res) => {
            eventEmitted = true
        })
        

        // Mark an item as Packed by calling function packItem()
        await supplyChain.packItem(upc, {from: originFarmerID})

        // Retrieve the item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferThree = await supplyChain.fetchItemBufferThree.call(upc)
        

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferThree[3], 2, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')   
    })    

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        
        // Watch the emitted event ForSale()
        await supplyChain.contract.events.ForSale((err, res) => {
            eventEmitted = true
        })
        

        // Mark an item as Sold by calling function sellItem()
        await supplyChain.sellItem(upc, productPrice, {from: originFarmerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferThree = await supplyChain.fetchItemBufferThree.call(upc)
        

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferThree[2], productPrice, 'Error: Invalid product price')
        assert.equal(resultBufferThree[3], 3, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')    
    })    

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        
        // Watch the emitted event Sold()
        await supplyChain.contract.events.Sold((err, res) => {
            eventEmitted = true
        })
        

        // Add distributorID in DistributorRole
        await supplyChain.addDistributor(distributorID)
        // Mark an item as Sold by calling function buyItem()
        await supplyChain.buyItem(upc, {from: distributorID, value: payment})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferThree = await supplyChain.fetchItemBufferThree.call(upc)
        

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], distributorID, 'Error: Invalid ownerID')
        assert.equal(resultBufferThree[2], productPrice, 'Error: Invalid product price')
        assert.equal(resultBufferThree[3], 4, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')          
    })    

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        
        // Watch the emitted event Shipped()
        await supplyChain.contract.events.Shipped((err, res) => {
            eventEmitted = true
        })
        

        // Mark an item as Shipped by calling function shipItem()
        await supplyChain.shipItem(upc, {from: distributorID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferThree = await supplyChain.fetchItemBufferThree.call(upc)
        

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferThree[3], 5, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')   
    })    

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        
        // Watch the emitted event Received()
        await supplyChain.contract.events.Received((err, res) => {
            eventEmitted = true
        })
        


        // Add retailerID in RetailerRole
        await supplyChain.addRetailer(retailerID)
        // Mark an item as Received by calling function receiveItem()
        await supplyChain.receiveItem(upc, {from: retailerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferThree = await supplyChain.fetchItemBufferThree.call(upc)
        

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], retailerID, 'Error: Invalid ownerID')
        assert.equal(resultBufferThree[3], 6, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')            
    })    

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        
        // Watch the emitted event Purchased()
        await supplyChain.contract.events.Purchased((err, res) => {
            eventEmitted = true
        })
        

        // Add consumerID in ConsumerRole
        await supplyChain.addConsumer(consumerID)
        // Mark an item as Purchased by calling function purchaseItem()
        await supplyChain.purchaseItem(upc, {from: consumerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferThree = await supplyChain.fetchItemBufferThree.call(upc)
        

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Invalid ownerID')
        assert.equal(resultBufferThree[3], 7, 'Error: Invalid item State')
        assert.equal(eventEmitted, true, 'Invalid event emitted')          
    })    

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        
        
        // Verify the result set:
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], consumerID, 'Error: Invalid ownerID')
        
    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        
        
        // Verify the result set:
        assert.equal(resultBufferTwo[0], originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(resultBufferTwo[1], originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(resultBufferTwo[2], originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(resultBufferTwo[3], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(resultBufferTwo[4], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        
    })

    // 11th Test
    it("Testing smart contract function fetchItemBufferThree() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferThree = await supplyChain.fetchItemBufferThree.call(upc)
        
        
        // Verify the result set:
        assert.equal(resultBufferThree[0], productID, 'Error: Invalid productID')
        assert.equal(resultBufferThree[1], productNotes, 'Error: Invalid productNotes')
        assert.equal(resultBufferThree[2], productPrice, 'Error: Invalid productPrice')
        assert.equal(resultBufferThree[3], 7, 'Error: Invalid itemState')
        assert.equal(resultBufferThree[4], distributorID, 'Error: Invalid distributorID')
        assert.equal(resultBufferThree[5], retailerID, 'Error: Invalid retailerID')
        assert.equal(resultBufferThree[6], consumerID, 'Error: Invalid consumerID')
        
    })
});

