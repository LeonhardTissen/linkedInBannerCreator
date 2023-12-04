function setBannerText(newText) {
	document.querySelectorAll('.svgText').forEach((textElement) => {
		textElement.textContent = newText;
	});
}

function setBannerColor(newColor) {
	document.querySelectorAll('.colorStop').forEach((stopElement) => {
		stopElement.style.stopColor = newColor;
	});
}

function setAvatarPicture(file) {
	if (file === undefined) return;

	const reader = new FileReader();

	reader.onload = function (ev) {
		document.getElementById('avatarPreview').src = ev.target.result;
	};

	reader.readAsDataURL(file);
}

function exportProfilePicture() {
	const profilePicture = document.getElementById('avatarPreview');
	const bannerPreview = document.getElementById('bannerPreview');

	// Create a new canvas
	const cvs = document.createElement('canvas');
	cvs.width = 512;
	cvs.height = 512;

	// Draw profile picture onto canvas
	const ctx = cvs.getContext('2d');
	ctx.drawImage(profilePicture, 0, 0, 512, 512);
	
	// Convert banner SVG to data URI
	const bannerImg = new Image();
	const svgXml = new XMLSerializer().serializeToString(bannerPreview);
	const svgDataUri = 'data:image/svg+xml;base64,' + btoa(svgXml);
	bannerImg.src = svgDataUri;
	bannerImg.onload = () => {
		// Draw banner onto canvas
		ctx.drawImage(bannerImg, 0, 0, 512, 512);

		// Convert canvas to PNG
		const cvsDataUrl = cvs.toDataURL('image/png');

		// Download PNG
		const downloadLink = document.createElement('a');
		downloadLink.href = cvsDataUrl;
		downloadLink.download = 'linkedin_profile_picture.png';

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	}
}

// Sometimes inputs are saved so use on page load
setBannerText(document.getElementById('bannerTextInput').value);
setBannerColor(document.getElementById('bannerColorInput').value);
setAvatarPicture(document.getElementById('profilePictureInput').files[0]);
