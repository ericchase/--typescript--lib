import js_levenshtein from "./$lib/String/js-levenshtein.js";

let counter = 0;
function getLevenshteinDistance(a: string, b: string) {
    ++counter;
    return js_levenshtein(a, b);
}

const mapInputToTargetToDistance: Map<string, Map<string, number>> = new Map();
function addDistance(input: string, target: string): void {
    if (mapInputToTargetToDistance.has(input)) {
        const mapTargetToDistance = mapInputToTargetToDistance.get(input)!;
        if (!mapTargetToDistance.has(target)) {
            mapTargetToDistance.set(
                target,
                getLevenshteinDistance(input, target),
            );
        }
    } else {
        mapInputToTargetToDistance.set(
            input,
            new Map<string, number>([[
                target,
                getLevenshteinDistance(input, target),
            ]]),
        );
    }
}
function getDistance(input: string, target: string): number {
    return mapInputToTargetToDistance.get(input)?.get(target) ?? -1;
}

interface IFuzzyMatchResult {
    distance: number;
    inputWord: string;
}

interface IFuzzyMatchListResult {
    distance: number;
    inputIndex: number;
}

interface IFuzzyMultiMatchListResult {
    count: number;
    distance: number;
    inputIndex: number;
}

function fuzzyTextSearch(
    inputText: string,
    targetText: string,
): IFuzzyMatchResult[] {
    const inputWordSet = new Set<string>(inputText.split(" "));

    inputWordSet.forEach((inputWord) => addDistance(inputWord, targetText));

    const toFuzzyMatchResult = (inputWord: string): IFuzzyMatchResult => ({
        distance: getDistance(inputWord, targetText),
        inputWord,
    });

    return Array.from(inputWordSet)
        .map(toFuzzyMatchResult)
        .sort((a, b) => a.distance - b.distance);
}

function fuzzyTextListSearch(
    inputTextList: string[],
    targetText: string,
    tolerance = 0,
): IFuzzyMatchListResult[] {
    const inputTextSet = new Set<string>();
    const matchResultListList: IFuzzyMatchListResult[][] = [];

    for (const [inputIndex, inputText] of inputTextList.entries()) {
        if (!inputTextSet.has(inputText)) {
            inputTextSet.add(inputText);
            matchResultListList.push(
                fuzzyTextSearch(inputText, targetText)
                    .map(({ distance }) => ({ distance, inputIndex })),
            );
        }
    }

    const minMatchDistance = matchResultListList
        .map(([matchResult]) => matchResult.distance)
        .reduce((a, b) => a < b ? a : b);

    const isWithinTolerance = ({ distance }: IFuzzyMatchListResult) =>
        Math.abs(distance - minMatchDistance) <= tolerance;

    return matchResultListList
        .flatMap((matchResultList) =>
            matchResultList
                .filter(isWithinTolerance)
        )
        .sort((a, b) => a.distance - b.distance);
}

function fuzzyTextListMultiSearch(
    inputTextList: string[],
    targetText: string,
    tolerance = 0,
) {
    const targetWordSet = new Set<string>(targetText.split(" "));
    const indexToMatchResultMap = new Map<number, IFuzzyMultiMatchListResult>();

    function addToMatchResultMap(
        { inputIndex, distance }: IFuzzyMatchListResult,
    ) {
        if (indexToMatchResultMap.has(inputIndex)) {
            const matchResult = indexToMatchResultMap.get(inputIndex)!;
            matchResult.count += 1;
            matchResult.distance += distance;
        } else {
            indexToMatchResultMap.set(inputIndex, {
                count: 1,
                distance,
                inputIndex,
            });
        }
    }

    Array.from(targetWordSet)
        .flatMap((targetWord) =>
            fuzzyTextListSearch(inputTextList, targetWord, tolerance)
        )
        .forEach(addToMatchResultMap);

    return Array.from(indexToMatchResultMap.values())
        .sort((a, b) =>
            b.count - a.count || a.distance - b.distance ||
            a.inputIndex - b.inputIndex
        );
}

