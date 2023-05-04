const express = require('express')
const app = express();
const cors = require('cors');
require("./db/connect")
const user = require('./db/users.js')
const product = require('./db/products.js')
app.use(express.json())
app.use(cors())

// const getData=async()=>{
//         const data = await user.find();
//         console.log(data);
// }
// getData();

app.post('/register', async (req, res) => {
  const data = new user(req.body);
  const savedData = await data.save()
  console.log(savedData);
  res.send(savedData);
})
app.post('/logIn', async (req, res) => {
  let userData = await user.findOne(req.body).select('-password');
  userData = userData
  if (userData) {
    res.send(userData)
  } else {
    res.send({ result: "No user found" })
  }
})
//Add products
app.post('/add-product', async (req, res) => {
  const storeProduct = new product(req.body)
  const result = await storeProduct.save();
  // console.log(result);
  res.send(result)
})
//Get all products
app.get('/products', async (req, res) => {
  const result = await product.find();
  if (result) {
    res.send(result);
  } else {
    res.send('No Products found')
  }
})
//get data for prefilled in update data page.
app.get('/update-product/:id', async (req, res) => {
  let getResult = await product.findOne({ _id: req.params.id })
  // getResult= await getResult.json()
  if (getResult) {
    res.send(getResult)
  } else {
    res.send('No Result found')
  }
})
//Delete product Api
app.delete('/delete-product/:id', async (req, res) => {

  let result = await product.deleteOne({ _id: req.params.id });
  // result = await result.json()
  res.send(result)
})
//Update product Api
app.put('/update-product/:id', async (req, res) => {
  let result = await product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    }
  )
  res.send(result)

})
app.get('/search-product/:key', async (req, res) => {
  let result = await product.find({
    '$or': [
      { name: { $regex: req.params.key, $options: "i"  } },//$option:"i", (Extra) option for remove case sensitivity of result
      { company: { $regex: req.params.key, $options: "i"  } },//$option:"i", (Extra) option for remove case sensitivity of result

    ]
  })
  res.send(result)
})

app.listen(3000, () => {
  console.log("Listening at port -->", 3000);
})