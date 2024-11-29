async function getRandomWord() {
    try {
        const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
        if (response.ok) {
            const data = await response.json();
            return data[0];
        } else {
            throw new Error("Failed to fetch the word");
        }
    } catch (error) {
        console.error("Error fetching random word:", error);
        return null;
    }
}

async function translateWord(word, targetLanguage = "th") {
    try {
        const response = await fetch(`https://lingva.ml/api/v1/en/${targetLanguage}/${encodeURIComponent(word)}`);
        
        if (response.ok) {
            const data = await response.json();
            return data.translation;
        } else {
            throw new Error("Failed to translate word");
        }
    } catch (error) {
        console.error("Error translating word:", error);
        return "Translation failed";
    }
}

document.getElementById("random-word-btn").addEventListener("click", async () => {
    const wordElement = document.getElementById("word");
    const translationElement = document.getElementById("translation");

    wordElement.textContent = "Loading...";
    translationElement.textContent = "";

    const randomWord = await getRandomWord();
    if (randomWord) {
        wordElement.textContent = randomWord;

        const translatedWord = await translateWord(randomWord);
        translationElement.textContent = translatedWord;
    } else {
        wordElement.textContent = "Failed to fetch word.";
    }
});
