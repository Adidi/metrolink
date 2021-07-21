export const preventBrowserDefault = event => {
	event.preventDefault();
	event.stopPropagation();
};

export const saveFile = (content, fileName, contentType) => {
	const a = document.createElement('a');
	const file = new Blob([content], { type: contentType });
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
};

export const loadFile = acceptFiles =>
	new Promise((resolve, reject) => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';

		if (acceptFiles) {
			fileInput.accept = acceptFiles;
		}

		fileInput.style.display = 'none';

		const removeFileInput = () => document.body.removeChild(fileInput);

		const throwError = msg => {
			removeFileInput();
			reject(Error(msg));
		};

		fileInput.addEventListener('change', e => {
			const file = e.target.files[0];
			if (!file) {
				return throwError('No file selected');
			}
			const reader = new FileReader();
			reader.addEventListener('error', () => {
				throwError(`Error occurred reading file: ${file.name}`);
			});

			reader.addEventListener('load', e => {
				removeFileInput();
				const contents = e.target.result;
				resolve(contents);
			});

			reader.readAsText(file);
		});

		document.body.appendChild(fileInput);
		fileInput.click();
	});
