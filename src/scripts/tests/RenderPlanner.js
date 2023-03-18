export class RenderPlanner {
	constructor(jobCount, scene, backgroundColor, width, height) {

		this.jobCount = jobCount;
		this.scene = scene;
		this.backgroundColor = backgroundColor;
		this.width = width;
		this.height = height;
		this.running = false;
		this.completedJobs = 0;
		this.onUpdateReceived = function(sectionStart, sectionHeight, buf8) { };
		this.serializeScene();
		this.workers = [];
		for (var i = 0; i < this.jobCount; i++) {
			this.workers.push(new Worker("../src/RenderWorker.js", { type: "module" }));
		}
	}

	initialize() {
		for (var i = 0; i < this.workers.length; i++) {
			this.prepareWorker(i, this.workers[i]);
		}
	}

	start() {
		this.running = true;
		this.completedJobs = 0;
		for (var i = 0; i < this.workers.length; i++) {
			this.startWorker(this.workers[i]);
		}

	}

	serializeScene() {
		this.serializedElements = [];
		var elements = this.scene.getElements();
		for (var i = 0; i < elements.length; i++) {
			var el = elements[i];
			this.serializedElements.push(el.serialize());
		}
	}

	prepareWorker(index, rendererWorker) {
		rendererWorker.postMessage({
			"action": "elements",
			"data": this.serializedElements
		});
		rendererWorker.postMessage({
			"action": "backgroundColor",
			"data": [this.backgroundColor.x, this.backgroundColor.y, this.backgroundColor.z]
		});
		var sectionHeight = Math.floor(this.height / this.jobCount);
		var sectionStart = Math.floor(index * sectionHeight);
		rendererWorker.postMessage({
			"action": "dimensions",
			"data": [this.width, this.height, sectionStart, sectionHeight]
		});
		rendererWorker.onmessage = function(e) {
			var action = e.data.action;
			var data = e.data.data;
			if (action == "result") {
				this.completedJobs++;
				if (this.completedJobs == this.jobCount) {
					this.running = false;
				}
				var buf8 = data;
				this.onUpdateReceived(sectionStart, sectionHeight, buf8);
			}
		}.bind(this);
	}

	startWorker(rendererWorker) {
		rendererWorker.postMessage({
			"action": "render"
		});
	}

	isRunning() {
		return this.running;
	}

	updateScene() {
		this.serializeScene();
		for (var i = 0; i < this.workers.length; i++) {
			this.workers[i].postMessage({
				"action": "elements",
				"data": this.serializedElements
			});
		}
	}
}
