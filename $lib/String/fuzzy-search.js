import js_levenshtein from "./js-levenshtein.js";
export class FuzzyMatcher {
    mapInputToTargetToDistance = new Map();
    addDistance(input, target) {
        if (this.mapInputToTargetToDistance.has(input)) {
            const mapTargetToDistance = this.mapInputToTargetToDistance.get(
                input,
            );
            if (!mapTargetToDistance.has(target)) {
                mapTargetToDistance.set(target, js_levenshtein(input, target));
            }
        } else {
            this.mapInputToTargetToDistance.set(
                input,
                new Map([[
                    target,
                    js_levenshtein(input, target),
                ]]),
            );
        }
    }
    getDistance(input, target) {
        return this.mapInputToTargetToDistance.get(input)?.get(target) ?? -1;
    }
    search(inputText, targetText) {
        const inputWordSet = new Set(inputText.split(" "));
        inputWordSet.forEach((inputWord) =>
            this.addDistance(inputWord, targetText)
        );
        const toFuzzyMatchResult = (inputWord) => ({
            distance: this.getDistance(inputWord, targetText),
            inputWord,
        });
        return Array.from(inputWordSet)
            .map(toFuzzyMatchResult)
            .sort((a, b) => a.distance - b.distance);
    }
    searchList(inputTextList, targetText, tolerance = 0) {
        const inputTextSet = new Set();
        const matchResultListList = [];
        for (const [inputIndex, inputText] of inputTextList.entries()) {
            if (!inputTextSet.has(inputText)) {
                inputTextSet.add(inputText);
                matchResultListList.push(
                    this.search(inputText, targetText)
                        .map(({ distance }) => ({ distance, inputIndex })),
                );
            }
        }
        const minMatchDistance = matchResultListList
            .map(([matchResult]) => matchResult.distance)
            .reduce((a, b) => a < b ? a : b);
        const isWithinTolerance = ({ distance }) =>
            Math.abs(distance - minMatchDistance) <= tolerance;
        return matchResultListList
            .flatMap((matchResultList) =>
                matchResultList
                    .filter(isWithinTolerance)
            )
            .sort((a, b) => a.distance - b.distance);
    }
    searchMultiList(inputTextList, targetText, tolerance = 0) {
        const targetWordSet = new Set(targetText.split(" "));
        const indexToMatchResultMap = new Map();
        function addToMatchResultMap({ inputIndex, distance }) {
            if (indexToMatchResultMap.has(inputIndex)) {
                const matchResult = indexToMatchResultMap.get(inputIndex);
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
                this.searchList(inputTextList, targetWord, tolerance)
            )
            .forEach(addToMatchResultMap);
        // proprietary sort order
        return Array.from(indexToMatchResultMap.values())
            .sort((a, b) =>
                (b.count / b.distance) - (a.count / a.distance) ||
                (b.count - a.count) ||
                a.inputIndex - b.inputIndex
            );
    }
}
export class TextProcessor {
    processors;
    static ProcessText(text, processors) {
        return processors.reduce(
            (processedText, processor) => processor(processedText),
            text,
        );
    }
    static ProcessTextList(textList, processors) {
        return textList.map((text) =>
            processors.reduce(
                (processedText, processor) => processor(processedText),
                text,
            )
        );
    }
    constructor(processors) {
        this.processors = processors;
    }
    run(input) {
        if (typeof input === "string") {
            if (Array.isArray(input)) {
                return TextProcessor.ProcessTextList(input, this.processors);
            } else {
                return TextProcessor.ProcessText(input, this.processors);
            }
        }
        return input;
    }
}
