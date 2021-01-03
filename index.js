$(() => {
	setTimeout(() => {

		function successCallback() {
			alert("Siker, köszönjük az üzenetet! :)");
			backButton.click();
		}

		let messageButton = $("#messageButton");
		let backButton = $("#backButton");
		let sendButton = $("#sendButton");

		let pcLeft = $(".pc-left");
		let pcLeftMessage = $(".pc-left-message");

		let formName = $("#form-name");
		let formMessage = $("#form-message");

		messageButton.click(() => {
			pcLeft.addClass("d-none");
			pcLeftMessage.removeClass("d-none");
		});

		backButton.click(() => {
			pcLeft.removeClass("d-none");
			pcLeftMessage.addClass("d-none");
		});

		sendButton.click(() => {
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
				contentType: 'application/json',
				dataType: 'jsonp',
				error: (err) => {
					if (err.status !== 200) {
						alert("Valami nem sikerült :(");
					}
					else {
						successCallback();
					}
				},
				success: () => successCallback()
			})
		});

		let mail = "ayhanagoston";
		mail += String.fromCharCode(63 + 1);
		mail += "gm";
		mail += "ail.c";
		mail += "om";
		$("#contactlink").attr("href", "mailto:" + mail).text(mail);
	}, 10);
});