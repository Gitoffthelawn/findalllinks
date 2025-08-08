var mode = "window";

const loadConfig = () => {
	chrome.storage.local.get("FALOutput",(res) => {
        mode = res["FALOutput"] ?? "window";
        console.log(mode);
        document.getElementById("clipboardRb").checked = (res["FALOutput"] == "clip")  ?? false;
	});
}

const updateConfig = (fALOutputMode) => {
	chrome.storage.local.set({
		FALOutput: fALOutputMode,
	});
    loadConfig();
}

loadConfig();

document.getElementById("clipboardRb").addEventListener('change', function () {
	if(this.checked) updateConfig("clip");
});
document.getElementById("windowRb").addEventListener('change', function () {
	if(this.checked) updateConfig("window");
});

const get_radio = () => {
    return mode;
}

const inject_script = (tabId) => {
  chrome.scripting.executeScript({
    target: { tabId },
    files: ["/content_scripts/content.js"]
  });
};

window.addEventListener('load', function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        inject_script(tabs[0].id);
    });

	document.querySelector('#find_links_v2').addEventListener('click', function() {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            //inject_script(tabs[0].id);
			chrome.tabs.sendMessage(tabs[0].id, {command: "find_links_v2", mode: get_radio()}, function(response) {
				console.log("Call to function");
			});
		});
	});
	document.querySelector('#find_paths_v3').addEventListener('click', function() {

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            //inject_script(tabs[0].id);
			chrome.tabs.sendMessage(tabs[0].id, {command: "find_paths_v3", mode: get_radio()}, function(response) {
				console.log("Call to function");
			});
		});
	});
    document.querySelector('#find_paths_v3_no_quotes').addEventListener('click', function() {

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            //inject_script(tabs[0].id);
			chrome.tabs.sendMessage(tabs[0].id, {command: "find_paths_v3_no_quotes", mode: get_radio()}, function(response) {
				console.log("Call to function");
			});
		});
	});
    document.querySelector('#jslinkfinder').addEventListener('click', function() {

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            //inject_script(tabs[0].id);
			chrome.tabs.sendMessage(tabs[0].id, {command: "jslinkfinder", mode: get_radio()}, function(response) {
				console.log("Call to function");
			});
		});
	});
});
