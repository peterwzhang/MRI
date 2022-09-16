# Run a single command on a compute node (e.g. /bin/bash, to open an interactive shell)
srun --pty /bin/bash
# Note, any Slurm configuration variables may be passed via parameters. `--pty` is required for any interactive/shell-based command

# Get information on a job (2931152)
sacct -j 2931152 \
  --format=User,JobID,Jobname,partition,state,time,start,end,elapsed,MaxRss,MaxVMSize,nnodes,ncpus,nodelist \
  --parsable2
# User|JobID|JobName|Partition|State|Timelimit|Start|End|Elapsed|MaxRSS|MaxVMSize|NNodes|NCPUS|NodeList
# ncovercash|2931152|ncovercash_test|main|RUNNING|00:15:00|2022-09-15T19:24:06|Unknown|00:02:42|||2|2|compute-5-15,compute-20-0
# |2931152.batch|batch||RUNNING||2022-09-15T19:24:06|Unknown|00:02:42|||1|1|compute-5-15
# |2931152.extern|extern||RUNNING||2022-09-15T19:24:06|Unknown|00:02:42|||2|2|compute-5-15,compute-20-0

# Get information for a user's jobs
sacct -u ncovercash \
  --format=User,JobID,Jobname,partition,state,time,start,end,elapsed,MaxRss,MaxVMSize,nnodes,ncpus,nodelist \
  --parsable2
# User|JobID|JobName|Partition|State|Timelimit|Start|End|Elapsed|MaxRSS|MaxVMSize|NNodes|NCPUS|NodeList
# ncovercash|2931150|ncovercash_test|main|RUNNING|00:15:00|2022-09-15T19:19:57|Unknown|00:14:12|||1|1|compute-20-4
# |2931150.batch|batch||RUNNING||2022-09-15T19:19:57|Unknown|00:14:12|||1|1|compute-20-4
# |2931150.extern|extern||RUNNING||2022-09-15T19:19:57|Unknown|00:14:12|||1|1|compute-20-4
# ncovercash|2931151|ncovercash_test|main|RUNNING|00:15:00|2022-09-15T19:23:15|Unknown|00:10:54|||1|2|compute-20-0
# |2931151.batch|batch||RUNNING||2022-09-15T19:23:15|Unknown|00:10:54|||1|2|compute-20-0
# |2931151.extern|extern||RUNNING||2022-09-15T19:23:15|Unknown|00:10:54|||1|2|compute-20-0
# ncovercash|2931152|ncovercash_test|main|RUNNING|00:15:00|2022-09-15T19:24:06|Unknown|00:10:03|||2|2|compute-5-15,compute-20-0
# |2931152.batch|batch||RUNNING||2022-09-15T19:24:06|Unknown|00:10:03|||1|1|compute-5-15
# |2931152.extern|extern||RUNNING||2022-09-15T19:24:06|Unknown|00:10:03|||2|2|compute-5-15,compute-20-0
# ncovercash|2931153|ncovercash_test|main|CANCELLED by 76823|00:15:00|2022-09-15T19:29:57|2022-09-15T19:33:15|00:03:18|||1|2|compute-20-11
# |2931153.batch|batch||CANCELLED||2022-09-15T19:29:57|2022-09-15T19:33:15|00:03:18|18968K|142804K|1|2|compute-20-11
# |2931153.extern|extern||COMPLETED||2022-09-15T19:29:57|2022-09-15T19:33:15|00:03:18|88K|142444K|1|2|compute-20-11
# ncovercash|2931154|ncovercash_test|main|CANCELLED by 76823|00:15:00|2022-09-15T19:30:13|2022-09-15T19:33:15|00:03:02|||1|2|compute-20-4
# |2931154.batch|batch||CANCELLED||2022-09-15T19:30:13|2022-09-15T19:33:15|00:03:02|18968K|142828K|1|2|compute-20-4
# |2931154.extern|extern||COMPLETED||2022-09-15T19:30:13|2022-09-15T19:33:15|00:03:02|92K|142580K|1|2|compute-20-4
# ncovercash|2931155|ncovercash_test|main|RUNNING|00:15:00|2022-09-15T19:30:31|Unknown|00:03:38|||1|2|compute-20-4
# |2931155.batch|batch||RUNNING||2022-09-15T19:30:31|Unknown|00:03:38|||1|2|compute-20-4
# |2931155.extern|extern||RUNNING||2022-09-15T19:30:31|Unknown|00:03:38|||1|2|compute-20-4

# All available format commands:
#   Account             AdminComment        AllocCPUS           AllocNodes
#   AllocTRES           AssocID             AveCPU              AveCPUFreq
#   AveDiskRead         AveDiskWrite        AvePages            AveRSS
#   AveVMSize           BlockID             Cluster             Comment
#   Constraints         ConsumedEnergy      ConsumedEnergyRaw   CPUTime
#   CPUTimeRAW          DBIndex             DerivedExitCode     Elapsed
#   ElapsedRaw          Eligible            End                 ExitCode
#   Flags               GID                 Group               JobID
#   JobIDRaw            JobName             Layout              MaxDiskRead
#   MaxDiskReadNode     MaxDiskReadTask     MaxDiskWrite        MaxDiskWriteNode
#   MaxDiskWriteTask    MaxPages            MaxPagesNode        MaxPagesTask
#   MaxRSS              MaxRSSNode          MaxRSSTask          MaxVMSize
#   MaxVMSizeNode       MaxVMSizeTask       McsLabel            MinCPU
#   MinCPUNode          MinCPUTask          NCPUS               NNodes
#   NodeList            NTasks              Priority            Partition
#   QOS                 QOSRAW              Reason              ReqCPUFreq
#   ReqCPUFreqMin       ReqCPUFreqMax       ReqCPUFreqGov       ReqCPUS
#   ReqMem              ReqNodes            ReqTRES             Reservation
#   ReservationId       Reserved            ResvCPU             ResvCPURAW
#   Start               State               Submit              Suspended
#   SystemCPU           SystemComment       Timelimit           TimelimitRaw
#   TotalCPU            TRESUsageInAve      TRESUsageInMax      TRESUsageInMaxNode
#   TRESUsageInMaxTask  TRESUsageInMin      TRESUsageInMinNode  TRESUsageInMinTask
#   TRESUsageInTot      TRESUsageOutAve     TRESUsageOutMax     TRESUsageOutMaxNode
#   TRESUsageOutMaxTask TRESUsageOutMin     TRESUsageOutMinNode TRESUsageOutMinTask
#   TRESUsageOutTot     UID                 User                UserCPU
#   WCKey               WCKeyID             WorkDir

# Possible states:
# BF BOOT_FAIL
# CA CANCELLED
# CD COMPLETED
# CF CONFIGURING
# CG COMPLETING
# DL DEADLINE
# F FAILED
# NF NODE_FAIL
# OOM OUT_OF_MEMORY
# PD PENDING
# PR PREEMPTED
# R RUNNING
# RD RESV_DEL_HOLD
# RF REQUEUE_FED
# RH REQUEUE_HOLD
# RQ REQUEUED
# RS RESIZING
# RV REVOKED
# SI SIGNALING
# SE SPECIAL_EXIT
# SO STAGE_OUT
# ST STOPPED
# S SUSPENDED
# TO TIMEOUT


# Overall pretty graph of node usage
slurmtop

# Start job
sbatch --parsable < test.sh
# outputs job ID by itself with an optional semicolon and cluster ID
# for example:
# 2931152
# 2931152;compute-5-15

# Cancel job(s)
scancel 2931154 2931153
