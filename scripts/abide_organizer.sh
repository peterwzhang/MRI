#!/bin/bash

# === If running the entire script, be sure to login to compute node ===

# Create variable names for file paths

export alri=/grps2/alri
export scratch=/scratch/$USER
export abide=$scratch/abide

# Create a scratch directory for user if it doesn't exist
# If loop starts with conditions in brackets, followed by 'then' and ending with 'fi'
if [ ! -d $abide ]; then
    echo ... Creating $abide
    mkdir -p $abide;
fi

echo ... Copying abide data to scratch directory
cp -r $alri/abide $scratch
cd $abide

## === This is the section where you must be logged in to compute node ===

echo ... Extracting ABIDE data
tar -xvzf NYU_a.tgz
tar -xvzf NYU_d.tgz

# === Create a directory for segmentation. This will be used for Freesurfer data ===
segdir=$abide/segmentation
mkdir -p $segdir

# Copy all the mprage.nii.gz files from NYU and name them subjid.nii.gz
cd $abide/NYU

## === This loop searches all the mprage.nii.gz files from NYU directory
## === Locates the subjectID by cutting the file path into separate fields
## === Creates name for output file as subjectID.nii.gz using subjectID from previous line
## === Copies the mprage from NYU to the segmentation folder with the name subjectID.nii.gz

## for loops starts with 'do' and ends with 'done' and runs on the list 
## specified in variable (struct in our case)

for struct in `find . -name 'mprage.nii.gz'`; do
    subject=`echo $struct | cut -d '/' -f2`;
    outfile=`printf "%s.nii.gz" $subject`;
    echo ... Copying $struct to $segdir/$outfile
    cp $struct $segdir/$outfile;
done
