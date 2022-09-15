#!/bin/bash

subjectsDirectory=/scratch/$USER/abide/segmentation

cd $subjectsDirectory 
if [ -d jobs ]; then
    rm -Rf jobs    
fi

if [ ! -d jobs ]; then
    mkdir jobs
fi

for subs in `ls [005]*.nii.gz | sort | tail -10`
do
subject=`echo $subs | cut -d '.' -f1`;
cat > jobs/script-$subject.sh <<EOF
#!/bin/bash

module load bio/freesurfer/7.1.1;
source /share/apps/freesurfer_7_1_1/freesurfer/SetUpFreeSurfer.sh

export SUBJECTS_DIR=/scratch/$USER/abide/segmentation;
export FS_LICENSE=/grps2/alri/workshop/.license.txt
recon-all -i ${subject}.nii.gz -subjid ${subject} -all -qcache
EOF

cat > jobs/rec-$subject.sh <<EOF
#!/bin/bash
	
#SBATCH --job-name=$subject
#SBATCH --output=res_$subject.txt
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=2
#SBATCH --partition=main
#SBATCH --mem-per-cpu=8192
#
# Time format = HH:MM:SS, DD-HH:MM:SS
#
#SBATCH --time=20:00:00

srun jobs/script-$subject.sh
EOF

chmod +x jobs/rec-$subject.sh
chmod +x jobs/script-$subject.sh
sbatch jobs/rec-$subject.sh
done
