#!/bin/bash

subjectsDirectory=${PWD}

cd $subjectsDirectory
rm -Rf jobs
rm res_*.txt

if [ ! -d jobs ]; then
    mkdir jobs
fi

for subject in `ls -d [005]*`
do
cat > jobs/script-$subject.sh <<EOF
#!/bin/bash
module add FreeSurfer/6.0.0-centos6_x86_64

export SUBJECTS_DIR=/data/project/kanalab/abide1/NYU;

cd ${subjectsDirectory}/${subject}

recon-all -i ${subject}_anat.nii.gz -subjid ${subject} -all
EOF
cat > jobs/rec-$subject.sh <<EOF
#!/bin/bash
	
#SBATCH --job-name=$subject
#SBATCH --output=res_$subject.txt
#SBATCH --ntasks=1
#SBATCH --partition=main
#
# Time format = HH:MM:SS, DD-HH:MM:SS
#
#SBATCH --time=15:00:00
#
# Mimimum memory required per allocated  CPU  in  MegaBytes.
#
#SBATCH --mem-per-cpu=16048

srun jobs/script-$subject.sh
EOF
chmod +x jobs/rec-$subject.sh
chmod +x jobs/script-$subject.sh
sbatch jobs/rec-$subject.sh
done
