let access_count = 0;

function sortColors(nums) {
  access_count = 0;
  function get(i) {
    ++access_count;
    return nums[i];
  }

  const to_beg_gen = (function* () {
    let beg = 0;
    while (true) {
      const i = yield;
      [nums[i], nums[beg]] = [nums[beg], nums[i]];
      ++beg;
    }
  })();
  const to_end_gen = (function* () {
    let end = nums.length - 1;
    while (true) {
      const i = yield;
      [nums[i], nums[end]] = [nums[end], nums[i]];
      --end;
    }
  })();

  to_beg_gen.next();
  to_end_gen.next();

  const to_beg = (i) => {
    to_beg_gen.next(i);
  };
  const to_end = (i) => {
    to_end_gen.next(i);
  };

  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const item_l = get(l);
    const item_r = get(r);

    if (item_l === 0) {
      to_beg(l);
    }
    if (item_l === 2) {
      to_end(l);
    }
    ++l;

    if (item_r === 0) {
      to_beg(r);
    }
    if (item_r === 2) {
      to_end(r);
    }
    --r;
  }
  if (l === r) {
    const item_l = get(l);

    if (item_l === 0) {
      to_beg(l);
    }
    if (item_l === 2) {
      to_end(l);
    }
  }
}

function test(arr) {
  sortColors(arr);
  console.log(arr);
  console.log(access_count);
}

test([0, 1, 2, 2, 1, 1, 2, 2, 0, 0, 0, 0, 2, 1]);
test([0, 1, 2, 2, 1, 1, 2, 2, 0, 0, 0, 0, 2, 1, 1]);
