#!/bin/bash

subjectsDirectory=/scratch/$USER/flanker		# Study folder
timing=/scratch/$USER/flanker/code/Flanker_timing.txt	# Timing file for all subjects and conditions
template=$HOME/scripts/level1_flanker.m			# Template file for SPM preproc and 1st level analysis
cd $subjectsDirectory 

### Generate MATLAB code for preprocessing all participants within the study folder ###

if [ -d jobs ]; then
    rm -rf jobs    					# Remove exisiting job folder and recreate one for current study
fi

if [ ! -d jobs ]; then
    mkdir jobs
fi

rm -rf `find $subjectsDirectory -type d -name '1stLevel'` 2>/dev/null 	# Remove existing 1stLevel directory

for subs in `ls -d sub-* | sort`
do
mkdir -p ${subjectsDirectory}/${subs}/1stLevel				# Create 1stLevel folder for each subject
cursub=`echo ${subs} | sed 's/-//g'`;					# Rename matlab scripts from sub-XX to subXX -- output file
con=`cat code/Flanker_timing.txt | grep "${subs}" | awk '/Run1/ && /Con/'| tr '\t' ' ' | cut -d ' ' -f4-15`;  #Onsets from timing file
inc=`cat code/Flanker_timing.txt | grep "${subs}" | awk '/Run1/ && /Inc/'| tr '\t' ' ' | cut -d ' ' -f4-15`; 

inc_rep=`cat $template | grep "cond(1).onset" | cut -d "[" -f2 | cut -d "]" -f1`
con_rep=`cat $template | grep "cond(2).onset" | cut -d "[" -f2 | cut -d "]" -f1`
# Replace the subject ID that matches with your template.
cat $template | sed "s/${inc_rep}/${inc}/g" | sed "s/${con_rep}/${con}/g" | sed "s/sub-01/${subs}/g" > jobs/level1_${cursub}.m

### Create code to run the matlab code ####
cat > jobs/script-${subs}.sh <<EOF
#!/bin/bash

module load math/matlab/2019b;
cd $subjectsDirectory/jobs;
matlab -nosplash -nodesktop -r "cd /scratch/$USER/flanker/jobs; clc; run level1_${cursub}.m; quit"
EOF

#Create code to submit to HPC, request resources and time.
cat > jobs/rec-${subs}.sh <<EOF
#!/bin/bash
	
#SBATCH --job-name=${subs}
#SBATCH --output=jobs/res_${subs}.txt
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=2
#SBATCH --partition=main
#SBATCH --mem-per-cpu=8192
#
# Time format = HH:MM:SS, DD-HH:MM:SS
#
#SBATCH --time=04:00:00

srun jobs/script-${subs}.sh
EOF
# ADD more SLURM options for job submissions
# Change permissions to make the files executable and submit the job
chmod +x jobs/rec-${subs}.sh
chmod +x jobs/script-${subs}.sh
sbatch jobs/rec-${subs}.sh
done
