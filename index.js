const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const router = express.Router();

//middlewars
app.use(bodyParser.json());


//Define routes
router.post('/v1/b-trees/height', (req, res)=>{

	const tree = req.body;
	if(!tree){
		res.json({error:'No - data'})
	}
	

	let binaryTreeHelper = [];
	let depht = 0;

	tree.forEach(el=>{
		if(el != 1){

			if((binaryTreeHelper.length!=2 && tree[tree.length - 1] == el)){
				depht++;	
			}


			if(binaryTreeHelper.length == 2){
				binaryTreeHelper = [];
				depht++;
			}else{
				binaryTreeHelper.push(el)
			}
		}	
	})

	res.json({error: null})
})




//Function test, the funcion only works if the 


/*	function height(){
		const tree = [1,2,3,4,5,6,7,8];
	
		let binaryTreeHelper = [];
		let depht = 0;

		tree.forEach(el=>{
			if(el!=1){

				if((binaryTreeHelper.length!=2 && tree[tree.length - 1] == el)){
					depht++;	
				}

				if(binaryTreeHelper.length == 2){
					binaryTreeHelper = [];
					depht++;
				}else{
					binaryTreeHelper.push(el)
				}
			}	
		})
		console.log(depht)
	}




height();

*/

