import { updateMap } from "../updateMap";

export type GraphNode<Key, Payload> = {
  key: Key;
  payload: Payload;
  adjacents: Map<Key, number>;
};

/**
 * Indirect graph.
 * Allows multiple edges between a single pair of edges.
 */
export class Graph<Key, Payload> {
  readonly nodeMap = new Map<Key, GraphNode<Key, Payload>>();
  readonly createDefault: (key: Key) => Payload;

  constructor(createDefault: (key: Key) => Payload) {
    this.createDefault = createDefault;
  }

  /**
   * Update key of given node.
   */
  public upsert(key: Key, updater: (payload: Payload) => void) {
    const node = this.nodeMap.get(key);
    if (node !== undefined) {
      updater(node.payload);
    } else {
      const newNode: GraphNode<Key, Payload> = {
        key,
        payload: this.createDefault(key),
        adjacents: new Map(),
      };
      updater(newNode.payload);
      this.nodeMap.set(key, newNode);
    }
  }

  /**
   * Connect two edges.
   * Nodes must have already been inserted to this graph.
   */
  public connect(key1: Key, key2: Key): void {
    const node1 = this.nodeMap.get(key1);
    if (!node1) {
      throw new Error(`Node for '${key1}' is not found`);
    }
    const node2 = this.nodeMap.get(key2);
    if (!node2) {
      throw new Error(`Node for '${key2}' is not found`);
    }
    updateMap(node1.adjacents, key2, 0, (c) => c + 1);
    updateMap(node2.adjacents, key1, 0, (c) => c + 1);
  }

  /**
   * Returns an iterator of all nodes.
   */
  public entries(): IterableIterator<[Key, GraphNode<Key, Payload>]> {
    return this.nodeMap.entries();
  }
}
