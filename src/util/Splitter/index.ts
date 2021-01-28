import { updateMap } from "../updateMap";

type SplitterNode<Key, Payload> = {
  keys: Set<Key>;
  payload: Payload;
};

type SplitterOptions<Key, Payload> = {
  createPayload: (keys: ReadonlySet<Key>) => Payload;
  splitPayload: (
    payload: Payload,
    keys1: ReadonlySet<Key>,
    keys2: ReadonlySet<Key>
  ) => [yesPayload: Payload, noPayload: Payload];
};

export class Splitter<Key, Payload> {
  private readonly nodes = new Set<SplitterNode<Key, Payload>>();
  private readonly keyToNode = new Map<Key, SplitterNode<Key, Payload>>();

  private readonly createPayload: (keys: ReadonlySet<Key>) => Payload;
  private readonly splitPayload: (
    payload: Payload,
    keys1: ReadonlySet<Key>,
    keys2: ReadonlySet<Key>
  ) => [Payload, Payload];

  constructor(options: SplitterOptions<Key, Payload>) {
    this.createPayload = options.createPayload;
    this.splitPayload = options.splitPayload;
  }

  public apply(keys: readonly Key[]) {
    // sort keys by belonging nodes.
    const newKeys = new Set<Key>();
    const nodeMap = new Map<SplitterNode<Key, Payload>, Key[]>();
    for (const key of keys) {
      const node = this.keyToNode.get(key);
      if (node === undefined) {
        newKeys.add(key);
      } else {
        updateMap(nodeMap, node, [], (c) => (c.push(key), c));
      }
    }

    // keys that has not been recognized yet are treated as a set for new node.
    if (newKeys.size > 0) {
      this.add(newKeys, this.createPayload(newKeys));
    }

    // Existing keys may split existing set.
    for (const [node, keys] of nodeMap) {
      const [yes, no] = filterBySet(node.keys, new Set(keys));
      if (no.length === 0) {
        // not split
        continue;
      }
      // split the node into two
      const keys1 = new Set(yes);
      const keys2 = new Set(no);
      const [payload1, payload2] = this.splitPayload(
        node.payload,
        keys1,
        keys2
      );
      this.nodes.delete(node);
      this.add(keys1, payload1);
      this.add(keys2, payload2);
    }
  }

  private add(keys: Set<Key>, payload: Payload) {
    const node: SplitterNode<Key, Payload> = { keys, payload };
    this.nodes.add(node);
    for (const key of keys) {
      this.keyToNode.set(key, node);
    }
  }

  public entries(): IterableIterator<SplitterNode<Key, Payload>> {
    return this.nodes.values();
  }
}

/**
 * Filter given array by whether it belongs to given set.
 */
function filterBySet<T>(values: Iterable<T>, set: ReadonlySet<T>): [T[], T[]] {
  const yes = [];
  const no = [];
  for (const v of values) {
    if (set.has(v)) {
      yes.push(v);
    } else {
      no.push(v);
    }
  }
  return [yes, no];
}
