package edu.ua.cs495.hpc_interface.async.tasks;

import edu.ua.cs495.hpc_interface.domain.dto.SlurmJob;
import edu.ua.cs495.hpc_interface.domain.entity.Job;
import edu.ua.cs495.hpc_interface.domain.types.JobState;
import edu.ua.cs495.hpc_interface.service.SSHService;
import java.io.IOException;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.schmizz.sshj.SSHClient;

/**
 * Get all job's states
 */
@Log4j2
@AllArgsConstructor
public final class PollJobStateSubTask {

  public static final String SACCT_COMMAND =
    "sacct -j %s " +
    "--format=JobID,state,Reason,Timelimit,start,end,elapsed,nodelist,DerivedExitcode " +
    "--allocations " +
    "--parsable2 --noheader";

  private SSHService service;
  private SSHClient ssh;
  private List<Job> jobs;

  @SuppressWarnings({ "java:S1151", "java:S1612" })
  protected void run() throws IOException {
    if (this.jobs.isEmpty()) {
      log.info("No jobs to poll...");
      return;
    }

    String jobList = jobs
      .stream()
      .map(Job::getSlurmId)
      .map(i -> i.toString())
      .collect(Collectors.joining(","));

    log.info("Querying " + jobList);

    String response =
      this.service.guaranteeCommand(
          ssh,
          String.format(SACCT_COMMAND, jobList),
          "Unable to poll sacct"
        );

    Arrays
      .stream(response.split("\n"))
      .map(String::trim)
      .map(SlurmJob::new)
      .forEach((SlurmJob slurmJob) -> {
        Job job = null;
        for (Job j : jobs) {
          if (j.getSlurmId().equals(slurmJob.getId())) {
            job = j;
            break;
          }
        }
        if (job == null) {
          throw new IllegalStateException(
            "Found slurm job " +
            slurmJob.getId() +
            " in sacct response but not in initial query"
          );
        }

        log.info("Updating job " + job.getId());

        if (
          slurmJob.getReason().isBlank() || "None".equals(slurmJob.getReason())
        ) {
          job.setSlurmState(slurmJob.getState());
        } else {
          job.setSlurmState(
            String.format("%s (%s)", slurmJob.getState(), slurmJob.getReason())
          );
        }

        job.setTimeLimit(slurmJob.getTimelimit());
        job.setStartTime(slurmJob.getStart());
        job.setEndTime(slurmJob.getEnd());
        job.setNodeList(slurmJob.getNodeList());
        job.setExitCode(slurmJob.getExitCode());

        switch (slurmJob.getState().split(" ")[0]) {
          // Job is awaiting resource allocation.
          case "PENDING":
          // Job has been allocated resources, but are waiting for them to become ready for use (e.g. booting).
          case "CONFIGURING":
          // Job is being held after requested reservation was deleted.
          case "RESV_DEL_HOLD":
          // Job is being requeued by a federation.
          case "REQUEUE_FED":
          // Held job is being requeued.
          case "REQUEUE_HOLD":
          // Completing job is being requeued.
          case "REQUEUED":
          // Job is about to change size.
          case "RESIZING":
          // Job is staging out files.
          case "STAGE_OUT":
          // Job has an allocation, but execution has been suspended and CPUs have been released for other jobs.
          case "SUSPENDED":
          // The job was requeued in a special state. This state can be set by users, typically in EpilogSlurmctld, if the job has terminated with a particular exit value.
          case "SPECIAL_EXIT":
            job.setState(JobState.PENDING);
            break;
          // Job is in the process of completing. Some processes on some nodes may still be active.
          case "COMPLETING":
          // Job currently has an allocation.
          case "RUNNING":
          // Job is being signaled.
          case "SIGNALING":
            job.setState(JobState.RUNNING);
            break;
          // Job terminated due to launch failure, typically due to a hardware failure (e.g. unable to boot the node or block and the job can not be requeued).
          case "BOOT_FAIL":
          // Job terminated with non-zero exit code or other failure condition.
          case "FAILED":
          // Job experienced out of memory error.
          case "OUT_OF_MEMORY":
          // Job terminated due to failure of one or more allocated nodes.
          case "NODE_FAIL":
          // Job terminated due to preemption.
          case "PREEMPTED":
            job.setState(JobState.FAILED);
            break;
          // Job terminated on deadline.
          case "DEADLINE":
          // Job terminated upon reaching its time limit.
          case "TIMEOUT":
            job.setState(JobState.TIMEOUT);
            break;
          // Job was explicitly cancelled by the user or system administrator. The job may or may not have been initiated.
          case "CANCELLED":
            job.setState(JobState.CANCELLED);
            break;
          // Job has terminated all processes on all nodes with an exit code of zero.
          case "COMPLETED":
            job.setState(JobState.SUCCESS);
            break;
          // idk what to do with these
          // Job has an allocation, but execution has been stopped with SIGSTOP signal. CPUs have been retained by this job.
          case "STOPPED":
          // Sibling was removed from cluster due to other cluster starting the job.
          case "REVOKED":
          default:
            job.setState(JobState.FAILED);
            log.error(
              "Slurm job had unknown state " +
              slurmJob.getState() +
              ", reporting as failure"
            );
        }

        job.setLastSync(Instant.now());

        this.service.getJobRepository().save(job);
      });
  }
}
