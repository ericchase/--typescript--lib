export interface IFuzzyMatchResult {
  distance: number;
  inputWord: string;
}
export interface IFuzzyMatchListResult {
  distance: number;
  inputIndex: number;
}
export interface IFuzzyMultiMatchListResult {
  count: number;
  distance: number;
  inputIndex: number;
}
export declare class FuzzyMatcher {
  protected mapInputToTargetToDistance: Map<string, Map<string, number>>;
  protected addDistance(input: string, target: string): void;
  protected getDistance(input: string, target: string): number;
  search(inputText: string, targetText: string): IFuzzyMatchResult[];
  searchList(inputTextList: string[], targetText: string, tolerance?: number): IFuzzyMatchListResult[];
  searchMultiList(inputTextList: string[], targetText: string, tolerance?: number): IFuzzyMultiMatchListResult[];
}
export interface ITextProcessor {
  (text: string): string;
}
export declare class TextProcessor {
  processors: ITextProcessor[];
  static ProcessText(text: string, processors: ITextProcessor[]): string;
  static ProcessTextList(textList: string[], processors: ITextProcessor[]): string[];
  constructor(processors: ITextProcessor[]);
  run<T>(input: T): T;
}
