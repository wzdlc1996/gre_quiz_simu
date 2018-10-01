# Simple GRE quiz simulator

## Introduction

This is a simple tool to help one who want to obtain higher score in GRE test.
convert.py will convert the quiz.md file in this folder to quiz.json file, and the quiz.js will let index.html perform the questions in quiz.json. Then one can begin a simulation GRE test.

Only word blank filling and reading question can be performed.

## quiz.md Format
quiz.md file has a usual markdown format:
```markdown
1. word questions 1
   A. answer A
   B. answer B
   ...

2. word question 2
   A. answer A
   B. answer B
   ...

3. reading content 1

   - question 1 of reading 1
     A. answer A
     B. answer B
     ...

   - question 2 of reading 1
     A. answer A
     B. answer B
     ...

4. some other questions.

```

## About Index.html
The countdown timmer right can be set by format:
min.sec
When you finish all questions, and click the 'NEXT' button, the test will finish. and then you should input the reference answer in format:
A,B,ABC,AB,...
And click 'CHECK' , it will pop all question of which your answer is incorrect.
