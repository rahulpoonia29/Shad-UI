const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tailwindClasses.txt");

// Read the content of the file
fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	// Split the file content into lines
	const lines = data.split("\n");

	// Array to store structured data
	let structuredData = [];
	let currentCategory = "";

	// Iterate through each line
	lines.forEach((line) => {
		// Trim whitespace from the line
		line = line.trim();

		// Check if line starts with "/* " and ends with " */"
		if (line.startsWith("/* ") && line.endsWith(" */")) {
			// Extract category name from comment
			currentCategory = line.substring(3, line.length - 3).trim();
			structuredData.push({ category: currentCategory, classes: [] });
		} else if (line !== "") {
			// If line is not empty, assume it's a class and add it to current category
			if (currentCategory !== "") {
				// Remove surrounding quotes and commas from the class name
				const className = line
					.replace(/^["'’‘“”«»„‚‛`´,]+|["'’‘“”«»„‚‛`´,]+$/g, "")
					.trim();
				structuredData[structuredData.length - 1].classes.push(
					className
				);
			}
		}
	});

	// Write structured data to JSON file
	const outputFilePath = path.join(__dirname, "tailwindClasses.json");
	fs.writeFile(
		outputFilePath,
		JSON.stringify(structuredData, null, 2),
		"utf8",
		(err) => {
			if (err) {
				console.error("Error writing file:", err);
			} else {
				console.log("Classes saved to tailwindClasses.json");
			}
		}
	);
});
