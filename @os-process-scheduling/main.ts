import { MinPriorityQueue } from '../$lib/$adt/priority-queue.js';

// async function getStandardInput() {
//     const chunks = [];
//     const decoder = new TextDecoder();
//     for await (const chunk of Deno.stdin.readable) {
//         chunks.push(decoder.decode(chunk));
//     }
//     return chunks;
// }

function splitLines(input: string[]): string[] {
  return input
    .join('')
    .split(/(?:\r?\n)+/)
    .map((_) => _.trim())
    .filter((_) => _.length);
}

function removeComments(input: string[]): string[] {
  return input.map((_) => _.split('//')[0]).map((_) => _.trim());
}

class Command {
  constructor(
    public name: string,
    public value: number,
  ) {}
}

function extractCommands(input: string[]): Command[] {
  return input.map((_) => _.split(/\s+/)).map(([a, b]) => new Command(a, Number.parseInt(b)));
}

class Process {
  public eventTime: number;
  public startTime: number;
  public status = 'READY';
  private nextCommandIndex = 0;

  constructor(
    public id: number,
    private commands: Command[],
  ) {
    commands.push(new Command('TERMINATE', 0));
    this.eventTime = commands[0]?.value || 0;
    this.startTime = this.eventTime;
  }

  hasNextCommand(this: Process): boolean {
    return this.nextCommandIndex < this.commands.length;
  }
  getNextCommand(this: Process): Command {
    return this.commands[this.nextCommandIndex++];
  }

  // equalTo(other: Process): boolean {
  //     return this.eventTime === other.eventTime;
  // }
  // lessThan(other: Process): boolean {
  //     return this.eventTime < other.eventTime;
  // }
  // greaterThan(other: Process): boolean {
  //     return this.eventTime > other.eventTime;
  // }
}

const DISK_ACCESS_DURATION = 10;

const Memory = new (class {
  CoreCount = 0;
  DiskQueue: number[] = [];
  ProcessTable: Process[] = [];
  ReadyQueue: number[] = [];
  SystemTime = 0;
})();

function getSubArrays<T>(arr: T[], predicate: (item: T) => boolean): T[][] {
  const slices: T[][] = [];
  let begin = 0;
  while (begin < arr.length) {
    while (begin < arr.length) {
      if (predicate(arr[begin]) === true) {
        break;
      }
      ++begin;
    }
    let end = begin + 1;
    while (end < arr.length) {
      if (predicate(arr[end]) === true) {
        break;
      }
      ++end;
    }
    slices.push(arr.slice(begin, end));
    begin = end;
  }
  return slices;
}

function executeProcessCommand(process: Process): void {
  Memory.SystemTime = process.eventTime;
  const { name, value } = process.getNextCommand();
  switch (name) {
    case 'NEW':
      console.log(`-- ARRIVAL event for process ${process.id} at time ${Memory.SystemTime} ms`);
      console.log(`-- Process ${process.id} starts at time ${Memory.SystemTime} ms`);
      break;
    case 'CORE':
      console.log(`-- Process ${process.id} requests a core at time ${Memory.SystemTime} ms for ${value} ms`);
      // when available
      console.log(`-- Process ${process.id} gets a core at time ${Memory.SystemTime} ms`);
      console.log(`-- Process ${process.id} will release a core at time ${Memory.SystemTime + value} ms`);
      // at completion
      console.log(`-- CORE completion event for process ${process.id} at time ${Memory.SystemTime + value} ms`);
      process.eventTime += value;
      process.status = 'RUNNING';
      break;
    case 'DISK':
      console.log(`-- Process ${process.id} requests disk access at time ${Memory.SystemTime} ms for ${DISK_ACCESS_DURATION} ms`);
      // if disk available
      console.log(`-- Process ${process.id} will release the disk at time ${Memory.SystemTime + DISK_ACCESS_DURATION} ms`);
      // if blocking
      if (value === 1) {
        process.eventTime += DISK_ACCESS_DURATION;
        process.status = 'BLOCKED';
      }
      console.log(`-- DISK completion event for process ${process.id} at time ${Memory.SystemTime + DISK_ACCESS_DURATION} ms`);
      break;
    case 'DISPLAY':
    case 'INPUT':
      console.log(`-- Process ${process.id} requests user interaction at time ${Memory.SystemTime} ms for ${value} ms`);
      console.log(`-- Process ${process.id} will complete user interaction at time ${Memory.SystemTime + value} ms`);
      process.eventTime += value;
      process.status = 'BLOCKED';
      console.log(`-- USER completion event for process ${process.id} at time ${Memory.SystemTime + value} ms`);
      break;
  }
}

function terminateProcess(process: Process): void {
  process.status = 'TERMINATED';
  console.log();
  console.log(`CURRENT STATE OF THE SYSTEM AT TIME ${Memory.SystemTime}:`);
  console.log(`Current number of busy cores: ${Memory.CoreCount}`);
  console.log(`READY QUEUE:`);
  if (Memory.ReadyQueue.length) {
    console.log(``);
  } else console.log(`empty`);
  console.log(`DISK QUEUE:`);
  if (Memory.DiskQueue.length) {
    console.log(``);
  } else console.log(`empty`);
  console.log(`PROCESS TABLE:`);
  if (Memory.ProcessTable.length) {
    Memory.ProcessTable.forEach((_) => console.log(`Process ${_.id} started at ${_.startTime} is ${_.status}`));
    Memory.ProcessTable.splice(Memory.ProcessTable.indexOf(process), 1);
  } else console.log(`empty`);
  console.log();
}

const mock_input = [
  `
    NCORES   1    // system has one core
    NEW      0    // new process starts at t = 0 ms
    CORE     99   // request 99 ms of CPU time
    DISK     0    // do a non-blocking disk access
    CORE     99   // request 99 ms of CPU time
    DISPLAY  99   // write to display for 99 ms
    CORE     99   // request 99 ms of CPU time
    DISK     1    // do a blocking disk access for 10 ms
    CORE     99   // request 99 ms of CPU time
    INPUT    99   // wait for user input for 99 ms
    CORE     99   // request 99 ms of CPU time
`,
];

(async function main() {
  // const commands = await getStandardInput()
  const commands = await Promise.resolve(mock_input).then(splitLines).then(removeComments).then(extractCommands);

  Memory.CoreCount = commands.find(({ name }) => name === 'NCORES')?.value ?? 1;
  Memory.ProcessTable = getSubArrays(commands, ({ name }) => name === 'NEW').map((commands, index) => new Process(index, commands));

  const processPriorityQueue = new MinPriorityQueue<Process>((a: Process, b: Process) => a.eventTime < b.eventTime);
  Memory.ProcessTable.forEach((process) => {
    if (process.hasNextCommand()) {
      processPriorityQueue.insert(process);
    }
  });

  console.log('Number of Cores:', Memory.CoreCount);

  while (processPriorityQueue.length) {
    const process = processPriorityQueue.top!;
    executeProcessCommand(process);

    processPriorityQueue.remove();
    if (process.hasNextCommand()) {
      processPriorityQueue.insert(process);
    } else {
      terminateProcess(process);
    }
  }
})();
