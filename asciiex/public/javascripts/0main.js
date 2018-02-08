// const player = document.getElementById('player');
// const canvas = document.getElementById('canvas');
// const context = canvas.getContext('2d');
// const captureButton = document.getElementById('capture');
//
// const constraints = {
//   video: true,
// };
//
// captureButton.addEventListener('click', () => {
//   // Draw the video frame to the canvas.
//   context.drawImage(player, 0, 0, canvas.width, canvas.height);
// });
//
// // Attach the video stream to the video element and autoplay.
// navigator.mediaDevices.getUserMedia(constraints)
//   .then((stream) => {
//     player.srcObject = stream;
//   });

console.log('main');

(function() {
	var asciiContainer = document.getElementById("ascii");
	var capturing = false;
  console.log("execute");
	camera.init({
		width: 90,
		height: 160,
		fps: 30,
		mirror: true,

		onFrame: function(canvas) {
			ascii.fromCanvas(canvas, {
				// contrast: 128,
				callback: function(asciiString) {
					asciiContainer.innerHTML = asciiString;
				}
			});
		},

		onSuccess: function() {
			document.getElementById("info").style.display = "none";

			capturing = true;
			document.getElementById("pause").style.display = "block";
			document.getElementById("pause").onclick = function() {
				if (capturing) {
					camera.pause();
				} else {
					camera.start();
				}
				capturing = !capturing;
			};
		},

		onError: function(error) {
			// TODO: log error
		},

		onNotSupported: function() {
			document.getElementById("info").style.display = "none";
			asciiContainer.style.display = "none";
			document.getElementById("notSupported").style.display = "block";
		}
	});
})();
