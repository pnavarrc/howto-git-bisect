# How to use `git bisect`

Find the change that introduced a bug in your code.

The `git bisect` command helps you to find which change introduced a bug in your code. It’s easy and quick, but most people don’t know about it.

## The problem

You notice that in the most recent commit (let’s say `4a4e`), a feature is not working, and you remember than at some point in the past (let’s say commit `f8a4`) is was working just fine. The task is to find out which commit introduced the bug.

## How does it work?

Git uses the bisection algorithm to help you search the offending commit. To start, you need to mark a `bad` commit and a `good` commit, git will checkout a commit in the middle for you to test. Then you mark it either as `good` or `bad`, and then the process starts again.

## How?

Just checkout the bad commit (`4a4e`) and start `git bisect`:

```bash
(4a4e) $ git bisect start
(4a4e) $ git bisect bad
(4a4e) $ git bisect good f8a4
```

Then, git will checkout a commit in the middle, so you can test and mar it either as good or bad:

```bash
Bisecting: 7 revisions left to test after this (roughly 3 steps)
[cae5ba2ea747fc29dd234bb0ae51d8ad79096153] Rename function

$ node add.js 1 2 3

/Users/pablo/dev/beta/howto-git-bisect/add.js:15
var numbers = parseArgs(process.argv);
              ^
ReferenceError: parseArgs is not defined
    at Object.<anonymous> (/Users/pablo/dev/beta/howto-git-bisect/add.js:15:15)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:906:3

pablo at call in ~/dev/beta/howto-git-bisect on cae5ba2
```

In this commit, there was an unrelated bug, so we can just `skip` this commit:

```bash
$ git bisect skip
Bisecting: 7 revisions left to test after this (roughly 3 steps)
[2998148e8a9e74b4bc4156660336f26561dab5cd] add numbers by simple iteration
```

This next commit is good

```bash
$ node add.js 1 2 6
  6

$ git bisect good
Bisecting: 5 revisions left to test after this (roughly 3 steps)
[0bcabc789a28bbc9b1b123ede9c53d2605013aea] Add an explanation of the algorithm

// 3 steps later ...

Bisecting: 0 revisions left to test after this (roughly 0 steps)
[5e3c5e2e94836a2571a88e89f019ffc65a00293e] read all input arguments

$ node add.js 1 2 6
  NaN

$ git bisect bad
5e3c5e2e94836a2571a88e89f019ffc65a00293e is the first bad commit
commit 5e3c5e2e94836a2571a88e89f019ffc65a00293e
Author: Pablo Navarro Castillo <pnavarrc@gmail.com>
Date:   Sat Apr 16 11:02:21 2016 -0300

    read all input arguments

:100755 100755 f1110f6f59f0d9bd5e9db8513bd5330d44831ff9 d7fc70346dac9ebce564bef4e82f9fa78a819902 M	add.js

$ git bisect reset
```

Now we know which commit is the bad one, we can look at the diff:


```bash
$ git show 5e3c5e
commit 5e3c5e2e94836a2571a88e89f019ffc65a00293e
Author: Pablo Navarro Castillo <pnavarrc@gmail.com>
Date:   Sat Apr 16 11:02:21 2016 -0300

    read all input arguments

diff --git a/add.js b/add.js
index f1110f6..d7fc703 100755
--- a/add.js
+++ b/add.js
@@ -8,7 +8,7 @@ function toInt(num) {
 // Parse the input arguments
 function readNumbers(input) {
   var numArgs = input.length;
-  return input.slice(2, numArgs).map(toInt);
+  return input.slice(1, numArgs).map(toInt);
 }

 // Read and parse command line arguments
```




| Step 1   | Step 2   | Step 3   | Step 4   | Step 5   | Step 6   | Step 7   |
|----------|----------|----------|----------|----------|----------|----------|
| `4a4e` :anguished: |     |          |          |          |          |          |
| `cfaf`   |          |          |          |          |          |          |
| `e6f1`   |          |          |          |          |          |          |
| `77ca`   |          |          |          |          |          |          |
| `9e15`   |          |          |          |          |          |          |
| `f99c`   |          |          |          |          |          |          |
| `1642`   |          |          |          |          |          |          |
| `4ba6`   |          |          |          |          |          |          |
| `7e56`   |          |          |          |          |          |          |
| `397b`   |          |          |          |          |          |          |
| `7eb5`   |          |          |          |          |          |          |
| `4203`   |          |          |          |          |          |          |
| `09af`   |          |          |          |          |          |          |
| `6d3b`   |          |          |          |          |          |          |
| `0219`   |          |          |          |          |          |          |
| `34a1` ? | `34a1` :anguished: | `34a1` :anguished: |          |          |          |          |
| `1054`   | `1054`   | `1054`   |          |          |          |          |
| `bcab`   | `bcab`   | `bcab`   |          |          |          |          |
| `4ae6`   | `4ae6`   | `4ae6` ? | `4ae6` :anguished: |          |          |          |
| `7d75`   | `7d75`   | `7d75`   | `7d75`   |          |          |          |
| `e079`   | `e079`   | `e079`   | `e079` ? | `e079` :anguished: | `e079` :anguished: | `e079` :sunglasses: |
| `8013`   | `8013`   | `8013`   | `8013`   | `8013` ? | `801e` :smiley: |          |
| `7487`   | `7487` ? | `7487` :smiley: | `7487` :smiley: | `7487` :smiley: |         |          |
| `f3b2`   | `f3b2`   |          |          |          |          |          |
| `b12a`   | `b12a`   |          |          |          |          |          |
| `301f`   | `301f`   |          |          |          |          |          |
| `5151`   | `5151`   |          |          |          |          |          |
| `2dac`   | `2dac`   |          |          |          |          |          |
| `1ed8`   | `1ed8`   |          |          |          |          |          |
| `f8a4` :smiley: | `f8a4` :smiley: |          |          |          |          |          |
| `...`    |          |          |          |          |          |          |  
