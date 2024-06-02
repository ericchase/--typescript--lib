export declare function areEqual<T>(arrayA: T[], arrayB: T[]): boolean;
export declare function getEndpoints<T>(array: T[]): [number, number];
export declare function generateSlidingWindowFilter<T>(
  array: T[],
  size: number,
  filter: (slice: T[]) => boolean,
): Generator<
  {
    slice: T[];
    begin: number;
    end: number;
  },
  void,
  unknown
>;
export declare function generateChunkSlices<T>(
  array: T[],
  size: number,
): Generator<
  | never[]
  | {
      slice: T[];
      begin: number;
      end: number;
    },
  void,
  unknown
>;
export declare function generateChunks<T>(array: T[], size: number): Generator<T[], void, unknown>;
