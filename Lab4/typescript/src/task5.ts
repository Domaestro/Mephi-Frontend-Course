export {};

type Comparator<T> = (a: T, b: T) => number;

class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class BinaryTree<T> {
    private root: TreeNode<T> | null = null;
    private readonly compare: Comparator<T>;

    constructor(compare: Comparator<T>) {
        this.compare = compare;
    }

    insert(value: T): void {
        this.root = this.insertNode(this.root, value);
    }

    private insertNode(node: TreeNode<T> | null, value: T): TreeNode<T> {
        if (node === null) {
            return new TreeNode(value);
        }
        const cmp = this.compare(value, node.value);
        if (cmp < 0) {
            node.left = this.insertNode(node.left, value);
        } else if (cmp > 0) {
            node.right = this.insertNode(node.right, value);
        }
        return node;
    }

    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    private searchNode(node: TreeNode<T> | null, value: T): boolean {
        if (node === null) {
            return false;
        }
        const cmp = this.compare(value, node.value);
        if (cmp === 0) {
            return true;
        }
        if (cmp < 0) {
            return this.searchNode(node.left, value);
        }
        return this.searchNode(node.right, value);
    }

    remove(value: T): void {
        this.root = this.removeNode(this.root, value);
    }

    private removeNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (node === null) {
            return null;
        }
        const cmp = this.compare(value, node.value);
        if (cmp < 0) {
            node.left = this.removeNode(node.left, value);
            return node;
        }
        if (cmp > 0) {
            node.right = this.removeNode(node.right, value);
            return node;
        }
        if (node.left === null) {
            return node.right;
        }
        if (node.right === null) {
            return node.left;
        }
        const successor = this.findMin(node.right);
        node.value = successor.value;
        node.right = this.removeNode(node.right, successor.value);
        return node;
    }

    private findMin(node: TreeNode<T>): TreeNode<T> {
        let current: TreeNode<T> = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    update(oldValue: T, newValue: T): boolean {
        if (!this.search(oldValue)) {
            return false;
        }
        this.remove(oldValue);
        this.insert(newValue);
        return true;
    }

    height(): number {
        return this.heightOf(this.root);
    }

    private heightOf(node: TreeNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        return 1 + Math.max(this.heightOf(node.left), this.heightOf(node.right));
    }
}

const tree = new BinaryTree<number>((a, b) => a - b);
[5, 3, 8, 1, 4, 7, 9].forEach((value) => tree.insert(value));

console.log('Поиск 4:', tree.search(4));
console.log('Поиск 100:', tree.search(100));
console.log('Высота:', tree.height());

tree.update(8, 10);
console.log('После update 8 -> 10, поиск 8:', tree.search(8));
console.log('После update 8 -> 10, поиск 10:', tree.search(10));

tree.remove(5);
console.log('После remove 5, высота:', tree.height());
