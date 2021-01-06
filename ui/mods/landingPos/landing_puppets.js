function createSpawnPuppet(puppetName, location,animation,effectsType,color){ //takes in name of unit in file, and contextual info then generates the rest of create puppet
		color.push(0.98)
	
		var chosenUnit;
		var config = [{}];
		
		if(effectsType == "AlliedSpawn" || effectsType == "PlayerSpawnZone"){
			chosenUnit = "/pa/puppets/"+puppetName+"/"+puppetName+".json";
		}
		else{

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
		}
		
		


		$.getJSON("coui://"+chosenUnit).then(function(data){
			
			
			unitJSON = data;
			config[0].model = unitJSON.model;
			if(Array.isArray(config[0].model)){
				config[0].model = config[0].model[0]
			}
			if(effectsType == "PlayerSpawn"){config[0].fx_offsets =  
				
					{
					  "type": "energy",
					  "filename": "/ui/mods/landingPos/comSpawnBeam.pfx",
					  "bone": "boneroot",
					  "offset": [
						0,
						0,
						-10
					  ],
					  "orientation": [
						180,
						0,
						0
					  ]
					}
				delete config[0].model;  
				location.scale = 0.2;
			}
			else if(effectsType == "AlliedSpawn"){config[0].fx_offsets =  
				
				{
					"type": "idle",
					"filename": "/pa/puppets/allied_spawn/allied_spawn.pfx",
					"bone": "boneroot",
				  "offset": [
					0,
					0,
					-30
				  ],
				  "orientation": [
					0,
					0,
					0
				  ]
				}
			  
		}
		else if(effectsType == "PlayerSpawnZone"){config[0].fx_offsets =  
				
			{
				"type": "idle",
				"filename": "/pa/puppets/player_spawn/player_spawn.pfx",
				"bone": "boneroot",
			  "offset": [
				0,
				0,
				-80
			  ],
			  "orientation": [
				180,
				0,
				0
			  ]
			}
		  
	}
			
			if(animation.length>1){config[0].animate = {"anim_name":animation};}
			if(effectsType == "PlayerSpawnZone"){
				location.snap = -50
			}
			config[0].location = location;
			config[0].material = { 
			"shader":"pa_unit_ghost",
			"constants":{
			   "GhostColor":color ,
			   "BuildInfo":[
				  0,
				  0,
				  0,
				  0
			   ]
			},
			"textures":{
			   "Diffuse":"/pa/effects/diffuse.papa"
			}},
			
			console.log("");
		
			console.log("api.getWorldView(0).puppet(JSON.parse("+JSON.stringify(config)+"), false);")
			return api.getWorldView(0).puppet(config, false);
		
		
	});
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
	

	
	var playerSpawn;

	handlers.spawnPlayerPuppet = function(payload) {
		
		payload = JSON.parse(payload);
		var color = payload.color;
		if (color == undefined){color = [0,0,0,0.98]}
		var playerCom = payload.playerCom;
		delete payload.playerCom;
		delete payload.color;
		
		createSpawnPuppet(playerCom,payload,"","",color);//spawns player commander
		
		createSpawnPuppet(playerCom,payload,"","PlayerSpawn",color); //spawns fx for landing beam

		 };



	var isShared = (model.player().slots);
	var land_anywhere = model.gameOptions.land_anywhere();





	var allZones = [];

	handlers.makeAlliedZones = function(payload) { //{"landing_zones":[{"position":[524,-45,0],"planet_index":0,"radius":90}]}
	
	
	payload = JSON.parse(payload);
	var effectName = "AlliedSpawn"
	var model_name = "allied_spawn";
		if(JSON.stringify(payload) == JSON.stringify(playerSpawn)){//if it is the players spawn modify effect and model
			model_name = "player_spawn"
			effectName = "PlayerSpawnZone"



	};
	
	if(Array.isArray(isShared)){

		if (isShared.length>1) {
			return;
		}

	}
	if(land_anywhere){return;}
	

	
	var color = payload[0].color;
	delete payload[0].color;
	

	
	//dulling color
	color[0] = color[0]/4
	color[1] = color[1]/4
	color[2] = color[2]/4
	
	
	
	if (color == undefined){color = [0,0,0,0.98]}
	
	for(var i = 0;i<payload.length;i++){
	
	allZones.push(payload[i])	
	var zoneCenter = {};
	zoneCenter.pos = payload[i].position
	zoneCenter.planet = payload[i].planet_index
	zoneCenter.snap = 50;
	zoneCenter.scale = 2;
	createSpawnPuppet(model_name,zoneCenter,"idle",effectName,color);
	}

	//engine.call('execute', 'landing_zones', JSON.stringify({ landing_zones: allZones}));

		

}
	handlers.playerSpawn = function(payload){

		
		playerSpawn = payload;


	}	 
		

function killPuppets(){ //function set to loop until you land to ensure that there are not leftover puppets after spawning
	
	
	if(model.maxEnergy() > 0){
		
		clearAllPuppets();
		return;
	}
	else{setTimeout(killPuppets, 1000);
	return;}
	
	
	}
(function () {
   

    //starts up killpuppets

    setTimeout(killPuppets, 1000);


})();
