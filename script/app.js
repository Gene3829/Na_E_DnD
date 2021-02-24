// module pattern
// iife

(() => {
	// put variables (connections to the web page / DOM) at the top
	// const -> something that will never change / can't be redefined
	const puzzleSelectors = document.querySelectorAll("#buttonHolder img");
				dropZoneContainer = document.querySelector(".puzzle-board")
				dragZone = document.querySelector(".puzzle-pieces"),
				dragImages = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone");

	// functions go in the middle
	function dragStart() {
		console.log('started draggin');
		event.dataTransfer.setData("savedID", this.id);
	}

	function draggedOver(event) {
		event.preventDefault();
		console.log('dragged over me');
	}

	function dropped(event) {
		event.preventDefault();
		// console.log('dropped somethin on me');

		// check to see if there's an element here already (a dropeed image)
		// if so, then kill this functions
		if (this.childNodes.length > 0) { return; } // like an exit keyword - don't execute anything past this

		let targetID = event.dataTransfer.getData("savedID");
		console.log("i dragged this image:", targetID);
		event.target.appendChild(document.querySelector(`#${targetID}`));
	}

	// this function runs when the bottom nav buttons are clicked
	// it changes the bg image of the drop zone div using the style property

	// and we're also sending the thumbnail images back to the drag zone
	function changeBGImage() {
		// 1. check all the drop Zones
		// 2. if a drop zone has an image in it, then it need to go back where it came from
		// 3. append it back into the drag zone

		dropZones.forEach(zone => {
			if (zone.childNodes.length > 0) {
				dragZone.appendChild(zone.firstElementChild);
			}
		})
		// get the custom data attribute from the clicked button
		let currentImage = this.dataset.imageref;

		// ``is NOT quote. it's a JavaScript template string
		dropZoneContainer.style.backgroundImage = `url(images/backGround${currentImage}.jpg)`;


		//  this is an intermediate way to do the same something
		//  dropZoneContainer.style.backgroundImage = `url(images/backGround${this.dataset.imageref}.jpg)`;
		// debugger;
	}

  // event handling at the bottom
	puzzleSelectors.forEach(button => button.addEventListener("click", changeBGImage));
	dragImages.forEach(piece => piece.addEventListener("dragstart", dragStart));

	dropZones.forEach(zone => {
		zone.addEventListener("dragover", draggedOver);
		zone.addEventListener("drop", dropped);
	})

	//  emulate a click on the first bottom button and run the bg image function
	changeBGImage.call(puzzleSelectors[0]);
})();
