
export function groupRule() {
  const rule = {
    message: '分组外的节点不允许连接分组内的',
    validate: (
      _sourceNode: any,
      _targetNode: any,
      _sourceAnchor: any,
      _targetAnchor: any,
    ) => {
      const isSourceNodeInsideTheGroup = !!_sourceNode.properties.parent;
      const isTargetNodeInsideTheGroup = !!_targetNode.properties.parent;

      return !(!isSourceNodeInsideTheGroup && isTargetNodeInsideTheGroup);
    },
  };
  // @ts-ignore
  this.targetRules.push(rule);
}

// @ts-ignore
/* eslint-disable no-bitwise */
class IDS {
  private _ids: Set<string>;
  constructor() {
    (globalThis as any)._ids = this;
    this._ids = new Set();
  }
  generateId() {
    const id = 'xxxxxxxx'.replace(/[x]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    return id;
  }
  next() {
    let id = this.generateId();
    while (this._ids.has(id)) {
      id = this.generateId();
    }
    this._ids.add(id);
    return id;
  }
}

const ids = (globalThis as any)?._ids || new IDS();

export function genBpmnId(): string {
  return ids.next();
}
