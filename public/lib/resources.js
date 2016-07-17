var Resources = {
	toLoad: [],
	loaded: [],
	require: function(path) {
		var i = this.toLoad.length;
		this.toLoad.push(path);
		this.loaded.push({path: "", data: ""});
		return this.loaded[i];
		//return i;

	},
	load: function() {
		var self = this;
		Utils.File.loadFiles(self.toLoad, function(loaded) {
			for(var i = 0; i < loaded.length; ++i) {
				self.loaded[i].path = self.toLoad[i];
				self.loaded[i].data = loaded[i];
			}
			self.oncomplete(self.loaded);
		});
	},
	//Callbacks
	oncomplete: function() {},
}