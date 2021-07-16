const endPoints = {
	0: '/v1/b-trees/height',
	1: '/v1/b-trees/neighbors',
	2: '/v1/b-trees/bfs'
}


let select = document.getElementById('endPoint');
let button = document.getElementById('button');
let tree  = document.getElementById('tree');
let error = document.getElementById('error');
let nodeContainer = document.getElementById('node-container');
let node = document.getElementById('node');
let responseContainer = document.getElementById('responseContainer');
let responseVisualization = document.getElementById('responseVisualization');

//state
let url = endPoints[0];
let index = 0

//handleChangeOfSelect
select.addEventListener('change', function(event){
	url = endPoints[event.target.selectedIndex];
	index = event.target.selectedIndex;
	if(index!=1){
		if(!nodeContainer.classList.contains('d-none')){
			nodeContainer.classList.add('d-none');
		}
	}
	if(index == 1){
		nodeContainer.classList.remove('d-none');
	}
})





//handleEventButton
button.addEventListener('click', function(event){

	if(!error.classList.contains('d-none')){
		error.classList.add('d-none')
	}

	let data = tree.value;
	let isNAN = false;  
	//clean first and last white spaces
	if(data[data.length - 1] == ' '){
		data = data.substring(0, data.length - 1)	
	}
	
	if(data[0] == ' '){
		data = data.substring(1)	
	}

	//convert to Array or to integer, this for errors in split method, when only have one element
    	if(data.length == 1){
		data = data.split('')
	}else{
		data = data.split(' ')
	}	
	
	data = data.map(el=>{
		let number = parseInt(el)
		return number;
	})

	data.forEach(number=>{
		if(isNaN(number)){
			isNAN = true;
		}	
	})

	if(isNAN){
		error.classList.remove('d-none');
	}else{

		//check if the data is for the second url, that url needs node option
		if(index==1){
			if(!isNaN(parseInt(node.value))){
				data = {
					"toTree": data,
					"node": parseInt(node.value)
				}
			}else{
				alert('Error en el nodo a buscar, verifica si es numero, sin espacios')
			}
		}else{

			data = {
				"toTree": data
			};
		}


		fetch(url, {method: 'POST', 
			body: JSON.stringify(data),
			headers: {
      				'Content-Type': 'application/json'
			}
		}).then(res=>{
			return res.json()
		}).then(data=>{
			let text = JSON.stringify(data);
			console.log(text)
			text = document.createTextNode(text);
			//remove responses anteriores
			console.log(responseVisualization.hasChildNodes(), responseVisualization.lastChild)
			
			if(responseVisualization.hasChildNodes()){
				responseVisualization.removeChild(responseVisualization.lastChild)
			}
			responseVisualization.appendChild(text)

			if(responseContainer.classList.contains('d-none')){
				responseContainer.classList.remove('d-none');
			}
		})
	}

})
