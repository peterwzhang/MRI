package edu.ua.cs495.hpc_interface.domain.dto;

import java.time.DateTimeException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.annotation.CheckForNull;
import lombok.Getter;
import lombok.ToString;

/** Acquired from sacct */
@Getter
@ToString
public class SlurmJob {

  private static final Pattern NUM_PATTERN = Pattern.compile("\\d+");
  private static final int[] DURATION_MAPPING = {
    1,
    60,
    60 * 60,
    60 * 60 * 24,
  };

  private static final int NUM_FIELDS = 9;

  private int id;
  private String state;
  private String reason;

  @CheckForNull
  /** in seconds, null if unknown/unlimited */
  private Integer timelimit;

  @CheckForNull
  private Instant start;

  @CheckForNull
  private Instant end;

  @CheckForNull
  /** in seconds, null if unknown/unlimited */
  private Integer elapsed;

  private String nodeList;
  private int exitCode;

  @SuppressWarnings({ "java:S109", "java:S1166" })
  public SlurmJob(String sacctString) {
    String[] fields = sacctString.split("\\|");
    if (fields.length != NUM_FIELDS) {
      throw new IllegalArgumentException(
        String.format("Could not parse '%s' as a slurm job", sacctString)
      );
    }

    this.id = Integer.parseInt(fields[0]);
    this.state = fields[1];
    this.reason = fields[2];

    if ("Partition_Limit".equals(fields[3]) || "UNLIMITED".equals(fields[3])) {
      this.timelimit = null;
    } else {
      this.timelimit = parseDuration(fields[3]);
    }

    try {
      this.start = Instant.parse(fields[4]);
    } catch (DateTimeException e) {
      // ignore
    }

    try {
      this.end = Instant.parse(fields[5]);
    } catch (DateTimeException e) {
      // ignore
    }

    this.elapsed = parseDuration(fields[6]);

    this.nodeList = fields[7];
    this.exitCode = Integer.parseInt(fields[8].split(":")[0]);
  }

  private static Integer parseDuration(String duration) {
    Pattern p = NUM_PATTERN;
    Matcher m = p.matcher(duration);

    List<Integer> nums = new ArrayList<>();
    while (m.find()) {
      nums.add(Integer.parseInt(m.group()));
    }

    if (nums.size() > DURATION_MAPPING.length) {
      throw new IllegalArgumentException(
        String.format(
          "Too many numbers found in %s; I only know how to handle four.",
          duration
        )
      );
    }

    Integer result = 0;

    for (int i = 0; i < nums.size(); i++) {
      result += nums.get(i) * DURATION_MAPPING[nums.size() - i - 1];
    }

    return result;
  }
}
