
const {Node} = require('./Node')

class Tree{

	constructor(data = null){
		this.buildTree(data);		
	}

	buildTree(data){
		if(data == null || data == []){
			throw new Error("Empty Data")
		}

		//Extract root node
		this.root = new Node(data.shift());

		data.forEach(el=>{
			//
			let nextNode = this.root;
			let node = new Node(el);		

			while(nextNode!=null){
				if(nextNode.value < node.value || nextNode.value == node.value){

					if(nextNode.rightNode!=null){
						nextNode = nextNode.rightNode;					
					}else{
						nextNode.rightNode = node;
						nextNode = null;
					}

				}else{

					if(nextNode.leftNode!=null){
						nextNode = nextNode.leftNode;
					}else{
						nextNode.leftNode = node;
						nextNode = null;
					}
				}
			}					
		})
	}

	calculateHeight(node = this.root){
		
		if(node == null){
			return 0;
		}else{
			let lDepht = this.calculateHeight(node.leftNode); 	
			let rDepht = this.calculateHeight(node.rightNode); 	
			
			if(lDepht > rDepht){
				return (lDepht + 1)
			}else{
				return(rDepht + 1)
			}
		}
	}


	calculateDepth(){
		const TotalNodes = this.calculateHeight() - 1;
		return TotalNodes
	}


	searchNode(node){
		let nextNode = this.root;
		let depth = 1;
		while(nextNode.value!=node || nextNode!=null){
			if(node == nextNode.value){
				return depth;
			}
			if(node < nextNode.value){
				if(nextNode.leftNode!=null){
					nextNode = nextNode.leftNode;
					depth++;
					continue;
				}else{
					nextNode = null;
				}
			}
			if(node >= nextNode.value){
				if(nextNode.rightNode!=null){
					nextNode = nextNode.rightNode;
					depth++;
				}else{
					nextNode = null;
				}
			}
		}
	}
	neighborsNodes(depth, node = this.root, neighbors = []){
		if(node==null && depth!=1){
			return	
		}

		if(depth == 1 && node!=null){
			neighbors.push(node.value)	
			return neighbors;
		}

		if(depth!=1 && node!=null){
			this.neighborsNodes(depth - 1, node.rightNode, neighbors);	
			this.neighborsNodes(depth - 1, node.leftNode, neighbors);	
			//return the neightbors
			return neighbors; 
		}
	}

	BFSearch(nextNode = this.root, nodeAccess = []){
		if(nextNode!=null){
			nodeAccess.push(nextNode.value);
			this.BFSearch(nextNode.leftNode, nodeAccess);
			this.BFSearch(nextNode.rightNode, nodeAccess);
			return nodeAccess;
		}else{
			return
		}
	}


	positionNodes(neighbors, node){
		let result = {
			"right": 0,
			"left": 0
		}	
		neighbors.forEach((el)=>{
			if(el<node){
				result.left+=1;	
			}else if(el>node && el!=node){
				result.right+=1;
			}
		})

		return result;
	}

}



module.exports = {
	Tree
}

