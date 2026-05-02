type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

let a: TreeNode<string> = {
  value: "root",
  children: [
    {
      value: "child-1",
    },
  ],
};


console.log(a.children?.[0].value);