#!/bin/bash
#SBATCH -J ncovercash_test # job name
#SBATCH -n 2 # number of tasks to use (usually 1)
#SBATCH -c 1 # number of threads you are going to use
#SBATCH -p main
#SBATCH --qos debug # queue, 15min limit
#SBATCH -e %A.errors # send errors to ID.errors
#SBATCH -o %A.output # send output to ID.output
#SBATCH --mail-user=ncovercash@crimson.ua.eedu

# Takes about 6 minutes to complete

for i in {0..100000}
do
  for j in {0..10000}; do true; done
  echo $i
done
