import { FuzzyMatcher, TextProcessor } from "./$lib/String/fuzzy-search.js";
const processor = new TextProcessor([
    (text) => text.toLowerCase(),
    (text) => text.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ""), // remove punctuation?
]);
const matcher = new FuzzyMatcher();
const titles = [
    "Build a RESTful API using Node.js Express, and MongoDB",
    "Building a CRUD Application with Django",
    "Building a Realtime Chat App with Firebase",
    "Creating a Responsive Layout with CSS Grid",
    "Getting started with Angular",
    "Introduction to Svelte",
    "Learning Git",
    "React Hooks Tutorial",
    "Vue.js Tutorial",
];
const preprocessedTitles = processor.run(titles);
const preprocessedTarget = processor.run("crud");
console.log(preprocessedTitles);
console.log(preprocessedTarget);
console.log("Fuzzy Text Search");
console.log(matcher.search(preprocessedTitles[1], preprocessedTarget));
console.log();
console.log("Fuzzy Text List Search");
console.log(
    matcher.searchList(preprocessedTitles, preprocessedTarget, 3)
        .map(({ inputIndex }) => titles[inputIndex]),
);
console.log();
function runFuzzySearch(targetText) {
    const indexSet = new Set();
    const tolerance0 = matcher.searchMultiList(
        preprocessedTitles,
        processor.run(targetText),
    );
    const tolerance1 = matcher.searchMultiList(
        preprocessedTitles,
        processor.run(targetText),
        1,
    );
    const tolerance2 = matcher.searchMultiList(
        preprocessedTitles,
        processor.run(targetText),
        2,
    );
    tolerance0.forEach(({ inputIndex }) => indexSet.add(inputIndex));
    tolerance1.forEach(({ inputIndex }) => indexSet.add(inputIndex));
    tolerance2.forEach(({ inputIndex }) => indexSet.add(inputIndex));
    return Array.from(indexSet);
}
console.log("Fuzzy Text List Multi Search");
console.log(runFuzzySearch(preprocessedTarget).map((index) => titles[index]));
console.log();
