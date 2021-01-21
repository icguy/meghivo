let messageButton;
let backButton;
let sendButton;
let pcLeft;
let pcLeftMessage;
let formName;
let formMessage;

function successCallback() {
	alert("Siker, köszönjük az üzenetet! :)");
	backButton.click();
}

function onSendClick() {
	let name = (formName.val() || "").trim();
	let message = (formMessage.val() || "").trim();

	if (!name || !message) {
		alert("Légyszi, add meg a neved és az üzenetet is!");
		return;
	}

	let data = {
		"entry.129626341": name,
		"entry.637920671": message,
	};

	$.ajax({
		type: 'POST',
		url: 'https://docs.google.com/forms/d/e/1FAIpQLSc49eQ3VgCLq70yVUlb-iYH9GdzvkiKFRpaasT_Y7Nm00gKoQ/formResponse',
		data: data,
		dataType: 'jsonp',
		complete: () => successCallback()
	});
}

function fillEmail() {
	let mail = "ayhanagoston";
		mail += String.fromCharCode(63 + 1);
		mail += "gm";
		mail += "ail.c";
		mail += "om";
		$("#contactlink").attr("href", "mailto:" + mail).text(mail);
}

async function checkStreamUrl() {
	let urlParams = new URLSearchParams(window.location.search);
	let forceEnabled = urlParams.get('fe');
	let enabled = !!(forceEnabled || await get("enabled"));
	if(enabled) {
		let url = await get("url");
		if(url) {
			let linkElement = $("#linkElement");
			linkElement.html(`A közvetítést <a href="${url}">ide kattintva</a> tudod elérni.`);
		}
	}
}

function get(key) {
	return new Promise((resolve, reject ) => {
		$.ajax({
			type: 'GET',
			url: `https://meghivo-40c80-default-rtdb.europe-west1.firebasedatabase.app/${key}.json`,
			success: (data) => resolve(data),
			error: (_, status, error) => {
				console.error(status, error);
				reject();
			}
		});
	});
}

$(() => {
	setTimeout(() => {
		// ======================= init elements =======================
		messageButton = $("#messageButton");
		backButton = $("#backButton");
		sendButton = $("#sendButton");
		pcLeft = $(".pc-left");
		pcLeftMessage = $(".pc-left-message");
		formName = $("#form-name");
		formMessage = $("#form-message");

		// ======================= event handlers =======================
		messageButton.click(() => {
			pcLeft.addClass("d-none");
			pcLeftMessage.removeClass("d-none");
		});

		backButton.click(() => {
			pcLeft.removeClass("d-none");
			pcLeftMessage.addClass("d-none");
		});

		sendButton.click(() => onSendClick());

		// ======================= other init logic =======================
		fillEmail();
		checkStreamUrl();
	}, 10);
});