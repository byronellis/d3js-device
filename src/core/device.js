d3dev.device = function(myid) {
	if(!d3dev.device.id) d3dev.device.id = 0;
	
	//Assign each device we create a device id so we can easily select it later
	var id = myid || "d3-device-"+(d3dev.device.id++);
	
	function device(g) {
		//Create a skeleton for this device
	}
	return device;
}