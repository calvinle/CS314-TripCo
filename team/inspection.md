# Inspection - Team *T12* 
 
Inspection | Details
----- | -----
Subject | Optimizer (Plan/Trip), SqlConnect, 
Meeting | *4/27, 15:00, CSU*
Checklist | http://www.cs.toronto.edu/~sme/CSC444F/handouts/java_checklist.pdf

### Roles
Name | Role | Preparation Time
---- | ---- | ----
Tom | Maintainer | 2:00
Calvin | Moderator | 1:00
Charlie | End User | 1:00
Josh | Tester | 1:30

### Log
file:line | defect | h/m/l | who found | github# 
--- | --- |:---:|:---:| ---
Trip:3-10 | unused imports | l | Tom | 404
Trip:80-83| unused variables | l | Tom | 404
Trip:88-91| unused variables| l | Tom | 404
Trip:136| line too long, can shorten |l | Tom | 405
Trip:206-212| methods return the same value. can combine into one method? | m | Tom | 403
Trip:214-220| methods return the same value. can combine into one method? | m | Tom | 403
+TwoOpt.java | File not used | l | Charlie | 391
+Optimizer.java | Delta variable is too complicated. | l | Charlie | 392
+Optimizer.java | Optimizer.java needs to be broken up and global variables should be relied on less | h | Charlie | 395
+TestOptimizer.java | Use add all instead of so many adds | l | Josh | 397
+TestOptimizer.java | Add tests for NN (needs assert), 2opt, 3opt | h | Josh | 398
+TestTrip.java | Add tests for NN and distance units | m | Josh | 399
SQLConnect:64| unused variable |l | Calvin |
SQLConnect:68| unused variable |l | Calvin |
SQLConnect:71| unused variable |l | Calvin |
Trip:212| method is not used anymore, used to bound to CO coords. | h | Tom | 403
 
