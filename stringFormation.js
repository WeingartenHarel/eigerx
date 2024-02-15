/**
 * Counts the number of ways to form the target string using characters from the given array of words.
 * @param {string[]} words - Array of strings.
 * @param {string} target - Target string to be formed.
 * @returns {number} - Number of ways to construct the target string.
 */
function numWays(words, target) {
    // Length of the target string
    const targetLength = target.length;

    // Number of strings in the array
    const numberOfWords = words.length;

    // Initialize a 2D array to store the count of ways
    const dp = new Array(targetLength + 1).fill(0).map(() => new Array(numberOfWords + 1).fill(0));

    // Define the modulo value for calculations
    const mod = 1e9 + 7;

    // Initialize the base case: empty target can be formed in one way
    for (let wordIndex = 0; wordIndex <= numberOfWords; ++wordIndex) {
        dp[0][wordIndex] = 1;
    }

    // Initialize an array to count occurrences of each character in each word's column
    const charCount = new Array(numberOfWords).fill(0).map(() => new Array(26).fill(0));

    // Count occurrences of each character in each column of the words array
    for (const word of words) {
        for (let columnIndex = 0; columnIndex < numberOfWords; ++columnIndex) {
            ++charCount[columnIndex][word.charCodeAt(columnIndex) - 97];
        }
    }

    // Dynamic programming to count the number of ways
    for (let targetIndex = 1; targetIndex <= targetLength; ++targetIndex) {
        for (let wordIndex = 1; wordIndex <= numberOfWords; ++wordIndex) {
            // Update dp matrix based on current character count
            dp[targetIndex][wordIndex] = dp[targetIndex][wordIndex - 1] +
                dp[targetIndex - 1][wordIndex - 1] * charCount[wordIndex - 1][target.charCodeAt(targetIndex - 1) - 97];

            // Apply modulo operation to avoid overflow
            dp[targetIndex][wordIndex] %= mod;
        }
    }

    // Return the result
    return dp[targetLength][numberOfWords];
}

// Example usage
const wordsArray = ["adc", "aec", "efg"];
const targetString = "ac";
const result = numWays(wordsArray, targetString);
console.log(result);  // Output should be 4