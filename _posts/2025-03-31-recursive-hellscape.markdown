---
layout: post
title: "Recursive Hellscape"
date: 2025-03-31 17:56:00 +1100
categories: [prolog, tail-recursion]
tags: [recursion, algorithms, programming, prolog]
published: false
---
I am currently being tormented by a tail-recursive tree flattening Prolog program. Just going to leave this commented trace here in case it helps anyone else who is trying to understand how this method works.

First, the program:
```
tree_list(Tree, List) :- tree_list(Tree, List, []).
tree_list(empty, List, List).
tree_list(node(L, N, R), List, List0) :-
   tree_list(L, List, List1),
   List1 = [N|List2],
   tree_list(R, List2, List0).
```

And now the trace (with extremely helpful comments added courtesy of ChatGPT...):
```
% Define a binary tree structure:
%         2
%        / \
%       1   3

% Query: Perform in-order traversal of the tree.
[trace]  ?- Tree = node(node(empty, 1, empty), 2, node(empty, 3, empty)),
|       tree_list(Tree, List).

% Unify Tree with the given structure.
   Call: (13) Tree = node(node(empty, 1, empty), 2, node(empty, 3, empty)) ? creep
% Successfully unified Tree with the expected structure.
   Exit: (13) Tree = node(node(empty, 1, empty), 2, node(empty, 3, empty)) ? creep

% Start the traversal by calling tree_list with Tree and unbound List.
   Call: (13) tree_list(Tree, List) ? creep
% Entry point calls tree_list_acc with Tree, unbound List, and an empty accumulator [].
   Call: (14) tree_list_acc(Tree, List, []) ? creep

% Begin processing the left subtree of the root (node with value 2).
   Call: (15) tree_list_acc(node(empty, 1, empty), ListAfterLeft, Acc1) ? creep
% Left subtree is empty, so return the accumulator unchanged (no values to add).
   Call: (16) tree_list_acc(empty, ListAfterLeft, Acc2) ? creep
% Base case reached; return the current accumulator (unchanged).
   Exit: (16) tree_list_acc(empty, ListAfterLeft, ListAfterLeft) ? creep

% Visit the node with value 1 and prepend it to the list.
   Call: (16) ListAfterLeft = [1 | Acc3] ? creep
% Successfully bound ListAfterLeft to the new list [1 | Acc3].
   Exit: (16) ListAfterLeft = [1 | Acc3] ? creep

% Process the right subtree of the node with value 1 (which is empty).
   Call: (16) tree_list_acc(empty, Acc3, Acc1) ? creep
% Base case reached; return the current accumulator (unchanged).
   Exit: (16) tree_list_acc(empty, Acc1, Acc1) ? creep

% Completed traversal of the left subtree of the root; result is now [1 | Acc1].
   Exit: (15) tree_list_acc(node(empty, 1, empty), [1 | Acc1], Acc1) ? creep

% Visit the root node with value 2 and prepend it to the list.
   Call: (15) Acc1 = [2 | Acc4] ? creep
% Successfully bound Acc1 to the new list [2 | Acc4].
   Exit: (15) Acc1 = [2 | Acc4] ? creep

% Begin processing the right subtree of the root (node with value 3).
   Call: (15) tree_list_acc(node(empty, 3, empty), Acc4, []) ? creep
% Process the left subtree of node 3 (which is empty).
   Call: (16) tree_list_acc(empty, Acc4, Acc5) ? creep
% Base case reached; return the current accumulator (unchanged).
   Exit: (16) tree_list_acc(empty, Acc4, Acc4) ? creep

% Visit the node with value 3 and prepend it to the list.
   Call: (16) Acc4 = [3 | Acc6] ? creep
% Successfully bound Acc4 to the new list [3 | Acc6].
   Exit: (16) Acc4 = [3 | Acc6] ? creep

% Process the right subtree of node 3 (which is empty).
   Call: (16) tree_list_acc(empty, Acc6, []) ? creep
% Base case reached; return the current accumulator (unchanged).
   Exit: (16) tree_list_acc(empty, [], []) ? creep

% Completed traversal of the right subtree of the root; result is now [3].
   Exit: (15) tree_list_acc(node(empty, 3, empty), [3], []) ? creep

% Traversal of the entire tree completed, resulting in the final list [1, 2, 3].
   Exit: (14) tree_list_acc(Tree, [1, 2, 3], []) ? creep

% The top-level query succeeds, producing the expected result.
   Exit: (13) tree_list(Tree, [1, 2, 3]) ? creep
Tree = node(node(empty, 1, empty), 2, node(empty, 3, empty)),
List = [1, 2, 3].
```