// function multiFuzzySearch(inputTextList: string[], targetText: string, preprocessors: ITextProcessor[] = [], tolerance = 0): ITextMultiMatchResult[] {
//     const mapProcessedInputTextToInputText =
//         new Map(inputTextList
//             .map(inputText => [TextProcessor.ProcessText(inputText, preprocessors), inputText]));

//     const mapProcessedTargetWordToTargetWord =
//         new Map(targetText.split(' ')
//             .map(targetWord => [TextProcessor.ProcessText(targetWord, preprocessors), targetWord]));

//     const mapInputTextToMultiMatchResult: Map<string, ITextMultiMatchResult> = new Map();
//     for (const processedTargetWord of mapProcessedTargetWordToTargetWord.keys()) {
//         const mapInputTextToMatchResult: Map<string, ITextMatchResult> = new Map();
//         for (const newMatchResult of fuzzyTextListSearch([...mapProcessedInputTextToInputText.keys()], processedTargetWord, [], tolerance)) {
//             const matchResult = mapInputTextToMatchResult.get(newMatchResult.input) ?? newMatchResult;
//             if (newMatchResult.score < matchResult.score) {
//                 matchResult.score = newMatchResult.score;
//                 matchResult.target = newMatchResult.target;
//                 mapInputTextToMatchResult.set(newMatchResult.input, matchResult);
//             }
//         }
//         for (const [inputText, matchResult] of mapInputTextToMatchResult) {
//             const multiMatchResult = mapInputTextToMultiMatchResult.get(inputText) ?? new TextMultiMatchResult(inputText, 0, [], 0);
//             multiMatchResult.matchCount += 1;
//             multiMatchResult.matchedTargets.push(matchResult.target)
//             multiMatchResult.totalScore += matchResult.score;
//             mapInputTextToMultiMatchResult.set(inputText, multiMatchResult);
//         }
//     }
//     return [...mapInputTextToMultiMatchResult.values()]
//         .sort((
//             { matchCount: aMatchCount, totalScore: aTotalScore },
//             { matchCount: bMatchCount, totalScore: bTotalScore }
//         ) =>
//             (bMatchCount - aMatchCount) || (aTotalScore - bTotalScore))
//         .map(({ inputText, matchCount, matchedTargets, totalScore }) => {
//             mapProcessedInputTextToInputText.get(inputText) ?? inputText
//             return new TextMultiMatchResult(, matchCount, matchedTargets, totalScore)
//         });
//     // ({ hitCount, totalDifference, text, target: targetText }));
// }

// const preprocessors = [
//     (text: string) => text.toLowerCase(),
//     (text: string) => text.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, ''), // remove punctuation?
// ];

// interface ITextProcessor {
//     (text: string): string;
// }

// interface ITextProcessorResult {
//     originalText: string;
//     processedText: string;
// }

// class TextProcessor {
//     static ProcessText(text: string, processors: ITextProcessor[]): string {
//         return processors.reduce((processedText, processor) =>
//             processor(processedText), text);
//     }
//     static ProcessTextList(textList: string[], processors: ITextProcessor[]): string[] {
//         return textList.map(text => processors.reduce(
//             (processedText, processor) =>
//                 processor(processedText), text));
//     }
// }

const titles = [
    // "this is a test this is a test this is a test 1",
    // "this is a test this is a test this is a test 2",
    // "this is a test this is a test this is a test 3",
    // "this is a test this is a test this is a test 4",
    // "this is a test this is a test this is a test 5",
    // "this is a test this is a test this is a test 6",
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

console.log("Fuzzy Text Search");
console.log(fuzzyTextSearch(titles[0], "Build"));
console.log(counter);
counter = 0;
console.log();

console.log("Fuzzy Text List Search");
console.log(fuzzyTextListSearch(titles, "Building"));
console.log(counter);
counter = 0;
console.log();

console.log("Fuzzy Text List Multi Search");
console.log(fuzzyTextListMultiSearch(titles, "Creating a CRUD", 0));
console.log(counter);
counter = 0;
console.log();
