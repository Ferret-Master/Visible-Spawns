function createPuppet(puppetName, location,animation,effectsBool,color){ //takes in name of unit in file, and contextual info then generates the rest of create puppet
		color.push(0.98)
		puppetName+=".json";
		var chosenUnit;
		var config = [{}];
		unitKeys = _.keys(model.unitSpecs);
		
		//console.log(unitKeys.length)
		for(var i = 0;i<unitKeys.length;i++){
			
			//console.log(unitKeys[i])
			if(unitKeys[i].endsWith(puppetName)){
				//console.log(_.keys(model.unitSpecs[unitKeys[i]]))
				chosenUnit = unitKeys[i];
				console.log(chosenUnit)
			}
		}
		$.getJSON("coui://"+chosenUnit).then(function(data){
			
			
			unitJSON = data;
			//console.log(unitJSON);
			var animList = _.keys(unitJSON.model.animations);
			if(effectsBool = true){config[0].fx_offsets =  
				
					{
					  "type": "energy",
					  "filename": "/pa/units/orbital/delta_v_engine/delta_v_jet.pfx",
					  "offset": [
						0,
						0,
						-10
					  ],
					  "orientation": [
						0,
						180,
						0
					  ]
					}
				  
			}
			config[0].model = unitJSON.model;
			if(animation.length>1){config[0].animate = {"anim_name":animation};}
			config[0].location = location;
			config[0].material = { 
			"shader":"pa_unit_ghost",
			"constants":{
			   "GhostColor":color ,
			   "BuildInfo":[
				  0,
				  10,
				  0,
				  0
			   ]
			},
			"textures":{
			   "Diffuse":"/pa/effects/diffuse.papa"
			}},
			
			console.log(config);
			console.log(JSON.stringify(config));
		
			return api.getWorldView(0).puppet(config, false);
		
		
	});
	}
	//pre set command bot_tesla, preset location,"anime_walk"
	// pre set locations for testing
	


	
	//---------------------------------Modified Move Puppet-------------------------------


	
	function movePuppet(puppetid,puppetlocation,duration){//note effects break on scale change

		api.getWorldView(0).movePuppet(puppetid,puppetlocation,duration,false);
	}

	//something I would like to have is the ability to have a puppet change animations when moving. with current api that means replacing the puppet and destroying the old one
	//from this just thought of a method that makes this all easier. animatePuppet will create a new puppet that is a copy of previous but with different animation
	//it will destroy the old puppet and return a new puppetid
	
	function animatePuppet(puppetid,anim_name){ //works but careful with all functions that use puppetids, a non existing id crashed
		try{
		getPuppet(puppetid).then(function(data){
			
			var config = [{}];

			config[0].model = data.model;
			config[0].animate = {"anim_name":anim_name};
			config[0].location = data.location;
			config[0].material = data.material;
			//console.log(config);
			//console.log(JSON.stringify(config));
		killPuppet(puppetid);
		id = api.getWorldView(0).puppet(config, false)
		return id;
			
		

		})


		
	}
	catch(err){console.log(err)}}


	function cyclePuppet(puppetid,animationList,animPosition,interval){//used in create puppet if the user wants the puppet to cycle through its animations every set interval
		//check if puppet exists first
		try{
		animatePuppet(puppetid,animationList[animPosition]).then(function(data){
			
			if(animPosition+1<animationList.length){
				animPosition+=1;


			}
			else{
				animPosition = 0;
			}
			_.delay(cyclePuppet(data,animationList,animPosition,interval),interval*1000);
		
		
		})

	}
	catch(err){console.log(err)}
}

	//--------------------------readability functions------------------------------------
	//all these do is make it so I can call one function without worrying about api, allows for additional features in future as well.
	function killPuppet(puppetid){

		api.getWorldView(0).unPuppet(puppetid);
	}

	function clearAllPuppets(){ 
		
		api.getWorldView(0).clearPuppets();
	}

	function getPuppet(puppetid){

		return api.getWorldView(0).getPuppet(puppetid);
	}

	function getPuppets(){

		return api.getWorldView(0).getAllPuppets();
	}
	

	
	handlers.spawnPuppet = function(payload) {
		
		payload = JSON.parse(payload);
		var color = payload.color;
		if (color == undefined){color = [0,0,0,0.98]}
		delete payload.color;
		
		createPuppet("titan_bot",payload,"",false,color);


		 };

function killPuppets(){
	
	
	if(model.maxEnergy() > 0){
		
		clearAllPuppets();
		return;
	}
	else{setTimeout(killPuppets, 1000);
	return;}
	
	
	}
(function () {
   

    //update every second

    setTimeout(killPuppets, 1000);


})();
