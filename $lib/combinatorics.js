import { factorial } from "mathjs/number";
// export function factorial(n: number): number {
//     let product = 1;
//     for (let i = 2; i < n + 1; ++i) {
//         product = product * i;
//     }
//     return product;
// }
export function nPr(n, r) {
    return factorial(n) / factorial(n - r);
}
export function nCr(n, r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}
export function nChooseRPermutations(choices, r) {
    function incrementIndices(indices, n) {
        // start with last index
        const last = indices.length - 1;
        // increment last index
        ++indices[last];
        // work backwards
        let i = last;
        while (i >= 0) {
            // increment index again if equal to a higher index
            while (indices.slice(0, i).includes(indices[i])) {
                ++indices[i]; // increment index
            }
            const end = n;
            // check if index is still less than end
            if (indices[i] < end) {
                // reset lower index if necessary
                if (++i < indices.length) {
                    indices[i] = 0;
                }
                else {
                    // done
                    break;
                }
            }
            else {
                // move to higher index and increment it
                ++indices[--i];
            }
        }
    }
    // P(n, r) = n!/(n-r)!
    const n = choices.length;
    const permutationCount = nPr(n, r);
    const indexList = Array.from(new Array(r).keys());
    const permutations = new Array(permutationCount);
    for (let c = 0; c < permutationCount; ++c) {
        // Create new permutation
        // - Map indices to actual values
        permutations[c] = indexList.map((i) => choices[i]);
        // Increment the indices
        incrementIndices(indexList, n);
    }
    return permutations;
}
export function nChooseRCombinations(choices, r) {
    function incrementIndices(indices, n) {
        // start with last index
        const last = indices.length - 1;
        // increment last index
        ++indices[last];
        // work backwards
        let i = last;
        while (i >= 0) {
            const end = (i < last) ? indices[i + 1] : n;
            // check if index is still less than end
            if (indices[i] < end) {
                // reset lower index if necessary
                if (++i < indices.length) {
                    indices[i] = indices[i - 1] + 1;
                }
                else {
                    // done
                    break;
                }
            }
            else {
                // move to higher index and increment it
                ++indices[--i];
            }
        }
    }
    // C(n, r) = n!/(r!(n-r)!)
    const n = choices.length;
    const combinationCount = nCr(n, r);
    const indexList = Array.from(new Array(r).keys());
    const combinations = new Array(combinationCount);
    for (let c = 0; c < combinationCount; ++c) {
        // Create new permutation
        // - Map indices to actual values
        combinations[c] = indexList.map((i) => choices[i]);
        // Increment the indices
        incrementIndices(indexList, n);
    }
    return combinations;
}
