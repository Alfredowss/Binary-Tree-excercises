const express = require('express'); 
const router = express.Router();
const {Tree} = require('../utils/Tree')

//Define routes

router.get('/', (req, res)=>{
	res.render('index', {title: "Hey", message:"this works"})
})



router.post('/v1/b-trees/height', (req, res)=>{
	const data = req.body["toTree"];

	if(!data || data.length == 0 || !Array.isArray(data)){
		res.json({error:'No - data'})
	}else{
		let tree = new Tree(data);
		let height = tree.calculateHeight()

		res.json({height})
	}
})

router.post('/v1/b-trees/neighbors', (req, res)=>{
	
	const data = req.body["toTree"];
	const node = req.body["node"]; 

	if(data && node && data.length!=0 && Array.isArray(data) && Number.isInteger(node)){
		let tree = new Tree(data)
		let depth = tree.searchNode(node);
		let neighbors = tree.neighborsNodes(depth)		
		let positionOfNodes = tree.positionNodes(neighbors, node)
		res.json({ neighbors: positionOfNodes })
	}else{
		res.json({error:'No - data'})
	}

})


router.post('/v1/b-trees/bfs', (req, res)=>{
	const data = req.body["toTree"];
	if(!data || data.length==0 || !Array.isArray(data)){
		res.json({error: 'No - data'})
	}else{
		let tree = new Tree(data) 
		let nodeAccess = tree.BFSearch()
		res.json({bfs: nodeAccess})
	}
})


module.exports = {
	router
}
